import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/saas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/marketplace`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.flatMap((p) => [
    { url: `${siteUrl}/projects/${p.slug}`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/marketplace/${p.slug}`, changeFrequency: "yearly", priority: 0.5 },
  ]);

  return [...staticRoutes, ...projectRoutes];
}
