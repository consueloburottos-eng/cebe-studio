import type { Metadata } from "next";
import PortfolioWork from "@/components/portfolio/PortfolioWork";

export const metadata: Metadata = {
  title: "Work",
  description:
    "El catálogo completo de proyectos de Consuelo Burotto, filtrable por categoría — SaaS, branding, dirección de arte y más.",
};

export default function PortfolioWorkPage() {
  return <PortfolioWork />;
}
