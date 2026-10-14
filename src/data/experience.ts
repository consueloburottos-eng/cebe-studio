// From her real CV (Product Designer - Consuelo Burotto.pdf, 2026-10-14), most recent first.
// Shared between Branding's AboutModal and SaaS's FeaturedExperience card
// so the two stay in sync instead of drifting apart.
export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  place?: string;
  // short paragraph, used when an entry has no bullets
  note?: string;
  // CV bullet points, shown as a list when present
  bullets?: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Senior Product Designer (Contractor)",
    company: "BuildWithin",
    period: "Oct 2025–Ago 2026",
    place: "Remote",
    bullets: [
      "Lideré el diseño de producto de TalentCapital.AI y su agente de carrera con IA, Celeste, desde la idea hasta el lanzamiento. La plataforma superó los 83.000 usuarios activos y fue nombrada Producto del Año por Technical.ly.",
      "Reduje el abandono tras el registro de cerca de un 40% a un 10% usando funnels y grabaciones de sesión de PostHog para encontrar dónde se atascaba la gente y rediseñando el onboarding en torno a eso.",
      "Diseñé la carga de CV, el matching de empleos y la orientación de carrera, con explicaciones del puntaje de compatibilidad y feedback de me gusta/no me gusta para que los usuarios entiendan y confíen en cada recomendación.",
      "Diseñé preguntas de seguimiento y aclaración para que el agente de IA pida contexto en vez de adivinar.",
      "Construí rachas, insignias, metas semanales, dashboards de progreso y evaluaciones de habilidades que mantienen a los usuarios volviendo.",
      "Diseñé un SaaS de cinco roles para un cliente gubernamental, con reglas de elegibilidad, validación de documentos con IA y flujos claros de recuperación para cargas fallidas o borrosas.",
      "Trabajé con product managers, ingenieros y ejecutivos, prototipando en Figma Make para validar ideas antes del diseño detallado.",
    ],
  },
  {
    role: "Lead Senior Product Designer",
    company: "Altafid",
    period: "Jun 2022–Sep 2025",
    place: "Remote",
    bullets: [
      "Lideré el diseño de una plataforma white-label de gestión patrimonial (TAMP) y su marketplace de modelos de inversión, usada por instituciones financieras, asesores y sus clientes, y mentoré a cuatro diseñadores de producto.",
      "Alineé la estrategia de producto, las necesidades de usuario y la implementación técnica con product owners, ingenieros, el CTO y el CEO entre EE. UU. y Chile.",
      "Realicé entrevistas con usuarios, tests de usabilidad y tests de preferencia A/B con Maze en distintos arquetipos de usuario, y usé los hallazgos para resolver decisiones de diseño.",
      "Diseñé journeys de cliente complejos, desde onboarding, KYC, documentos y firmas electrónicas hasta la construcción de portafolios, trading y facturación.",
      "Diseñé dashboards, tablas con búsqueda, filtros y paneles laterales que hacen fáciles de leer los balances, el rendimiento y la asignación de activos.",
      "Diseñé una PWA mobile-first para asesores y una app nativa para sus clientes sobre un mismo sistema de diseño, además de herramientas de administración para configurar el portal de cliente de cada institución.",
      "Construí un sistema de diseño multimarca con cuatro niveles de tokens, alineado con React y Storybook, que redujo un 90% las incidencias de QA de diseño en 23 features y tres plataformas.",
    ],
  },
  {
    role: "Senior UX/UI Designer (eCommerce)",
    company: "Tekpro",
    period: "May 2019–Jun 2022",
    place: "Remote",
    bullets: [
      "Lideré el UX/UI de seis sitios eCommerce, incluidos LEGO, Agrosuper, Casa Royal y Amphora, desde el discovery con el cliente hasta el QA de diseño, y di soporte a más de 27 marcas en Magento, VTEX IO, Shopify y WordPress.",
      "Hice benchmarking de competidores y estudié a los compradores invitados y registrados y sus necesidades postcompra, y luego adapté cada checkout a los objetivos y costos de negocio del cliente.",
      "Simplifiqué el checkout con compra como invitado, autocompletado, menos campos y sin distracciones, y facilité encontrar y aplicar códigos promocionales.",
      "Diseñé un carrito donde se pueden restaurar los productos eliminados; quienes eliminaban productos tenían más probabilidades de agregar más después.",
      "Destaqué reseñas genuinas y variadas en las páginas de producto para generar confianza.",
      "Realicé tests A/B en páginas de producto, checkout y campañas de email; los emails con GIF y video convirtieron mejor que los estáticos.",
      "Extendí las mejoras a todas las marcas de clientes con componentes y patrones reutilizables adaptados a cada una, incluidas las campañas de Black Friday y Cyber Monday.",
    ],
  },
  {
    role: "Graphic Designer",
    company: "Alba Studio",
    period: "Dic 2018–May 2019",
    note: "Identidades de marca y piezas impresas, digitales y para redes sociales para múltiples clientes, y el sitio corporativo de NF Pro Producciones.",
  },
  {
    role: "UX/UI Designer",
    company: "CETIUC",
    period: "Ene 2018–Nov 2018",
    note: "Diseñé el primer sitio web de la institución desde cero (arquitectura de información, wireframes y UI final) e identidad de marca digital.",
  },
];

