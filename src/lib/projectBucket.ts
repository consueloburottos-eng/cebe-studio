import type { Project } from "@/data/projects";

// Four broad filter buckets instead of one pill per raw project category.
// No "All" — every project resolves to exactly one bucket, Branding being
// the catch-all for anything that isn't SaaS/Ecommerce/Service (industrial
// design pieces like cnc/longboard/brava, the "polucio" case study, and any
// pending "coming soon" stub all land there). Shared by the Work page's
// filters and the project detail page's "More projects" strip, so both
// always agree on which projects are "in the same category".
export const FILTER_BUCKETS = ["SaaS", "Ecommerce", "Service", "Branding"] as const;
export type FilterBucket = (typeof FILTER_BUCKETS)[number];

const ECOMMERCE_SLUGS = new Set([
  "amphora",
  "hbt",
  "nicopoly",
  "londra",
  "marley-coffee",
  "tekpro-checkout",
  "rocket-mkt",
  "dior",
]);
const SERVICE_SLUGS = new Set(["bululu", "llay-llay"]);

export function categoryBucket(project: Pick<Project, "slug" | "category">): FilterBucket {
  // SaaS is the three real software families, by slug — not by category —
  // since "Product Design" alone would also catch physical/industrial
  // pieces (cnc, longboard, brava) that aren't software at all.
  const { slug, category } = project;
  if (slug === "talent-capital" || slug.startsWith("altafid") || slug.startsWith("buildwithin")) {
    return "SaaS";
  }
  // Ecommerce and Service are decided per project, not from the category
  // text: categories describe the product (e.g. "Women's Fashion
  // E-commerce"), so wording changes must never move a project between
  // filters. "dior" is pending Tekpro e-commerce work with no category yet.
  if (ECOMMERCE_SLUGS.has(slug)) return "Ecommerce";
  if (SERVICE_SLUGS.has(slug)) return "Service";
  const c = category.toLowerCase();
  if (c.includes("e-commerce") || c.includes("ecommerce") || c.includes("web design") || c.includes("brand + web")) {
    return "Ecommerce";
  }
  if (c.includes("servicio") || c.includes("service")) {
    return "Service";
  }
  return "Branding";
}
