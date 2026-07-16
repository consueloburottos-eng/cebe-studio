import type { Metadata } from "next";
import SaasDesktop from "@/components/saas/SaasDesktop";

export const metadata: Metadata = {
  title: "SaaS",
  description:
    "El portafolio de Consuelo Burotto como si fuera un escritorio macOS: métricas, proyectos y contacto en un dashboard interactivo.",
};

export default function SaasPage() {
  return <SaasDesktop />;
}
