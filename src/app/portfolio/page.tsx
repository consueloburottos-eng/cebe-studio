import { redirect } from "next/navigation";

// Portfolio moved to "/" — keep this route alive as a redirect instead of a
// dead link, for anything that still points at the old URL.
export default function PortfolioPage() {
  redirect("/");
}
