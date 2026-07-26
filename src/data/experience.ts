// From her real CV (2026-06-30-cv-consuelo-burotto.pdf), most recent first.
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
    role: "UX/UI Lead Senior Designer",
    company: "BuildWithin",
    period: "2025–Hoy",
    place: "Remote",
    note: "Diseño UX/UI de una plataforma de desarrollo laboral que conecta aprendizaje, formación y empleo; personas, journey maps y experience blueprints de punta a punta para programas, postulantes y case managers.",
  },
  {
    role: "UX/UI Lead Senior Designer",
    company: "Altafid",
    period: "Jun 2022–Hoy",
    place: "Remote",
    note: "Diseño end-to-end de una plataforma SaaS para asesores financieros e inversionistas. Sistema de diseño propio de la empresa y +20% en retención de clientes al integrar UX con marketing, ventas y customer success.",
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
    role: "UX/UI Lead Senior Designer",
    company: "BuildWithin",
    period: "2025–Present",
    place: "Remote",
    note: "UX/UI design for a workforce-development platform connecting learning, training, and employment; end-to-end personas, journey maps, and experience blueprints for programs, applicants, and case managers.",
  },
  {
    role: "UX/UI Lead Senior Designer",
    company: "Altafid",
    period: "Jun 2022–Present",
    place: "Remote",
    note: "End-to-end design of a SaaS platform for financial advisors and investors. Built the company's own design system and drove +20% client retention by integrating UX with marketing, sales, and customer success.",
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
