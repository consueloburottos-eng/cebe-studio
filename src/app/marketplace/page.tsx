import type { Metadata } from "next";
import MarketplaceHome from "@/components/marketplace/MarketplaceHome";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Un concierge de IA para explorar el portafolio de Consuelo Burotto — describe qué proyecto buscas y recibe una selección curada.",
};

export default function MarketplacePage() {
  return <MarketplaceHome />;
}
