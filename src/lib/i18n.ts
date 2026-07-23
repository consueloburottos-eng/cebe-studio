import type { Project } from "@/data/projects";
import type { Lang } from "@/hooks/useSiteLanguage";

// Merges a project's optional `en` overrides on top of its (Spanish) base
// fields. Any field missing from `en` quietly falls back to Spanish, so a
// project can be translated incrementally without breaking the toggle.
export function localizeProject(project: Project, lang: Lang): Project {
  if (lang === "es" || !project.en) return project;
  const en = project.en;
  return {
    ...project,
    category: en.category ?? project.category,
    tag: en.tag ?? project.tag,
    subtitle: en.subtitle ?? project.subtitle,
    role: en.role ?? project.role,
    result: en.result ?? project.result,
    services: en.services ?? project.services,
    skills: en.skills ?? project.skills,
    brief: en.brief ?? project.brief,
    strategy: en.strategy ?? project.strategy,
    headline: en.headline ?? project.headline,
  };
}

export function localizeProjects(projects: Project[], lang: Lang): Project[] {
  return projects.map((p) => localizeProject(p, lang));
}

// Static UI copy shared across Branding/SaaS/Marketplace. Keyed by section so
// each component only pulls in what it needs: `t("nav", lang).about`.
export const UI = {
  nav: {
    es: { siteView: "Vista del sitio", about: "sobre mí", projects: "proyectos", services: "servicios" },
    en: { siteView: "Site view", about: "about", projects: "projects", services: "services" },
  },
  projectDetail: {
    es: {
      brief: "resumen",
      strategy: "estrategia",
      services: "servicios",
      skills: "habilidades",
      client: "CLIENTE",
      role: "ROL",
      year: "AÑO",
      result: "RESULTADO",
      home: "inicio",
      email: "correo",
      moreProjects: "MÁS PROYECTOS",
      scrollHint: "Scroll ↕ para barajar",
      comingSoon: "próximamente",
      caseStudyInPrep: "Case study en preparación",
      contentInPrep: "El contenido de este proyecto está en preparación — pronto vas a poder ver el caso completo acá.",
      projectInProgress: "proyecto por documentar",
    },
    en: {
      brief: "brief",
      strategy: "strategy",
      services: "services",
      skills: "skills",
      client: "CLIENT",
      role: "ROLE",
      year: "YEAR",
      result: "RESULT",
      home: "home",
      email: "email",
      moreProjects: "MORE PROJECTS",
      scrollHint: "Scroll ↕ to shuffle",
      comingSoon: "coming soon",
      caseStudyInPrep: "Case study in progress",
      contentInPrep: "This project's content is still in progress — the full case study will be up here soon.",
      projectInProgress: "project in progress",
    },
  },
  about: {
    es: {
      tabs: { perfil: "Perfil", experiencia: "Experiencia", skills: "Skills", book: "Book me" },
      yearsExperience: "Años de experiencia",
      companiesRoles: "Empresas · roles UX/UI",
      education: "Educación",
      downloadCV: "Download CV",
      experience: "Experiencia",
      languages: "Idiomas",
      skillsByProject: "Skills — por proyecto",
      project: "proyecto",
      projectsPlural: "proyectos",
      fullToolkit: "Toolkit completo",
      bookHeadline: "let's build something",
      bookBody: "Cuéntame sobre tu proyecto de identidad, producto o experiencia. Respondo en 24–48 h.",
      copied: "Copiado ✓",
      bio: "UX/UI Lead con 8 años de experiencia diseñando plataformas SaaS complejas y sistemas de diseño escalables. He liderado el diseño de punta a punta de plataformas de desarrollo laboral y fintech, traduciendo research de usuarios en experiencias intuitivas — con research, journey mapping y prototipado en Figma que se entrega listo para desarrollo.",
    },
    en: {
      tabs: { perfil: "Profile", experiencia: "Experience", skills: "Skills", book: "Book me" },
      yearsExperience: "Years of experience",
      companiesRoles: "Companies · UX/UI roles",
      education: "Education",
      downloadCV: "Download CV",
      experience: "Experience",
      languages: "Languages",
      skillsByProject: "Skills — by project",
      project: "project",
      projectsPlural: "projects",
      fullToolkit: "Full toolkit",
      bookHeadline: "let's build something",
      bookBody: "Tell me about your identity, product, or experience project. I reply within 24–48 h.",
      copied: "Copied ✓",
      bio: "UX/UI Lead with 8 years of experience designing complex SaaS platforms and scalable design systems. I've led end-to-end design for workforce-development and fintech platforms, translating user research into intuitive experiences — with research, journey mapping, and Figma prototyping delivered dev-ready.",
    },
  },
} as const;

export function t<K extends keyof typeof UI>(section: K, lang: Lang): (typeof UI)[K][Lang] {
  const entry = UI[section] as Record<Lang, (typeof UI)[K][Lang]>;
  return entry[lang];
}
