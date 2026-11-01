import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const root = join(__dirname, "..", "..");

const read = (p: string) => readFileSync(join(root, p), "utf8");

describe("nav consistency", () => {
  it("mobile-nav and docs-sidebar both import TOP_LEVEL_SECTIONS", () => {
    expect(read("components/mobile-nav.tsx")).toMatch(/TOP_LEVEL_SECTIONS/);
    expect(read("components/docs-sidebar.tsx")).toMatch(/TOP_LEVEL_SECTIONS/);
  });

  it("mobile-nav does not accept an items prop (must mirror sidebar via tree)", () => {
    const src = read("components/mobile-nav.tsx");
    expect(src).not.toMatch(/items:\s*\{[^}]*href[^}]*label/);
    expect(src).not.toMatch(/items\.map\(/);
  });

  it("site-header does not pass items to MobileNav", () => {
    const src = read("components/site-header.tsx");
    expect(src).not.toMatch(/<MobileNav\b[^>]*?\bitems=/);
  });

  it("TOP_LEVEL_SECTIONS is defined only in lib/docs.ts", () => {
    const mobile = read("components/mobile-nav.tsx");
    const sidebar = read("components/docs-sidebar.tsx");
    const cmd = read("components/command-menu.tsx");
    expect(mobile).not.toMatch(/const TOP_LEVEL_SECTIONS\s*[:=]/);
    expect(sidebar).not.toMatch(/const TOP_LEVEL_SECTIONS\s*[:=]/);
    expect(cmd).not.toMatch(/const TOP_LEVEL_SECTIONS\s*[:=]/);
  });
});