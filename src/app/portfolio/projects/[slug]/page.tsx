import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import PortfolioProjectDetail from "@/components/portfolio/PortfolioProjectDetail";
import { categoryBucket } from "@/lib/projectBucket";

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

  // Same filter bucket as the current project (Work page's SaaS/Ecommerce/
  // Service/Branding split), not just the next few in array order — so
  // "More projects" always reads as genuinely related work.
  const bucket = categoryBucket(project);
  const others = projects.filter((p) => p.slug !== slug && categoryBucket(p) === bucket);

  return <PortfolioProjectDetail project={project} others={others} />;
}
