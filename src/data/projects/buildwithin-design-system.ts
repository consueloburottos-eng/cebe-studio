import { Project, img, introGallery } from "./helpers";

export const buildwithinSuperAdmin: Project = {
  slug: "buildwithin-design-system",
  title: "buildwithin — superadmin",
  category: "Product Design",
  tag: "product design · enterprise saas · ai-powered ops",
  subtitle: "Plataforma Enterprise para gestionar programas Workforce con IA",
  client: "BuildWithin",
  role: "Lead Product Designer",
  year: "2025",
  result: "Ecosistema Enterprise configurable — programas, elegibilidad WIOA y matching automatizados por IA",
  services: "Product Design · Design System · Estrategia de producto Enterprise",
  skills: [
    "Figma",
    "Maze",
    "Design Systems",
    "Enterprise UX",
    "AI-powered workflows",
    "Prototipado",
    "Stakeholder Management",
  ],
  cover: "BuildWithin — SuperAdmin",
  coverMedia: img("buildwithin-design-system", "cover.png"),
  brief:
    "BuildWithin Admin Platform es el sistema Enterprise que administra el ciclo completo de programas Workforce — configuración, elegibilidad, aprendizaje y operación — para gobiernos, organizaciones y centros de capacitación. La plataforma original de BuildWithin estaba pensada para otro modelo de negocio; la evolucionamos hacia un producto Workforce que debía soportar seis perfiles de usuario distintos (Super Admin, Organization Admin, Talent Manager, Case Manager, Employer, Staff interno), cada uno con permisos, herramientas y flujos propios. Como Lead Product Designer lideré esta transformación completa durante 6 meses: definí la experiencia de producto de principio a fin, diseñé las funcionalidades principales, construí el Design System, y validé cada decisión junto con Product, la CEO y los stakeholders — sin perder de vista que cada organización cliente tiene reglas de negocio completamente distintas entre sí.",
  strategy: [
    "La estrategia se apoyó en tres principios. Configuración antes que desarrollo: siempre que fue posible, las organizaciones debían poder configurar el sistema —reglas WIOA, documentos requeridos, umbrales económicos, criterios de elegibilidad, programas, Pathways— sin depender del equipo técnico. Automatización mediante IA: en vez de trasladar procesos manuales al entorno digital, buscamos automatizarlos, para que la IA redujera trabajo operativo real y no se convirtiera en una funcionalidad más que aprender. Y plataforma escalable: cada módulo funciona de forma independiente pero comparte componentes, patrones y reglas — por eso diseñé un Design System desde cero.",
    "El producto terminó siendo un ecosistema de módulos conectados: gestión de programas (módulos, unidades, competencias, documentos, horas de aprendizaje), un sistema de Learning Management para construir Pathways personalizados por organización, una vista unificada de administración de participantes con indicadores de progreso, estado, RTI y Journey Health para detectar casos en riesgo, y Candidate 360° — una sola pantalla con toda la información, documentos, aplicaciones, programas y elegibilidad de cada candidato, eliminando la navegación entre pantallas sueltas.",
    "El mayor reto fue el motor de elegibilidad WIOA: transformar un proceso altamente regulado en una herramienta configurable, donde cada organización define sus propios documentos requeridos, límites económicos, tamaño familiar y criterios de revisión. La IA identifica y clasifica documentos automáticamente, reutiliza un mismo archivo para varios requisitos, valida vencimientos y firmas, detecta baja calidad, y determina elegibilidad antes de avanzar. Sumé además gestión de posiciones (creación manual, por URL, por documento o asistida por IA), un sistema de Matching que conecta candidato → programa → Pathway → posición → aplicación, y validé cada flujo nuevo con pruebas de usabilidad en Maze antes de pasar a desarrollo.",
  ],
  headline: "configurar, no codear",
  gallery: introGallery("buildwithin-design-system", "BuildWithin — SuperAdmin", 1, 13),
  features: [
    {
      id: "wioa-eligibility-rules",
      label: "Reglas de elegibilidad WIOA",
      title: "Motor de reglas de elegibilidad WIOA, configurable por organización",
      body: [
        "WIOA (Workforce Innovation and Opportunity Act) exige verificar elegibilidad por categorías como residencia, edad, tamaño familiar, ingresos y discapacidad. Antes de este rediseño, todo esto se validaba manualmente desde una oficina, por teléfono o chat: un proceso lento, sin ninguna vista de seguimiento — no se sabía en qué estado estaba cada candidato, y muchas personas simplemente no terminaban de aplicar.",
        "La primera versión del flujo asumió que una lista fija de documentos por categoría alcanzaba para todas las organizaciones. La UX research mostró que no: cada organización cliente aceptaba distintos documentos válidos por categoría y aplicaba sus propias reglas, como ventanas de vigencia (por ejemplo, solo documentos de los últimos 30 o 60 días) — así que rediseñé el sistema como un motor de definiciones configurable por organización, sin depender del equipo técnico.",
        "Ya con el flujo construido, tuvimos que ajustarlo de nuevo por income y family size: WIOA excluye a familias cuyo ingreso familiar supera cierto umbral, así que verificar el ingreso de una sola persona no alcanzaba para determinar elegibilidad real. Rediseñé la carga de documentos para que, cuando el candidato tiene familia, deba subir un documento de ingresos por cada integrante del hogar — permitiendo calcular el ingreso familiar real en vez de aproximarlo con un solo documento.",
        "Del lado del Super Admin, la vista muestra a cada candidato con su estado real: sin iniciar elegibilidad, en proceso, need review, not eligible o eligible. El case manager revisa cada prueba por categoría con la información de compliance extraída por IA directamente de los documentos — edad, residencia, ingreso familiar consolidado, historial escolar — dándole datos reales para generar matches más precisos con los programas disponibles.",
      ],
      en: {
        label: "WIOA eligibility rules",
        title: "Configurable WIOA eligibility rules engine",
        body: [
          "WIOA (Workforce Innovation and Opportunity Act) requires verifying eligibility across categories like residency, age, family size, income, and disability. Before this redesign, all of this was validated manually out of an office, by phone, or through chat: a slow process with no tracking view at all — there was no way to see what status each candidate was in, and many people simply never finished applying.",
          "The flow's first version assumed a fixed document list per category would work for every organization. UX research showed it didn't: each client organization accepted different valid documents per category and applied its own rules, like validity windows (for example, only documents from the last 30 or 60 days) — so I redesigned the system as a definitions engine configurable per organization, without depending on the engineering team.",
          "Once the flow was already built, we had to adjust it again for income and family size: WIOA excludes families whose household income is above a certain threshold, so verifying a single person's income wasn't enough to determine real eligibility. I redesigned the document upload so that, when a candidate has family, they need to upload an income document for each household member — making it possible to calculate real household income instead of approximating it from a single document.",
          "On the Super Admin side, the view shows each candidate with their real status: eligibility not started, in process, needs review, not eligible, or eligible. The case manager reviews each category's proof with the compliance information the AI extracted directly from the documents — age, residency, consolidated household income, school record — giving them real data to generate more precise matches with available programs.",
        ],
      },
    },
  ],
  en: {
    tag: "product design · enterprise saas · ai-powered ops",
    subtitle: "Enterprise platform for running Workforce programs with AI",
    result: "Configurable Enterprise ecosystem — programs, WIOA eligibility, and matching automated by AI",
    services: "Product Design · Design System · Enterprise product strategy",
    skills: ["Figma", "Maze", "Design Systems", "Enterprise UX", "AI-powered workflows", "Prototyping", "Stakeholder Management"],
    brief:
      "BuildWithin Admin Platform is the Enterprise system that runs the full lifecycle of Workforce programs — configuration, eligibility, learning, and operations — for governments, organizations, and training centers. BuildWithin's original platform was built for a different business model; we evolved it into a Workforce product that had to support six distinct user profiles (Super Admin, Organization Admin, Talent Manager, Case Manager, Employer, internal Staff), each with its own permissions, tools, and flows. As Lead Product Designer I led this full transformation over 6 months: defined the end-to-end product experience, designed the core features, built the Design System, and validated every decision alongside Product, the CEO, and stakeholders — without losing sight of the fact that every client organization runs on completely different business rules.",
    strategy: [
      "The strategy rested on three principles. Configuration over development: wherever possible, organizations needed to configure the system — WIOA rules, required documents, income thresholds, eligibility criteria, programs, Pathways — without depending on the engineering team. AI-driven automation: rather than porting manual processes into a digital form, we set out to automate them, so AI reduced real operational work instead of becoming one more feature to learn. And a scalable platform: every module works independently but shares components, patterns, and rules — which is why I designed a Design System from scratch.",
      "The product ended up as an ecosystem of connected modules: program management (modules, units, competencies, documents, learning hours), a Learning Management system for building organization-specific Pathways, a unified participant-management view with progress indicators, status, RTI, and Journey Health to flag at-risk cases, and Candidate 360° — a single screen with all of a candidate's information, documents, applications, programs, and eligibility, eliminating navigation across loose, separate screens.",
      "The biggest challenge was the WIOA eligibility engine: turning a heavily regulated process into a configurable tool, where each organization defines its own required documents, income limits, household size, and review criteria. AI automatically identifies and classifies documents, reuses a single file across multiple requirements, validates expiration dates and signatures, flags low quality, and determines eligibility before moving forward. I also added position management (manual creation, by URL, by document, or AI-assisted), a Matching system that connects candidate → program → Pathway → position → application, and validated every new flow with Maze usability testing before it moved to development.",
    ],
    headline: "configure, don't code",
  },
};
