// From her real CV (CB_CV.pdf, uploaded 2026-07-29), most recent first.
// Shared between Branding's AboutModal and SaaS's FeaturedExperience card
// so the two stay in sync instead of drifting apart.
export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  place: string;
  note: string;
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Senior Product Designer (Contractor)",
    company: "BuildWithin",
    period: "Oct 2025–Ago 2026",
    place: "Remote",
    note: "Diseño de la plataforma SaaS completa de BuildWithin, cubriendo todos los roles del ecosistema (Candidato, Talent Manager, Case Manager, Administrador, Super Administrador). Diseño de dos productos de IA conversacional: una evaluación para un cliente de seguridad gubernamental confidencial y Celeste (agente de carrera para Talent Capital/MWCOG), lanzado como TalentCapital.AI con más de 83.000 usuarios activos.",
  },
  {
    role: "Lead Senior Product Designer",
    company: "Altafid",
    period: "Jun 2022–Sep 2025",
    place: "Remote",
    note: "Diseño end-to-end de una plataforma SaaS fintech de gestión de activos (TAMP) para asesores financieros e inversionistas, una app móvil nativa y un marketplace B2B. Sistema de diseño creado desde cero (white-label, multiplataforma, mapeado a código, con QA de diseño junto al equipo de desarrollo en China): 90% menos de incidencias de QA de diseño en 23 features sobre 3 plataformas. Lideré y mentoré a 4 diseñadores de producto y trabajé con Product Owners, CTO, CEO y la jefatura de EE. UU. y Chile.",
  },
  {
    role: "UX/UI Senior Designer",
    company: "Tekpro",
    period: "May 2019–Jun 2022",
    place: "Chile",
    note: "Sitios e-commerce completos para 6 marcas (Agrosuper, Casa Royal, Casa Amarilla, Lego, Amphora) y operación diaria de diseño para más de 27 marcas. Home y landings implementadas en Magento 1/2/Cloud, WordPress, VTEX IO y Shopify (HTML, CSS, Bootstrap), con QA junto a desarrollo; prototipos estáticos y animados en Adobe XD y Figma. Creación de la marca y el sitio de Rocket Marketing.",
  },
  {
    role: "Graphic Designer",
    company: "Alba Studio",
    period: "Dic 2018–May 2019",
    place: "Chile",
    note: "Identidades de marca y piezas impresas, digitales y para redes sociales para múltiples clientes, y el sitio corporativo de NF Pro Producciones.",
  },
  {
    role: "UX/UI Designer",
    company: "CETIUC",
    period: "Ene 2018–Nov 2018",
    place: "Chile",
    note: "Primer sitio institucional desde cero (arquitectura de información, wireframes y UI final) e identidad de marca digital.",
  },
];

export const EXPERIENCE_EN: ExperienceEntry[] = [
  {
    role: "Senior Product Designer (Contractor)",
    company: "BuildWithin",
    period: "Oct 2025–Aug 2026",
    place: "Remote",
    note: "Designed BuildWithin's full SaaS platform, covering every role in the ecosystem (Candidate, Talent Manager, Case Manager, Administrator, Super Administrator). Designed two AI-conversational products: an assessment for a confidential government security client and Celeste (career agent for Talent Capital/MWCOG), launched as TalentCapital.AI with 83,000+ active users.",
  },
  {
    role: "Lead Senior Product Designer",
    company: "Altafid",
    period: "Jun 2022–Sep 2025",
    place: "Remote",
    note: "End-to-end design of a fintech asset-management (TAMP) SaaS platform for financial advisors and investors, a native mobile app, and a B2B marketplace. Built the design system from zero (white-label, multi-platform, mapped to code, with design QA alongside the development team in China): 90% fewer design-related QA issues across 23 features on 3 platforms. Led and mentored 4 product designers and worked with Product Owners, the CTO, the CEO, and leadership in the US and Chile.",
  },
  {
    role: "UX/UI Senior Designer",
    company: "Tekpro",
    period: "May 2019–Jun 2022",
    place: "Chile",
    note: "Complete e-commerce sites for 6 brands (Agrosuper, Casa Royal, Casa Amarilla, Lego, Amphora) and daily design operations for 27+ brands. Built home pages and landings in Magento 1/2/Cloud, WordPress, VTEX IO, and Shopify (HTML, CSS, Bootstrap), with QA alongside developers; static and animated prototypes in Adobe XD and Figma. Created the Rocket Marketing brand and website.",
  },
  {
    role: "Graphic Designer",
    company: "Alba Studio",
    period: "Dec 2018–May 2019",
    place: "Chile",
    note: "Brand identities and print, digital, and social assets for multiple clients, plus the NF Pro Producciones corporate website.",
  },
  {
    role: "UX/UI Designer",
    company: "CETIUC",
    period: "Jan 2018–Nov 2018",
    place: "Chile",
    note: "First institutional website from scratch (information architecture, wireframes, and final UI) and its digital brand identity.",
  },
];
