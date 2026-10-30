#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const manifestPath = path.join(rootDir, "frakment.json");
const outputDir = path.join(rootDir, "public/r");

const SKIP_PACKAGES = new Set(["react", "react-dom", "next"]);

function normalizePackage(spec) {
  if (spec.startsWith("@")) return spec.split("/").slice(0, 2).join("/");
  return spec.split("/")[0];
}

function detectImports(src) {
  const external = new Set();
  const registry = new Set();

  const patterns = [
    /from\s+["']([^"']+)["']/g,
    /import\s*\(\s*["']([^"']+)["']\s*\)/g,
  ];

  for (const re of patterns) {
    let m;
    while ((m = re.exec(src))) {
      const spec = m[1];

      if (spec.startsWith("@/components/ui/")) {
        const name = spec.slice("@/components/ui/".length).split("/")[0];
        if (name) registry.add(name);
        continue;
      }
      if (spec.startsWith("@/")) continue;
      if (spec.startsWith(".")) continue;
      if (spec.startsWith("node:")) continue;
      if (spec.startsWith("next/")) continue;

      const root = normalizePackage(spec);
      if (SKIP_PACKAGES.has(root)) continue;
      external.add(root);
    }
  }

  return { external: [...external].sort(), registry: [...registry].sort() };
}

async function walkFiles(dir, baseDir = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath, baseDir)));
    } else if (entry.isFile()) {
      files.push({
        relativePath: path.relative(baseDir, fullPath).replace(/\\/g, "/"),
        fullPath,
      });
    }
  }
  return files;
}

async function main() {
  console.log("🔨 Building fraktment registry...");

  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  await fs.mkdir(outputDir, { recursive: true });

  for (const component of manifest.components) {
    const files = [];
    const autoExternal = new Set();
    const autoRegistry = new Set();

    if (component.sourceDir) {
      const srcDir = path.resolve(path.dirname(manifestPath), component.sourceDir);
      const dirFiles = await walkFiles(srcDir);
      const targetBase =
        component.targetDir ??
        component.sourceDir.replace(/^components\/ui\//, "components/ui/");

      for (const f of dirFiles) {
        const content = await fs.readFile(f.fullPath, "utf8");
        files.push({
          path: `${targetBase}/${f.relativePath}`.replace(/\/+/g, "/"),
          content,
        });
        if (f.fullPath.endsWith(".ts") || f.fullPath.endsWith(".tsx")) {
          const detected = detectImports(content);
          detected.external.forEach((x) => autoExternal.add(x));
          detected.registry.forEach((x) => autoRegistry.add(x));
        }
      }
    } else if (component.source) {
      const srcPath = path.resolve(path.dirname(manifestPath), component.source);
      const content = await fs.readFile(srcPath, "utf8");
      files.push({ path: component.target, content });
      const detected = detectImports(content);
      detected.external.forEach((x) => autoExternal.add(x));
      detected.registry.forEach((x) => autoRegistry.add(x));
    } else {
      throw new Error(`Component "${component.name}" has no source or sourceDir`);
    }

    // buang self-reference
    autoRegistry.delete(component.name);

    // merge: auto-detect (dari kode) ∪ manual (dari manifest)
    const dependencies = [
      ...new Set([...autoExternal, ...(component.dependencies ?? [])]),
    ].sort();
    const registryDependencies = [
      ...new Set([...autoRegistry, ...(component.registryDependencies ?? [])]),
    ].sort();
    // Handle assets (binary files, base64)
    if (component.assets && Array.isArray(component.assets)) {
      for (const asset of component.assets) {
        const assetPath = path.resolve(path.dirname(manifestPath), asset.path);
        const assetBuf = await fs.readFile(assetPath);
        files.push({
          path: asset.target,
          type: "registry:file",
          target: asset.target,
          content: assetBuf.toString("base64"),
          encoding: "base64",
        });
      }
    }


    const payload = {
      name: component.name,
      title: component.title,
      description: component.description,
      dependencies,
      registryDependencies,
      files,
    };

    const outPath = path.join(outputDir, `${component.name}.json`);
    await fs.writeFile(outPath, JSON.stringify(payload, null, 2));

    const depsStr = dependencies.length ? dependencies.join(", ") : "-";
    const regStr = registryDependencies.length ? registryDependencies.join(", ") : "-";
    console.log(
      `  ✓ ${component.name} → public/r/${component.name}.json (${files.length} file${files.length > 1 ? "s" : ""})`
    );
    console.log(`      deps: [${depsStr}]  regdeps: [${regStr}]`);
  }

  const index = {
    name: manifest.name,
    homepage: manifest.homepage,
    components: manifest.components.map((c) => ({
      name: c.name,
      title: c.title,
      description: c.description,
    })),
  };
  await fs.writeFile(
    path.join(outputDir, "index.json"),
    JSON.stringify(index, null, 2)
  );
  console.log(`  ✓ index.json`);
  console.log(`\n✅ Built ${manifest.components.length} component(s).`);
}

main().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
