// VERCEL_URL is the unique per-deployment URL, not the stable production
// domain — prefer VERCEL_PROJECT_PRODUCTION_URL when this build is the
// production deployment, and only fall back to VERCEL_URL for previews.
const vercelProductionUrl =
  process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  vercelProductionUrl ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const siteName = "CEBE:STUDIO";

export const siteDescription =
  "Portafolio de Consuelo Burotto — product design, sistemas de diseño, dirección de arte y experiencias de IA conversacional.";
