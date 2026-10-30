#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const manifestPath = path.join(rootDir, "frakment.json");
const outputDir = path.join(rootDir, "public/r");

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
  console.log("🔨 Building frakment registry...");

  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  await fs.mkdir(outputDir, { recursive: true });

  for (const component of manifest.components) {
    const files = [];

    if (component.sourceDir) {
      const srcDir = path.resolve(path.dirname(manifestPath), component.sourceDir);
      const dirFiles = await walkFiles(srcDir);
      const targetBase = component.targetDir ?? component.sourceDir.replace(/^components\/ui\//, "components/ui/");
      for (const f of dirFiles) {
        const content = await fs.readFile(f.fullPath, "utf8");
        files.push({
          path: `${targetBase}/${f.relativePath}`.replace(/\/+/g, "/"),
          content,
        });
      }
    } else if (component.source) {
      const srcPath = path.resolve(path.dirname(manifestPath), component.source);
      const content = await fs.readFile(srcPath, "utf8");
      files.push({ path: component.target, content });
    } else {
      throw new Error(`Component "${component.name}" has no source or sourceDir`);
    }

    const payload = {
      name: component.name,
      title: component.title,
      description: component.description,
      dependencies: component.dependencies ?? [],
      registryDependencies: component.registryDependencies ?? [],
      files,
    };

    const outPath = path.join(outputDir, `${component.name}.json`);
    await fs.writeFile(outPath, JSON.stringify(payload, null, 2));
    console.log(`  ✓ ${component.name} → public/r/${component.name}.json (${files.length} file${files.length > 1 ? "s" : ""})`);
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