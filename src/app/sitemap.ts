import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { projects } from "@/data/projects";
import { isModeEnabled } from "@/lib/modes";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...(isModeEnabled("branding")
      ? [{ url: `${siteUrl}/corporate`, changeFrequency: "monthly" as const, priority: 0.8 }]
      : []),
    ...(isModeEnabled("saas")
      ? [{ url: `${siteUrl}/saas`, changeFrequency: "monthly" as const, priority: 0.8 }]
      : []),
    ...(isModeEnabled("marketplace")
      ? [{ url: `${siteUrl}/marketplace`, changeFrequency: "monthly" as const, priority: 0.8 }]
      : []),
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.flatMap((p) => [
    ...(isModeEnabled("branding")
      ? [{ url: `${siteUrl}/projects/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.6 }]
      : []),
    ...(isModeEnabled("marketplace")
      ? [{ url: `${siteUrl}/marketplace/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.5 }]
      : []),
    { url: `${siteUrl}/portfolio/projects/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.7 },
  ]);

  return [...staticRoutes, ...projectRoutes];
}
