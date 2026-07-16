import type { Metadata } from "next";
import SaasDesktop from "@/components/saas/SaasDesktop";

export const metadata: Metadata = {
  title: "CEBE:STUDIO — SaaS",
};

export default function SaasPage() {
  return <SaasDesktop />;
}
