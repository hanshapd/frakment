#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const REGISTRY = (
  process.env.FRAKMENT_REGISTRY || "https://frakment.vercel.app"
).replace(/\/$/, "");

async function fetchJson(path) {
  const res = await fetch(`${REGISTRY}${path}`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} from ${REGISTRY}${path}`);
  }
  return res.json();
}

const server = new Server(
  { name: "frakment-mcp", version: "0.0.1" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_components",
      description: "List every frakment component with name and description.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "view_component",
      description:
        "Get the full source, dependencies, and registry dependencies of one component.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" } },
        required: ["name"],
      },
    },
    {
      name: "search_components",
      description: "Search components by name or description substring.",
      inputSchema: {
        type: "object",
        properties: { query: { type: "string" } },
        required: ["query"],
      },
    },
    {
      name: "get_install_command",
      description: "Get the npx install command for a component.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" } },
        required: ["name"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;

  if (name === "list_components") {
    const index = await fetchJson("/r/index.json");
    const list = (index.components || []).map(
      (c) => `- ${c.name}: ${c.description || ""}`
    );
    return {
      content: [
        {
          type: "text",
          text: `Frakment components (${list.length}):\n\n${list.join("\n")}`,
        },
      ],
    };
  }

  if (name === "view_component") {
    const comp = await fetchJson(`/r/${args.name}.json`);
    const files = (comp.files || [])
      .map((f) => `--- ${f.path} ---\n${f.content || ""}`)
      .join("\n\n");
    const text = [
      `# ${comp.name}`,
      comp.description ? `\n${comp.description}` : "",
      `\nDependencies: ${(comp.dependencies || []).join(", ") || "none"}`,
      `Registry dependencies: ${(comp.registryDependencies || []).join(", ") || "none"}`,
      `\n${files}`,
    ].join("\n");
    return { content: [{ type: "text", text }] };
  }

  if (name === "search_components") {
    const q = String(args.query || "").toLowerCase();
    const index = await fetchJson("/r/index.json");
    const hits = (index.components || []).filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.description || "").toLowerCase().includes(q)
    );
    return {
      content: [
        {
          type: "text",
          text: `Found ${hits.length} for "${args.query}":\n\n${hits.map((c) => `- ${c.name}: ${c.description || ""}`).join("\n") || "(none)"}`,
        },
      ],
    };
  }

  if (name === "get_install_command") {
    return {
      content: [{ type: "text", text: `npx frakment@latest add ${args.name}` }],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
