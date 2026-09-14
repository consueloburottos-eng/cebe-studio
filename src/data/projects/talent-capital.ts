import { Project, video, introGallery } from "./helpers";

export const talentCapital: Project = {
  slug: "talent-capital",
  title: "talent capital",
  category: "Product Design",
  tag: "product design · ux & ui",
  subtitle: "Powered by BuildWithin",
  client: "Talent Capital (MWCOG)",
  role: "Senior Product Designer (Contractor)",
  year: "2025",
  result:
    "Lanzado públicamente como TalentCapital.AI (abril 2026) por la Alcaldesa de DC Muriel Bowser junto a Maryland, Virginia y MWCOG — hoy conecta 83.000+ usuarios activos a 65.000+ empleos, y fue reconocido como Product of the Year por Technical.ly",
  services:
    "Diseño de experiencia agéntica · Diseño de sitio web y plataforma de candidatos · Design System",
  skills: [
    "Figma",
    "Conversational UX",
    "Design Systems",
    "UX Research",
    "Prototipado (Maze)",
    "Diseño responsive",
    "Accesibilidad",
    "Colaboración multi-stakeholder",
  ],
  cover: "Talent Capital — plataforma de candidatos",
  coverMedia: video("talent-capital", "hero.mp4"),
  brief:
    "Talent Capital nació de un mandato de una coalición regional (DC, Maryland, Virginia): empleadores, agencias de gobierno y organizaciones sin fines de lucro necesitaban una sola puerta de entrada al mercado laboral de la región, hoy fragmentado en decenas de bolsas de trabajo y portales inconexos. En alianza con BuildWithin, diseñé como Senior Product Designer la plataforma de candidatos completa — empleo, capacitación, coaching y eventos — con Celeste como puerta de entrada conversacional, en vez de un buscador con filtros. Celeste orquesta un equipo de cinco agentes especializados (empleos, eventos, emprendimiento, capacitación y coaching), un concepto definido por el CEO de BuildWithin, sobre el cual diseñé la experiencia de interacción completa.",
  strategy: [
    "El punto de partida fue la persona que busca trabajo, no la oferta. Diseñé la experiencia conversacional de Celeste como primera interacción — contarle a alguien qué está buscando, no elegir categoría y ubicación — así como la interacción con cada uno de los cinco agentes especializados del equipo (Maia, Hermes, Atlas, Antü y Newen). En paralelo, diseñé la plataforma de candidatos completa, donde empleo, formación, coaching y eventos conviven con el mismo peso — cada organización socia necesitaba que su programa se sintiera nativo de la plataforma, así que el sistema de componentes sostiene por igual una vacante que un programa de coaching ejecutivo.",
    "Esta misma tecnología de validación de elegibilidad automatizada por IA, que diseñé en paralelo para la plataforma central de BuildWithin, se reutiliza dentro de Talent Capital — reduciendo revisión manual documento por documento para los administradores de la coalición regional.",
    "Como Senior Product Designer, apoyé al equipo en flujos complejos: investigación → arquitectura de información → user flows → wireframes → prototipos de alta fidelidad → pruebas en Maze → revisión con Product → feedback con cliente y CEO → iteración → handoff. El trabajo se validó de forma continua con Product, el cliente y la CEO de BuildWithin, no como una fase aislada al final.",
  ],
  headline: "un consejero, no un buscador",
  gallery: introGallery("talent-capital", "Talent Capital", 1, 13, "mp4", { 1: "webp", 2: "webp" }),
  en: {
    tag: "product design · ux & ui",
    subtitle: "Powered by BuildWithin",
    result:
      "Publicly launched as TalentCapital.AI (April 2026) by DC Mayor Muriel Bowser alongside Maryland, Virginia, and MWCOG — today connecting 83,000+ active users to 65,000+ jobs, and recognized as Product of the Year by Technical.ly",
    services: "Agentic experience design · Candidate website & platform design · Design System",
    skills: [
      "Figma",
      "Conversational UX",
      "Design Systems",
      "UX Research",
      "Prototyping (Maze)",
      "Responsive Design",
      "Accessibility",
      "Multi-stakeholder Collaboration",
    ],
    brief:
      "Talent Capital was born from a regional coalition mandate (DC, Maryland, Virginia): employers, government agencies, and nonprofits needed a single front door to the region's job market, today fragmented across dozens of disconnected job boards and portals. In partnership with BuildWithin, I designed as Senior Product Designer the full candidate platform — jobs, training, coaching, and events — with Celeste as the conversational front door, instead of a filter-based search. Celeste orchestrates a team of five specialized agents (jobs, events, entrepreneurship, training, and coaching), a concept defined by BuildWithin's CEO, on top of which I designed the full interaction experience.",
    strategy: [
      "The starting point was the person looking for work, not the listing. I designed Celeste's conversational experience as the first interaction — telling someone what they're looking for, rather than picking a category and location — as well as the interaction with each of the five specialized agents on the team (Maia, Hermes, Atlas, Antü, and Newen). In parallel, I designed the full candidate platform, where jobs, training, coaching, and events carry equal weight — every partner organization needed its program to feel native to the platform, so the component system supports a job posting and an executive coaching program equally.",
      "This same AI-automated eligibility validation technology, which I designed in parallel for BuildWithin's core platform, is reused within Talent Capital — reducing manual document-by-document review for the regional coalition's administrators.",
      "As Senior Product Designer, I supported the team through complex flows: research → information architecture → user flows → wireframes → high-fidelity prototypes → Maze testing → Product review → client and CEO feedback → iteration → handoff. The work was validated continuously with Product, the client, and BuildWithin's CEO, not as an isolated phase at the end.",
    ],
    headline: "an advisor, not a search bar",
  },
};