export const EXPERIENCE_EN: ExperienceEntry[] = [
  {
    role: "Senior Product Designer (Contractor)",
    company: "BuildWithin",
    period: "Oct 2025–Aug 2026",
    place: "Remote",
    bullets: [
      "Owned product design for TalentCapital.AI and its AI career agent, Celeste, from idea to launch. The platform reached 83,000+ active users and was named Product of the Year by Technical.ly.",
      "Cut post-signup drop-off from around 40% to 10% after using PostHog funnels and session recordings to find where people got stuck and redesigning onboarding around it.",
      "Designed CV upload, job matching and career guidance, with match-score explanations and like/dislike feedback so users understand and trust each recommendation.",
      "Designed follow-up and clarification questions so the AI agent asks for context instead of guessing.",
      "Built streaks, badges, weekly goals, progress dashboards and skill assessments that keep users coming back.",
      "Designed a five-role SaaS for a government client, with eligibility rules, AI document validation and clear recovery flows for failed or blurry uploads.",
      "Worked with product managers, engineers and executives, prototyping in Figma Make to validate ideas before detailed design.",
    ],
  },
  {
    role: "Lead Senior Product Designer",
    company: "Altafid",
    period: "Jun 2022–Sep 2025",
    place: "Remote",
    bullets: [
      "Led design for a white-label wealth management platform (TAMP) and its investment-model marketplace, used by financial institutions, advisors and their clients, and mentored four product designers.",
      "Aligned product strategy, user needs and technical implementation with product owners, engineers, the CTO and the CEO across the US and Chile.",
      "Ran user interviews, usability tests and A/B preference tests with Maze across different user archetypes, and used the findings to settle design decisions.",
      "Designed complex customer journeys, from onboarding, KYC, documents and e-signatures to portfolio building, trading and billing.",
      "Designed dashboards, searchable tables, filters and side panels that make portfolio balances, performance and asset allocation easy to read.",
      "Designed a mobile-first PWA for advisors and a native app for their clients on one design system, plus admin tools to configure each institution's client portal.",
      "Built a multi-brand design system with four token levels, aligned with React and Storybook, that cut design-related QA issues by 90% across 23 features and three platforms.",
    ],
  },
  {
    role: "Senior UX/UI Designer (eCommerce)",
    company: "Tekpro",
    period: "May 2019–Jun 2022",
    place: "Remote",
    bullets: [
      "Led UX/UI for six eCommerce sites, including LEGO, Agrosuper, Casa Royal and Amphora, from client discovery to design QA, and supported 27+ brands on Magento, VTEX IO, Shopify and WordPress.",
      "Ran competitor benchmarking and studied guest and registered buyers and their post-purchase needs, then adapted each checkout to the client's business goals and costs.",
      "Simplified the checkout with guest checkout, autofill, fewer fields and no distractions, and made promo codes easy to find and apply.",
      "Designed a cart where removed items can be restored; shoppers who removed items were more likely to add more later.",
      "Highlighted genuine, varied customer reviews on product pages to build trust.",
      "Ran A/B tests on product pages, checkout and email campaigns; GIF and video emails converted better than static ones.",
      "Rolled the improvements out across all client brands with reusable components and patterns adapted to each one, including Black Friday and Cyber Monday campaigns.",
    ],
  },
  {
    role: "Graphic Designer",
    company: "Alba Studio",
    period: "Dec 2018–May 2019",
    note: "Brand identities and print, digital, and social assets for multiple clients, plus the NF Pro Producciones corporate website.",
  },
  {
    role: "UX/UI Designer",
    company: "CETIUC",
    period: "Jan 2018–Nov 2018",
    note: "Designed the institution's first website from scratch (information architecture, wireframes, and final UI) and its digital brand identity.",
  },
];
