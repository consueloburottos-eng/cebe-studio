import { Project, img, introGallery } from "./helpers";

export const altafidPlatform: Project = {
  slug: "altafid",
  title: "altafid platform",
  category: "Product Design",
  tag: "product · fintech · b2b saas",
  subtitle: "De una plataforma de asesoramiento financiero a un ecosistema B2B para entidades financieras",
  client: "Altafid",
  role: "UX/UI Design Lead",
  year: "—",
  result: "Plataforma modular conectando Relationship Management, Portfolio Management, Operations y Trading",
  services: "Design system · UX research · UI · Liderazgo de equipo de diseño",
  skills: [
    "Figma",
    "FigJam",
    "Design Tokens",
    "Investigación de usuarios",
    "Design Systems",
    "Facilitation",
    "Stakeholder Management",
  ],
  cover: "Altafid Platform",
  coverMedia: img("altafid", "01.jpg"),
  brief:
    "Altafid nació como una plataforma centrada en la relación directa entre asesores financieros y sus clientes. La evolución del negocio abrió una oportunidad distinta: ofrecer la tecnología como solución B2B para bancos, firmas de asesoramiento y otras entidades de wealth management — lo que exigía transformar el producto en un ecosistema completo capaz de conectar gestión de clientes, portafolios, operaciones, facturación y trading dentro de una misma experiencia. Como UX/UI Design Lead, combiné trabajo hands-on con liderazgo de equipo: diseñé interfaces y journeys complejos, lideré la construcción del Design System desde cero, y mantuve una visión de producto transversal para que decisiones tomadas por distintos diseñadores construyeran una experiencia coherente.",
  strategy: [
    "La decisión estratégica fundamental fue no tratar Altafid como una suma de herramientas independientes, sino como un ecosistema de journeys conectados entre cuatro áreas: Relationship Management (gestión de clientes, perfiles, onboarding), Portfolio Management (cuentas, portafolios, estrategias de inversión), Operations (instrumentos, facturación, comisiones) y Trading (órdenes, ejecución, rebalanceo). Los usuarios no piensan en módulos separados — piensan en objetivos como incorporar un cliente, construir un portafolio o ejecutar una operación, así que diseñamos journeys end-to-end antes de cerrar pantallas aisladas.",
    "La investigación combinó sesiones continuas con el cliente, benchmark de plataformas de wealth management y CRM, y validaciones recurrentes de flujos y prototipos — no para copiar patrones de la competencia, sino para entender qué resultaba familiar a los usuarios y cómo organizar grandes volúmenes de información financiera. Un hallazgo clave: la personalización era una necesidad estructural, porque distintas entidades requerían configuraciones de permisos y procesos distintas, así que la plataforma debía ser consistente sin volverse rígida.",
    "Lideré la creación del Design System desde cero — colores, tipografía, tablas, formularios, estados, navegación — no solo como librería visual sino como herramienta de decisión: definimos comportamientos y reglas que ayudaban a diseñadores y desarrolladores a resolver casos nuevos sin partir de cero. El sistema fue especialmente crítico en Portfolio Management, Operations y Trading, donde se repetían estructuras de datos, tablas y acciones, y permitió que el equipo escalara el producto manteniendo consistencia entre docenas de flujos.",
  ],
  headline: "un ecosistema de journeys conectados",
  gallery: [
    { label: "Altafid — dashboard", media: img("altafid", "02.jpg") },
    { label: "Altafid — portafolios", media: img("altafid", "03.jpg") },
    { label: "Altafid — trading", media: img("altafid", "04.jpg") },
    { label: "Altafid — compliance", media: img("altafid", "05.jpg") },
    { label: "Altafid — billing", media: img("altafid", "06.jpg") },
    { label: "Altafid — CRM", media: img("altafid", "07.jpg") },
    ...introGallery("altafid", "Altafid", 7, 13),
  ],
  en: {
    tag: "product · fintech · b2b saas",
    subtitle: "From a financial advisory platform to a B2B ecosystem for financial institutions",
    result: "A modular platform connecting Relationship Management, Portfolio Management, Operations, and Trading",
    services: "Design system · UX research · UI · Design team leadership",
    skills: ["Figma", "FigJam", "Design Tokens", "User Research", "Design Systems", "Facilitation", "Stakeholder Management"],
    brief:
      "Altafid started as a platform centered on the direct relationship between financial advisors and their clients. The business's evolution opened up a different opportunity: offering the technology as a B2B solution for banks, advisory firms, and other wealth-management entities — which required turning the product into a full ecosystem capable of connecting client management, portfolios, operations, billing, and trading within a single experience. As UX/UI Design Lead, I combined hands-on work with team leadership: designed complex interfaces and journeys, led the Design System build from scratch, and kept a cross-cutting product vision so decisions made by different designers built a coherent experience.",
    strategy: [
      "The core strategic decision was to treat Altafid not as a sum of independent tools, but as an ecosystem of connected journeys across four areas: Relationship Management (client management, profiles, onboarding), Portfolio Management (accounts, portfolios, investment strategies), Operations (instruments, billing, commissions), and Trading (orders, execution, rebalancing). Users don't think in separate modules — they think in goals like onboarding a client, building a portfolio, or executing a trade, so we designed end-to-end journeys before locking in isolated screens.",
      "Research combined ongoing sessions with the client, benchmarking of wealth-management and CRM platforms, and recurring validation of flows and prototypes — not to copy competitor patterns, but to understand what felt familiar to users and how to organize large volumes of financial information. A key finding: personalization was a structural need, because different entities required different permission and process configurations, so the platform had to stay consistent without becoming rigid.",
      "I led the Design System build from scratch — colors, typography, tables, forms, states, navigation — not just as a visual library but as a decision-making tool: we defined behaviors and rules that helped designers and developers solve new cases without starting from zero. The system was especially critical in Portfolio Management, Operations, and Trading, where data structures, tables, and actions repeated, and it let the team scale the product while keeping consistency across dozens of flows.",
    ],
    headline: "an ecosystem of connected journeys",
  },
};
