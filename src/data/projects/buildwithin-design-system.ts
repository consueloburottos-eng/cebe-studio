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
  result:
    "Ecosistema Enterprise configurable que evolucionó una plataforma de un solo perfil hacia seis roles de usuario distintos, con un motor de elegibilidad WIOA automatizado por IA",
  metrics: [
    { value: "6", label: "Perfiles de usuario distintos soportados", labelEn: "Distinct user roles supported" },
    { value: "6 meses", valueEn: "6 months", label: "Duración de la transformación completa", labelEn: "Full transformation timeline" },
    {
      value: "Design System",
      valueEn: "Design System",
      label: "Construido desde cero para toda la plataforma",
      labelEn: "Built from scratch for the whole platform",
    },
  ],
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
  gallery: introGallery("buildwithin-design-system", "BuildWithin — SuperAdmin", 1, 13, "webp", { 1: "png" }),
  features: [
    {
      id: "wioa-eligibility-rules",
      label: "IA en escaneo de documentos",
      title: "Motor de reglas de elegibilidad configurable, con escaneo de documentos por IA",
      metrics: [
        {
          value: "30+",
          label: "Categorías de elegibilidad WIOA soportadas",
          labelEn: "WIOA eligibility categories supported",
        },
        {
          value: "0",
          label: "Revisiones manuales para candidatos con documentos completos",
          labelEn: "Manual reviews for candidates with complete documents",
        },
        {
          value: "Case manager",
          valueEn: "Case manager",
          label: "De revisar documentos a buscar oportunidades",
          labelEn: "From reviewing documents to finding opportunities",
        },
      ],
      metricsNote:
        "Categorías según el marco federal de elegibilidad de WIOA (DOL); cada organización configura qué documentos acepta para cada una.",
      gallery: [
        {
          media: img("buildwithin-design-system", "feature-wioa-income-rules.png"),
          caption:
            "Configuración de reglas de ingreso: cada organización elige un preset de Federal Poverty Guidelines, ajusta los umbrales por tamaño familiar, y previsualiza en vivo cómo el ingreso de un candidato mapea a pre-aprobado, needs review o likely ineligible.",
          captionEn:
            "Income rules configuration: each organization picks a Federal Poverty Guidelines preset, adjusts thresholds by family size, and gets a live preview of how a candidate's income maps to pre-approved, needs review, or likely ineligible.",
        },
      ],
      metricsNoteEn:
        "Categories per the federal WIOA eligibility framework (DOL); each organization configures which documents it accepts for each one.",
      body: [
        "WIOA (Workforce Innovation and Opportunity Act) exige verificar elegibilidad en más de 30 categorías distintas — identidad, edad, residencia, ingresos, SNAP, veterano, discapacidad, entre otras — cada una con su propia lista de documentos aceptables según el DOL. Antes de este rediseño, todo esto se validaba manualmente desde una oficina, por teléfono o chat: un proceso lento, sin ninguna vista de seguimiento — no se sabía en qué estado estaba cada candidato, y muchas personas simplemente no terminaban de aplicar.",
        "La primera versión del flujo asumió que una lista fija de documentos por categoría alcanzaba para todas las organizaciones. La UX research mostró que no: cada organización cliente aceptaba distintos documentos válidos por categoría y aplicaba sus propias reglas, como ventanas de vigencia (por ejemplo, solo documentos de los últimos 30 o 60 días) — así que rediseñé el sistema como un motor de definiciones configurable por organización, sin depender del equipo técnico.",
        "Ya con el flujo construido, tuvimos que ajustarlo de nuevo por income y family size: WIOA excluye a familias cuyo ingreso familiar supera cierto umbral, así que verificar el ingreso de una sola persona no alcanzaba para determinar elegibilidad real. Rediseñé la carga de documentos para que, cuando el candidato tiene familia, deba subir un documento de ingresos por cada integrante del hogar — permitiendo calcular el ingreso familiar real en vez de aproximarlo con un solo documento.",
        "Del lado del Super Admin, la vista muestra a cada candidato con su estado real: sin iniciar elegibilidad, en proceso, need review, not eligible o eligible. El case manager revisa cada prueba por categoría con la información de compliance extraída por IA directamente de los documentos — edad, residencia, ingreso familiar consolidado, historial escolar — dándole datos reales para generar matches más precisos con los programas disponibles.",
        "El único trabajo manual que queda en el proceso de elegibilidad es identificar a los candidatos que están teniendo problemas para completar su documentación — por ejemplo, alguien que subió un documento vencido — y el case manager puede contactarlo directamente desde la plataforma para ayudarlo a resolverlo. Para todos los candidatos que ya cuentan con documentación completa y conforme a las reglas de su organización, el sistema determina elegibilidad automáticamente, sin revisión manual. Esto liberó al case manager de la revisión documento por documento para enfocarse en lo que realmente aporta valor: encontrar oportunidades que se ajusten a las necesidades del candidato y del programa.",
      ],
      en: {
        label: "AI document scanning",
        title: "Configurable eligibility rules engine with AI document scanning",
        body: [
          "WIOA (Workforce Innovation and Opportunity Act) requires verifying eligibility across more than 30 distinct categories — identity, age, residency, income, SNAP, veteran status, disability, among others — each with its own list of DOL-acceptable documents. Before this redesign, all of this was validated manually out of an office, by phone, or through chat: a slow process with no tracking view at all — there was no way to see what status each candidate was in, and many people simply never finished applying.",
          "The flow's first version assumed a fixed document list per category would work for every organization. UX research showed it didn't: each client organization accepted different valid documents per category and applied its own rules, like validity windows (for example, only documents from the last 30 or 60 days) — so I redesigned the system as a definitions engine configurable per organization, without depending on the engineering team.",
          "Once the flow was already built, we had to adjust it again for income and family size: WIOA excludes families whose household income is above a certain threshold, so verifying a single person's income wasn't enough to determine real eligibility. I redesigned the document upload so that, when a candidate has family, they need to upload an income document for each household member — making it possible to calculate real household income instead of approximating it from a single document.",
          "On the Super Admin side, the view shows each candidate with their real status: eligibility not started, in process, needs review, not eligible, or eligible. The case manager reviews each category's proof with the compliance information the AI extracted directly from the documents — age, residency, consolidated household income, school record — giving them real data to generate more precise matches with available programs.",
          "The only manual work left in the eligibility process is identifying candidates who are struggling to complete their documentation, for example someone who uploaded an expired document, and the case manager can reach out to them directly through the platform to help them resolve it. For every candidate who already has complete documentation that meets their organization's rules, the system determines eligibility automatically, with no manual review. This freed the case manager from document-by-document review to focus on what actually adds value: finding opportunities that fit the candidate's and the program's needs.",
        ],
      },
    },
    {
      id: "pathways-learning-management",
      label: "Learning Management · Pathways",
      title: "Pathways: seguimiento de aprendizaje ligado a horas, tareas y competencias por programa estatal",
      gallery: [
        {
          media: img("buildwithin-design-system", "feature-pathways-members.png"),
          caption:
            "Members: estado real de cada participante (On Track, Behind, Canceled) con avance desglosado en OJT, RTI, Task y Comp.",
          captionEn: "Members: each participant's real status (On Track, Behind, Canceled) with progress broken down into OJT, RTI, Task, and Comp.",
        },
        {
          media: img("buildwithin-design-system", "feature-pathways-performance.png"),
          caption:
            "Performance: vista agregada del pathway — miembros activos, completados, retirados, y distribución de progreso por rango de fechas.",
          captionEn: "Performance: aggregate view of the pathway — active, completed, and withdrawn members, and progress distribution by date range.",
        },
      ],
      body: [
        "Un Pathway es el programa de aprendizaje que una organización arma para sus participantes — por ejemplo, un pathway de Product Designer dentro del área de Customer Service. No es un plan de estudios interno cualquiera: cada pathway tiene que responder a un programa estatal que exige cumplir ciertos objetivos (horas, módulos, competencias específicas), así que diseñé el módulo para que cada organización configure su propio pathway según esos requisitos, en vez de forzar una plantilla única.",
        "Diseñé la vista de detalle de cada pathway con siete secciones: Overview, para ver de un vistazo cómo va el pathway en general; Performance, con el desempeño agregado; Modules, donde se crean y organizan los módulos de aprendizaje; Competencies, donde cada competencia queda ligada a tareas específicas del módulo — no son casilleros abstractos, se conectan directamente con lo que el participante tiene que hacer; Members, con el estado real de cada persona inscrita; Tasks; y Documents, con la documentación asociada al pathway.",
        "La vista de Members fue la más compleja: cada organización necesita ver de un vistazo cuántos participantes están activos, completados, cancelados o en lista de espera, y dentro de cada tarjeta, el estado real de avance. En vez de mostrar un solo porcentaje de progreso, diseñé cuatro barras separadas — OJT (On-the-Job Training), RTI (Related Technical Instruction), Task y Comp (Competencias) — porque los programas estatales piden evidencia distinta en cada dimensión, y un admin necesita saber en cuál específicamente se está atrasando un participante, no solo que está atrasado.",
        "El status de cada miembro (On Track, Behind, Canceled) se calcula automáticamente comparando el avance real contra la configuración del pathway — horas requeridas, plazos, y las cuatro dimensiones mencionadas — sin que el case manager tenga que evaluarlo manualmente caso por caso. Esto reutiliza el mismo principio de configuración antes que desarrollo que usé en el motor de elegibilidad WIOA: cada organización define las reglas de su pathway, y el sistema hace el seguimiento automáticamente contra esas reglas.",
      ],
      en: {
        label: "Learning Management · Pathways",
        title: "Pathways: learning tracking tied to hours, tasks, and competencies per state program",
        body: [
          "A Pathway is the learning program an organization builds for its participants — for example, a Product Designer pathway under the Customer Service area. It isn't just an internal curriculum: every pathway has to answer to a state program with specific objectives to meet (hours, modules, specific competencies), so I designed the module so each organization configures its own pathway around those requirements instead of forcing a single template.",
          "I designed each pathway's detail view with seven sections: Overview, for an at-a-glance read on how the pathway is doing overall; Performance, with aggregate results; Modules, where learning modules are created and organized; Competencies, where each competency is tied to specific tasks within a module, not an abstract checkbox but something directly connected to what the participant has to do; Members, with each enrolled person's real status; Tasks; and Documents, with the documentation tied to the pathway.",
          "The Members view was the most complex: each organization needs to see at a glance how many participants are active, completed, canceled, or waitlisted, and within each card, their real progress. Instead of showing a single progress percentage, I designed four separate bars — OJT (On-the-Job Training), RTI (Related Technical Instruction), Task, and Comp (Competencies) — because state programs require distinct evidence across each dimension, and an admin needs to know exactly where a participant is falling behind, not just that they are.",
          "Each member's status (On Track, Behind, Canceled) is calculated automatically by comparing real progress against the pathway's configuration, required hours, deadlines, and the four dimensions above, without the case manager having to evaluate it manually case by case. This reuses the same configuration-over-development principle I used in the WIOA eligibility engine: each organization defines its pathway's rules, and the system tracks progress against them automatically.",
        ],
      },
    },
    {
      id: "candidate-360",
      label: "Candidate 360°",
      title: "Candidate 360°: toda la información del candidato en una sola vista, con matching explicable",
      body: [
        "Antes de este rediseño, la información de un candidato vivía repartida en pantallas sueltas — documentos por un lado, aplicaciones por otro, notas en otro sistema. Diseñé Candidate 360° como el registro único de cada candidato: Overview (con sus documentos de elegibilidad), Notes, Activity, los datos de contacto y un resumen en formato tarjeta, Explore Matching, Applications, Pathways y Documents, todo dentro del mismo perfil, sin saltar entre pantallas.",
        "El reto real de diseño estuvo en Explore Matching: encontrar programas y oportunidades que calzaran a la vez con la elegibilidad del candidato, su edad, su ciudad y sus preferencias — cuatro criterios que se cruzan de forma distinta para cada persona. En vez de mostrarle al case manager toda la lista de programas y dejar que descubriera cuáles eran inviables, diseñé filtros rápidos como 'No eligibility required', para separar de inmediato los programas a los que el candidato puede postular ya mismo de los que primero requieren completar su documentación WIOA.",
        "En Applications, diseñé el seguimiento de cada postulación por estado (Pending Review, Selected) a través de Programs, Workforce y Apprenticeship, con un panel de detalle que muestra los requisitos reales del programa — elegibilidad, residencia, verificación de edad, plazos de postulación y de inicio — cada uno validado contra los datos del candidato, para que el admin apruebe con la información completa a la vista, no a ciegas.",
        "También diseñé 'Why this match?': en vez de simplemente sugerir un programa, el sistema explica la lógica detrás — por qué ese candidato calza con esos criterios de elegibilidad, edad, ubicación y preferencias. Fue una decisión deliberada: en un contexto tan regulado como Workforce, un match que no se puede explicar no genera confianza, ni en el case manager ni en el candidato.",
      ],
      en: {
        label: "Candidate 360°",
        title: "Candidate 360°: everything about a candidate in one view, with explainable matching",
        body: [
          "Before this redesign, a candidate's information lived scattered across separate screens: documents in one place, applications in another, notes somewhere else. I designed Candidate 360° as the single record for each candidate: Overview (with their eligibility documents), Notes, Activity, contact details and a card-style summary, Explore Matching, Applications, Pathways, and Documents, all within the same profile, with no jumping between screens.",
          "The real design challenge was Explore Matching: finding programs and opportunities that fit a candidate's eligibility, age, city, and preferences at the same time, four criteria that intersect differently for every person. Instead of showing the case manager the full list of programs and letting them figure out which ones weren't viable, I designed quick filters like 'No eligibility required,' to immediately separate programs the candidate can apply to right now from ones that first require completing their WIOA documentation.",
          "In Applications, I designed status tracking for every application (Pending Review, Selected) across Programs, Workforce, and Apprenticeship, with a detail panel showing the program's real requirements, eligibility, residency, age verification, application and start deadlines, each validated against the candidate's actual data, so the admin approves with full information in view, not blindly.",
          "I also designed 'Why this match?': instead of just suggesting a program, the system explains the logic behind it, why that candidate fits those eligibility, age, location, and preference criteria. It was a deliberate decision: in a space as regulated as Workforce, a match that can't be explained doesn't build trust, not for the case manager and not for the candidate.",
        ],
      },
    },
  ],
  en: {
    tag: "product design · enterprise saas · ai-powered ops",
    subtitle: "Enterprise platform for running Workforce programs with AI",
    result:
      "Configurable Enterprise ecosystem that evolved a single-profile platform into six distinct user roles, with an AI-automated WIOA eligibility engine",
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
