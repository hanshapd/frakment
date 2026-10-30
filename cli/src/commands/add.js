import { existsSync } from "node:fs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

import * as p from "@clack/prompts";
import pc from "picocolors";
import { execa } from "execa";

import { detectPackageManager, findProjectRoot } from "../utils/detect.js";

export async function add(componentName, options) {
  p.intro(pc.dim("frakment") + ` add ${pc.bold(componentName)}`);

  let cwd;
  try {
    cwd = findProjectRoot(process.cwd());
  } catch (err) {
    p.outro(pc.red("error ") + err.message);
    process.exit(1);
  }

  const configPath = path.join(cwd, "components.json");
  if (!existsSync(configPath)) {
    p.outro(
      pc.red("error ") + "components.json not found. Run `frakment init` first."
    );
    process.exit(1);
  }

  const config = JSON.parse(await readFile(configPath, "utf8"));
  const registryUrl = (options.registry ?? config.registry).replace(/\/$/, "");
  const s = p.spinner();
  s.start(`fetching ${componentName}`);

  let payload;
  try {
    const res = await fetch(`${registryUrl}/${componentName}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    payload = await res.json();
  } catch {
    s.stop(pc.red("✗") + ` ${componentName} not found in registry`);
    process.exit(1);
  }
  s.stop(pc.green("✓") + ` fetched ${componentName}`);

  for (const file of payload.files ?? []) {
    const targetPath = path.join(cwd, file.path);
    if (existsSync(targetPath) && !options.overwrite) {
      const overwrite = await p.confirm({
        message: `${file.path} already exists. Overwrite?`,
        initialValue: false,
      });
      if (p.isCancel(overwrite) || !overwrite) {
        p.log.info(`skipped ${file.path}`);
        continue;
      }
    }
    await mkdir(path.dirname(targetPath), { recursive: true });
    await writeFile(targetPath, file.content.replace(/\r\n/g, "\n"));
    p.log.success(file.path);
  }

  const deps = payload.dependencies ?? [];
  if (deps.length > 0) {
    const pkgPath = path.join(cwd, "package.json");
    const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    const missing = deps.filter((d) => !allDeps[d]);
    if (missing.length > 0) {
      s.start(`installing ${missing.join(", ")}`);
      const pm = detectPackageManager(cwd);
      try {
        const args =
          pm === "npm" ? ["install", ...missing] : ["add", ...missing];
        await execa(pm, args, { cwd, stdio: "ignore" });
        s.stop(pc.green("✓") + ` installed ${missing.length} package(s)`);
      } catch (err) {
        s.stop(pc.red("✗") + " failed to install dependencies");
        p.log.warn(err.message);
      }
    }
  }

  p.outro(`${pc.green("✓")} ${componentName} added`);
}