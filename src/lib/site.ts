export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const siteName = "CEBE:STUDIO";

export const siteDescription =
  "Portafolio de Consuelo Burotto — product design, sistemas de diseño, dirección de arte y experiencias de IA conversacional.";
