import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import PortfolioProjectDetail from "@/components/portfolio/PortfolioProjectDetail";

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
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.subtitle,
    openGraph: { title: project.title, description: project.subtitle },
  };
}

export default async function PortfolioProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const others = Array.from({ length: 3 }, (_, i) => projects[(currentIndex + 1 + i) % projects.length]).filter(
    (p) => p.slug !== slug
  );

  return <PortfolioProjectDetail project={project} others={others} />;
}
