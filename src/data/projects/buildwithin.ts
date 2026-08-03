import { Project, img, introGallery } from "./helpers";

export const buildwithinCandidatePortal: Project = {
  slug: "buildwithin",
  title: "buildwithin — candidate portal",
  category: "Product Design",
  tag: "product design · enterprise saas · candidate experience · ia",
  subtitle: "Portal de candidatos de una plataforma Workforce impulsada por IA",
  client: "BuildWithin",
  role: "Lead Product Designer",
  year: "2025",
  result:
    "Portal de candidatos con validación documental y elegibilidad automatizadas por IA, integrado al ecosistema Workforce de BuildWithin",
  services: "Product Design · UX Research · Design System · Prototipado y testing (Maze)",
  skills: [
    "Figma",
    "Maze",
    "Design Systems",
    "Guided UX",
    "AI-powered workflows",
    "UX Research",
    "Prototipado",
    "Stakeholder Management",
  ],
  cover: "BuildWithin — Portal de Candidatos",
  coverMedia: img("buildwithin", "cover.png"),
  brief:
    "BuildWithin — Portal de Candidatos es el rediseño completo de la experiencia candidato dentro de la transformación de BuildWithin hacia una plataforma Workforce impulsada por IA. La plataforma original había sido pensada para otro mercado; la evolucionamos para que candidatos, Talent Managers, Case Managers, Administradores y Super Administradores pudieran operar sobre un mismo ecosistema, cada uno con necesidades completamente distintas. El proceso más crítico era la validación de elegibilidad: tradicionalmente manual, obligaba a los candidatos a subir múltiples documentos mientras los administradores revisaban uno por uno categoría, vigencia, firmas, coincidencia con el perfil y calidad de imagen — muchas veces repitiendo la revisión de un mismo documento válido para varias categorías. Como Lead Product Designer lideré el diseño de punta a punta: definí la experiencia del candidato, diseñé los flujos principales y validé continuamente las soluciones junto con Product, el cliente y la CEO de BuildWithin, con el objetivo de automatizar la validación documental, reducir tiempos de revisión, evitar duplicados y mejorar la experiencia del candidato sin perder capacidad de escalar la plataforma a distintas organizaciones Workforce.",
  strategy: [
    "Definimos un principio rector desde el inicio: reducir la complejidad para el candidato mientras automatizábamos el trabajo operativo de los administradores. Cada decisión de diseño buscó disminuir el esfuerzo cognitivo del usuario apoyándose en cuatro pilares — automatización mediante IA, flujos guiados paso a paso, eliminación de tareas repetitivas e información contextual en el momento adecuado — para que el sistema interpretara las reglas complejas en lugar de exigirle eso al candidato.",
    "El proceso de diseño combinó investigación continua con iteración rápida: trabajamos a diario con la CEO de BuildWithin para validar la visión de producto, revisamos prioridades semanalmente con Product y, ante cada flujo nuevo, construimos prototipos interactivos en Figma que probamos con usuarios reales en Maze antes de pasar a desarrollo. Ese ciclo — investigación, arquitectura de información, user flows, wireframes, prototipos de alta fidelidad, testing, feedback del cliente e iteración — se repitió durante los 6 meses del proyecto, apoyado en el Design System que construí como base común para toda la plataforma.",
    "El mayor aporte fue rediseñar la elegibilidad documental apoyándonos en IA: el sistema identifica automáticamente el tipo de documento, lo clasifica, reutiliza un mismo archivo para cubrir varios requisitos sin pedir duplicados, valida fechas de vencimiento y firmas, detecta documentos borrosos o de baja calidad, verifica que la información coincida con el perfil del candidato y determina la elegibilidad antes de avanzar — deteniendo el flujo temprano cuando un candidato no cumplía los criterios del programa, en vez de dejarlo llegar sin necesidad hasta revisión administrativa. Un proceso que antes exigía revisión presencial documento por documento pasó a ser una experiencia digital rápida, precisa y escalable, y los equipos internos redujeron significativamente el tiempo invertido en revisar documentación manualmente.",
  ],
  headline: "elegibilidad, sin fricción",
  gallery: introGallery("buildwithin", "BuildWithin — Portal de Candidatos", 1, 13),
  features: [
    {
      id: "ai-eligibility",
      label: "IA en elegibilidad",
      title: "Elegibilidad documental con IA (WIOA)",
      body: [
        "Antes de este rediseño, la validación de elegibilidad era un proceso manual apoyado en conversaciones 1 a 1 entre el candidato y el case manager: se pedían documentos WIOA según reglas que cada organización socia definía por su cuenta, con límites y requisitos distintos entre sí, y el candidato dependía del chat o de una reunión presencial para saber qué le faltaba.",
        "Rediseñé el flujo como una experiencia electrónica y autoguiada: el candidato recibe una lista específica de qué documentos subir según su situación, evitando cargas innecesarias, y la IA clasifica cada documento, reutiliza un mismo archivo cuando cubre varios requisitos, valida vencimientos y firmas, y avisa de inmediato si un documento no va a ser aceptado — en vez de dejarlo avanzar hasta una revisión administrativa que nunca iba a aprobarse.",
        "Del lado del case manager, el sistema filtra la información que no es verdadera o no coincide con el perfil del candidato antes de que llegue a revisión, muestra el estado de cada participante y qué documento le falta, y aplica flags de vencimiento y reglas de documentos configurables por organización — todo dentro del marco legal de WIOA. El resultado: procesamiento más rápido que el proceso manual y una reducción real del tiempo operativo dedicado a revisar perfiles que no eran elegibles.",
      ],
      en: {
        label: "AI eligibility",
        title: "AI-driven document eligibility (WIOA)",
        body: [
          "Before this redesign, eligibility validation was a manual process built on one-on-one conversations between the candidate and the case manager: WIOA documents were requested according to rules each partner organization set on its own, with different limits and requirements from one another, and the candidate depended on chat or an in-person meeting to find out what was still missing.",
          "I redesigned the flow as a self-guided electronic experience: the candidate gets a specific checklist of what to upload based on their situation, avoiding unnecessary uploads, and the AI classifies each document, reuses a single file when it covers multiple requirements, validates expiration dates and signatures, and flags immediately if a document won't be accepted — instead of letting it move forward to an administrative review that was never going to be approved.",
          "On the case manager's side, the system filters out information that isn't accurate or doesn't match the candidate's profile before it reaches review, shows each participant's status and what document is still missing, and applies expiration flags and document rules configurable per organization — all within the WIOA legal framework. The result: faster processing than the manual process and a real reduction in operational time spent reviewing profiles that were never going to be eligible.",
        ],
      },
    },
  ],
  en: {
    tag: "product design · enterprise saas · candidate experience · ai",
    subtitle: "Candidate portal for an AI-powered Workforce platform",
    result:
      "Candidate portal with AI-automated document validation and eligibility, integrated into BuildWithin's Workforce ecosystem",
    services: "Product Design · UX Research · Design System · Prototyping & testing (Maze)",
    skills: ["Figma", "Maze", "Design Systems", "Guided UX", "AI-powered workflows", "UX Research", "Prototyping", "Stakeholder Management"],
    brief:
      "BuildWithin — Candidate Portal is the full redesign of the candidate experience inside BuildWithin's transformation into an AI-powered Workforce platform. The original platform had been built for a different market; we evolved it so candidates, Talent Managers, Case Managers, Administrators, and Super Admins could all operate within the same ecosystem, each with completely different needs. The most critical process was eligibility validation: traditionally manual, it required candidates to upload multiple documents while administrators reviewed each one for category, expiration, signatures, profile match, and image quality — often re-reviewing the same document valid across several categories. As Lead Product Designer I led the design end to end: defined the candidate experience, designed the core flows, and continuously validated decisions alongside Product, the client, and BuildWithin's CEO, aiming to automate document validation, cut review time, avoid duplicates, and improve the candidate experience without losing the platform's ability to scale across different Workforce organizations.",
    strategy: [
      "We set a guiding principle from day one: reduce complexity for the candidate while automating the administrators' operational work. Every design decision aimed to lower the user's cognitive load, resting on four pillars — AI-driven automation, step-by-step guided flows, elimination of repetitive tasks, and contextual information at the right moment — so the system interpreted complex rules instead of asking the candidate to.",
      "The design process combined continuous research with fast iteration: we worked daily with BuildWithin's CEO to validate the product vision, reviewed priorities weekly with Product, and for every new flow built interactive Figma prototypes that we tested with real users in Maze before moving to development. That cycle — research, information architecture, user flows, wireframes, high-fidelity prototypes, testing, client feedback, and iteration — repeated across the project's 6 months, backed by the Design System I built as the shared foundation for the whole platform.",
      "The biggest contribution was redesigning document eligibility with AI: the system automatically identifies the document type, classifies it, reuses a single file to cover multiple requirements instead of asking for duplicates, validates expiration dates and signatures, flags blurry or low-quality documents, checks that the information matches the candidate's profile, and determines eligibility before letting the process move forward — stopping the flow early when a candidate didn't meet a program's criteria instead of letting it reach administrative review unnecessarily. A process that used to require in-person, document-by-document review became a fast, accurate, and scalable digital experience, and internal teams significantly cut the time spent reviewing documentation manually.",
    ],
    headline: "eligibility, without friction",
  },
};
