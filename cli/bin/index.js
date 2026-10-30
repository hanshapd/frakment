#!/usr/bin/env node
import { Command } from "commander";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { init } from "../src/commands/init.js";
import { add } from "../src/commands/add.js";
import { list } from "../src/commands/list.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(path.resolve(__dirname, "../package.json"), "utf8")
);

const program = new Command();

program
  .name("frakment")
  .description("Monochrome design system and component registry")
  .version(pkg.version)
  .addHelpText(
    "after",
    `
Examples:
  ${"\x1b[2m"}$ frakment init${"\x1b[0m"}
  ${"\x1b[2m"}$ frakment add status-chip${"\x1b[0m"}
  ${"\x1b[2m"}$ frakment list${"\x1b[0m"}
`
  );

program
  .command("init")
  .description("Initialize frakment in your project")
  .action(init);

program
  .command("add <component>")
  .description("Add a component from the frakment registry")
  .option("--registry <url>", "Custom registry URL")
  .option("--overwrite", "Overwrite existing files", false)
  .action(add);

program
  .command("list")
  .description("List available components")
  .option("--registry <url>", "Custom registry URL")
  .action(list);

program.parse();