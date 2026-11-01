import { ROUTES } from "@/constants/routes";
import type { PageTreeFolder } from "@/lib/page-tree";
import { formatLabelFromSlug } from "@/lib/utils";

export const DOCS_DIR = `content${ROUTES.DOCS}`;

export const EXCLUDED_SECTIONS = new Set([
  "installation",
  "(root)",
  "skills",
  "mcp",
  "changelog",
]);

export interface TopLevelSection {
  href: string;
  name: string;
}

export const TOP_LEVEL_SECTIONS: TopLevelSection[] = [
  { href: ROUTES.DOCS, name: "Introduction" },
  { href: ROUTES.DOCS_INSTALLATION, name: "Installation" },
  { href: ROUTES.DOCS_THEMING, name: "Theming" },
  { href: ROUTES.DOCS_COMPONENTS, name: "Components" },
  { href: ROUTES.DOCS_AI_ELEMENTS, name: "AI Elements" },
  { href: ROUTES.DOCS_SKILLS, name: "Skills" },
  { href: ROUTES.DOCS_MCP, name: "MCP" },
  { href: ROUTES.DOCS_CHANGELOG, name: "Changelog" },
  { href: ROUTES.DOCS_BRAND, name: "Brand" },
  { href: ROUTES.DOCS_LLMS, name: "llms.txt" },
];

export const isComponentsFolder = (folder: PageTreeFolder) =>
  folder.$id === "components" || folder.name === "Components";

const TITLE_OVERRIDES: Record<string, string> = {
  json: "JSON",
  "qr-code": "QR Code",
};

export const formatTitleFromSlug = (slug: string): string =>
  TITLE_OVERRIDES[slug] ?? formatLabelFromSlug(slug);

export const homeContentRoute = `${ROUTES.LLMS_MD}/content.md`;
export const docsContentRoute = `${ROUTES.LLMS_MD}${ROUTES.DOCS}`;
export const docsImageRoute = `${ROUTES.OG}${ROUTES.DOCS}`;
