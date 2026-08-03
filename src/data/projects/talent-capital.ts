import { Project, video, introGallery } from "./helpers";

export const talentCapital: Project = {
  slug: "talent-capital",
  title: "talent capital",
  category: "Product Design",
  tag: "product design · ux & ui",
  subtitle: "Powered by BuildWithin",
  client: "BuildWithin",
  role: "Lead Product Designer",
  year: "2025",
  result: "Ecosistema unificado DC · MD · VA + validación documental automatizada por IA",
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
    "Talent Capital nació de un mandato de una coalición regional (DC, Maryland, Virginia): empleadores, agencias de gobierno y organizaciones sin fines de lucro necesitaban una sola puerta de entrada al mercado laboral de la región, hoy fragmentado en decenas de bolsas de trabajo y portales inconexos. En alianza con BuildWithin, lideré como Lead Product Designer el rediseño completo de la plataforma — originalmente enfocada en otro mercado — hacia un producto Workforce capaz de gestionar candidatos, aprendizaje, elegibilidad y oportunidades laborales mediante IA, con Celeste (el agente conversacional) como puerta de entrada, en vez de un buscador con filtros.",
  strategy: [
    "El punto de partida fue la persona que busca trabajo, no la oferta. Diseñé la experiencia agéntica de Celeste como primera interacción: contarle a alguien qué está buscando, no elegir categoría y ubicación. En paralelo, diseñé el sitio web y la plataforma de candidatos completa, donde empleo, formación, coaching y eventos conviven con el mismo peso — cada organización socia necesitaba que su programa se sintiera nativo de la plataforma, así que el sistema de componentes sostiene por igual una vacante que un programa de coaching ejecutivo.",
    "Uno de los procesos más costosos era la validación de elegibilidad, tradicionalmente manual: los candidatos entregaban múltiples documentos y los administradores revisaban uno por uno categoría, vigencia, firmas, coincidencia con el perfil y calidad de imagen — repitiendo la revisión cuando un mismo documento servía para varias categorías. Rediseñé este flujo integrando IA que identifica el tipo de documento, lo clasifica, reutiliza un mismo archivo para múltiples requisitos, valida vencimientos y firmas, detecta baja calidad, y determina elegibilidad antes de avanzar — deteniendo el flujo antes de una revisión administrativa que nunca iba a aprobarse.",
    "Como Lead Product Designer, construí también el Design System que sostiene toda la plataforma y apoyé al equipo en flujos complejos: investigación → arquitectura de información → user flows → wireframes → prototipos de alta fidelidad → pruebas en Maze → revisión con Product → feedback con cliente y CEO → iteración → handoff. El trabajo se validó de forma continua con Product, el cliente y la CEO de BuildWithin, no como una fase aislada al final.",
  ],
  headline: "un consejero, no un buscador",
  gallery: introGallery("talent-capital", "Talent Capital", 1, 13, "mp4", { 1: "webp", 2: "webp" }),
  en: {
    tag: "product design · ux & ui",
    subtitle: "Powered by BuildWithin",
    result: "Unified DC · MD · VA ecosystem + AI-automated document validation",
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
      "Talent Capital was born from a regional coalition mandate (DC, Maryland, Virginia): employers, government agencies, and nonprofits needed a single front door to the region's job market, today fragmented across dozens of disconnected job boards and portals. In partnership with BuildWithin, I led as Lead Product Designer the full redesign of the platform — originally built for a different market — into a Workforce product capable of managing candidates, learning, eligibility, and job opportunities through AI, with Celeste (the conversational agent) as the front door, instead of a filter-based search.",
    strategy: [
      "The starting point was the person looking for work, not the listing. I designed Celeste's agentic experience as the first interaction: telling someone what they're looking for, rather than picking a category and location. In parallel, I designed the full website and candidate platform, where jobs, training, coaching, and events carry equal weight — every partner organization needed its program to feel native to the platform, so the component system supports a job posting and an executive coaching program equally.",
      "One of the most costly processes was eligibility validation, traditionally manual: candidates submitted multiple documents and administrators reviewed each one — category, validity, signatures, profile match, and image quality — repeating the review whenever one document served multiple categories. I redesigned this flow by integrating AI that identifies the document type, classifies it, reuses a single file across multiple requirements, validates expiration dates and signatures, flags low quality, and determines eligibility before moving forward — stopping the flow before an administrative review that was never going to be approved.",
      "As Lead Product Designer, I also built the Design System that underpins the whole platform and supported the team through complex flows: research → information architecture → user flows → wireframes → high-fidelity prototypes → Maze testing → Product review → client and CEO feedback → iteration → handoff. The work was validated continuously with Product, the client, and BuildWithin's CEO, not as an isolated phase at the end.",
    ],
    headline: "an advisor, not a search bar",
  },
};
