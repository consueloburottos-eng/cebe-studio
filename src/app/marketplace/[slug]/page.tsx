import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import MarketplaceProductDetail from "@/components/marketplace/MarketplaceProductDetail";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project ? `${project.title} — CEBE:STUDIO Marketplace` : "Proyecto — CEBE:STUDIO",
  };
}

export default async function MarketplaceProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const suggestions = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return <MarketplaceProductDetail project={project} suggestions={suggestions} />;
}
