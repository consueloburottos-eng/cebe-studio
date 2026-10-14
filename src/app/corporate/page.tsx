import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isModeEnabled } from "@/lib/modes";
import BrandingHome from "@/components/branding/BrandingHome";

export const metadata: Metadata = {
  title: "Corporate",
  description:
    "El portafolio de Consuelo Burotto como sitio corporativo — proyectos, servicios y contacto en el formato de una agencia de diseño.",
};

export default function CorporatePage() {
  if (!isModeEnabled("branding")) redirect("/");
  return <BrandingHome />;
}
