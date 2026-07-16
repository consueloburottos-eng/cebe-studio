import type { Metadata } from "next";
import MarketplaceHome from "@/components/marketplace/MarketplaceHome";

export const metadata: Metadata = {
  title: "CEBE:STUDIO — Marketplace",
};

export default function MarketplacePage() {
  return <MarketplaceHome />;
}
