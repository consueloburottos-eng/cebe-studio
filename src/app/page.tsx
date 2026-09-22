import type { Metadata } from "next";
import PortfolioHome from "@/components/portfolio/PortfolioHome";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "El archivo completo de proyectos de Consuelo Burotto en formato clásico de portafolio — case studies de SaaS, fintech e IA conversacional.",
};

export default function Home() {
  return <PortfolioHome />;
}
