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
    role: "Senior Product Designer",
    company: "BuildWithin",
    period: "2025–Hoy",
    place: "Remote",
    note: "Diseño de experiencias enterprise AI-native para desarrollo laboral gubernamental — flujos multi-rol, IA conversacional y un sistema de diseño robusto para programas, postulantes y case managers.",
  },
  {
    role: "Lead Senior Product Designer",
    company: "Altafid",
    period: "Jun 2022–Sep 2024",
    place: "Hybrid",
    note: "Diseño end-to-end de una plataforma SaaS para asesores financieros e inversionistas. Sistema de diseño propio de la empresa, con design tokens y component libraries, y +20% en retención de clientes al integrar UX con marketing, ventas y customer success.",
  },
  {
    role: "UX/UI Senior Designer",
    company: "Tekpro",
    period: "May 2019–Jun 2022",
    place: "Chile",
    note: "Sitios e-commerce centrados en el usuario sobre plataformas Magento, optimizados para conversión y rendimiento.",
  },
  {
    role: "Graphic Designer",
    company: "Alba Studio",
    period: "Dic 2018–Abr 2019",
    place: "Chile",
    note: "Identidades de marca completas — logos, paletas de color y manuales de marca — para múltiples clientes.",
  },
  {
    role: "UX/UI Designer",
    company: "CETIUC",
    period: "Jun 2018–Sep 2018",
    place: "Chile",
    note: "Rediseño completo del sitio institucional: arquitectura de información, wireframes y UI final.",
  },
];

export const EXPERIENCE_EN: ExperienceEntry[] = [
  {
    role: "Senior Product Designer",
    company: "BuildWithin",
    period: "2025–Present",
    place: "Remote",
    note: "Designing AI-native enterprise experiences for government workforce development — multi-role flows, conversational AI, and a robust design system for programs, applicants, and case managers.",
  },
  {
    role: "Lead Senior Product Designer",
    company: "Altafid",
    period: "Jun 2022–Sep 2024",
    place: "Hybrid",
    note: "End-to-end design of a SaaS platform for financial advisors and investors. Built the company's own design system — with design tokens and component libraries — and drove +20% client retention by integrating UX with marketing, sales, and customer success.",
  },
  {
    role: "UX/UI Senior Designer",
    company: "Tekpro",
    period: "May 2019–Jun 2022",
    place: "Chile",
    note: "User-centered e-commerce sites on Magento, optimized for conversion and performance.",
  },
  {
    role: "Graphic Designer",
    company: "Alba Studio",
    period: "Dec 2018–Apr 2019",
    place: "Chile",
    note: "Complete brand identities — logos, color palettes, and brand manuals — for multiple clients.",
  },
  {
    role: "UX/UI Designer",
    company: "CETIUC",
    period: "Jun 2018–Sep 2018",
    place: "Chile",
    note: "Full redesign of the institutional site: information architecture, wireframes, and final UI.",
  },
];
