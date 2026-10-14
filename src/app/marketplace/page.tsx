import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isModeEnabled } from "@/lib/modes";
import MarketplaceHome from "@/components/marketplace/MarketplaceHome";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Un concierge de IA para explorar el portafolio de Consuelo Burotto — describe qué proyecto buscas y recibe una selección curada.",
};

export default function MarketplacePage() {
  if (!isModeEnabled("marketplace")) redirect("/");
  return <MarketplaceHome />;
}
