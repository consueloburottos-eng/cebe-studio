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
    "Altafid nació como una plataforma centrada en la relación directa entre asesores financieros y sus clientes. La evolución del negocio abrió una oportunidad más ambiciosa: convertir la tecnología en una solución B2B para bancos, firmas RIA, family offices, broker-dealers y asesores independientes, lo que exigía transformar el producto en un ecosistema completo capaz de conectar gestión de clientes, portafolios, operaciones y trading dentro de una misma experiencia. La plataforma original no había sido pensada para esa complejidad: los flujos respondían a relaciones individuales entre asesor y cliente, la arquitectura no contemplaba múltiples tipos de usuario, y cada módulo nuevo corría el riesgo de generar inconsistencias. Como UX/UI Design Lead, lideré esta transformación combinando trabajo hands-on con liderazgo de equipo: definí la experiencia de producto, diseñé interfaces y journeys complejos, construí el Design System desde cero, y mantuve una visión transversal para que las decisiones de distintos diseñadores construyeran una experiencia coherente entre Relationship Management, Portfolio Management, Operations y Trading.",
  strategy: [
    "La investigación combinó sesiones continuas con el cliente, benchmark de plataformas de wealth management y CRM, y once personas documentadas cubriendo asesoría, trading, compliance, tecnología, research y los dos perfiles de cliente final, además de arquetipos de entidad como RIAs, family offices y broker-dealers. Las propias entidades lo describían con claridad: \"La falta de integración crea silos de datos e ineficiencias. Necesitamos una plataforma integral que lo reúna todo\" (Broker-Dealer), o \"El cumplimiento puede ser una pesadilla. Necesitamos un sistema que automatice este proceso\" (RIA). El hallazgo clave fue que los usuarios no pensaban en módulos separados sino en objetivos como incorporar un cliente, construir un portafolio o ejecutar una operación, y que la personalización era una necesidad estructural: cada tipo de entidad requería configuraciones de permisos y procesos distintas, así que la plataforma debía ser consistente sin volverse rígida.",
    "La decisión estratégica central fue no tratar Altafid como una suma de herramientas independientes, sino como un ecosistema de journeys conectados entre cuatro áreas: Relationship Management, Portfolio Management, Operations y Trading. Diseñamos los procesos fundamentales primero, porque definían patrones reutilizables: resolver bien la estructura del perfil de cliente, por ejemplo, influía en onboarding, cuentas, portafolios, documentos y operaciones. Usamos Design Thinking, Lean UX, Jobs To Be Done y diseño modular para estructurar la experiencia alrededor de lo que el asesor intentaba lograr, no alrededor de funciones aisladas del sistema.",
    "Lideré la creación del Design System desde cero (colores, tipografía, tablas, formularios, estados, navegación), no solo como librería visual sino como herramienta de decisión que ayudaba a diseñadores y desarrolladores a resolver casos nuevos sin partir de cero, especialmente crítico en Portfolio Management, Operations y Trading, donde se repetían estructuras de datos y acciones. Cada flujo se validó con el cliente mediante prototipos y sesiones de testeo, revisando no solo si la experiencia era comprensible sino si representaba correctamente la operativa financiera real, lo que llevó a simplificar formularios, reorganizar información y mejorar la continuidad entre módulos.",
  ],
  headline: "un ecosistema de journeys conectados",
  features: [
    {
      id: "risk-assessment",
      label: "Evaluación de riesgo",
      title: "Cuestionarios de riesgo personalizables con seguimiento de cumplimiento",
      body: [
        "Dentro de Portfolio Management, los asesores necesitan alinear el riesgo y los objetivos financieros de cada cliente antes de tomar decisiones de portafolio. El sistema de cuestionarios de riesgo es totalmente personalizable: los asesores definen sus propias preguntas y ajustan la ponderación de cada respuesta según las necesidades del negocio, mientras la plataforma clasifica automáticamente a cada cliente en un perfil de riesgo específico. La implementación es flexible, con plantillas predefinidas o cuestionarios construidos desde cero, evaluando tanto la tolerancia al riesgo del cliente como su capacidad de riesgo en función de sus objetivos.",
        "La evaluación no termina en el resultado: cada perfil de riesgo necesita mantenerse preciso y actualizado bajo supervisión regulatoria. La plataforma muestra con claridad el estado de cada evaluación (pendiente, completada, vencida) y almacena automáticamente cada cuestionario respondido en formato PDF, listo para auditorías y fácil de recuperar cuando compliance lo requiere.",
        "Del lado del cliente, la evaluación se completa como una experiencia digital fluida: formularios compatibles con cualquier dispositivo, acceso seguro desde el portal del cliente con actualizaciones en tiempo real, y un puntaje de riesgo generado al instante que el asesor puede usar de inmediato para ajustar la estrategia de inversión.",
      ],
      en: {
        label: "Risk assessment",
        title: "Customizable risk questionnaires with compliance tracking",
        body: [
          "Within Portfolio Management, advisors need to align each client's risk and financial goals before making portfolio decisions. The risk questionnaire system is fully customizable: advisors define their own questions and adjust the weighting of each answer to fit business needs, while the platform automatically classifies each client into a specific risk profile. Implementation is flexible, with predefined templates or questionnaires built from scratch, assessing both the client's risk tolerance and their risk capacity based on their goals.",
          "The assessment doesn't end at the result: every risk profile needs to stay accurate and current under regulatory oversight. The platform clearly shows the status of each assessment (pending, completed, expired) and automatically stores every completed questionnaire as a PDF, ready for audits and easy to retrieve whenever compliance needs it.",
          "On the client side, the assessment happens as a smooth digital experience: forms that work on any device, secure access from the client portal with real-time updates, and an instantly generated risk score the advisor can act on right away to adjust the investment strategy.",
        ],
      },
    },
    {
      id: "crm",
      label: "Gestión de Clientes (CRM)",
      title: "CRM centralizado para relación y compliance del cliente",
      body: [
        "El módulo de Gestión de Clientes centraliza en una sola vista todo lo que un asesor necesita sobre un cliente: perfil, cuentas asociadas, información de compliance y datos financieros, junto con el seguimiento de la relación en el tiempo. La investigación con doce personas (desde asesores y portfolio managers hasta compliance, IT y los dos perfiles de cliente final) mostró que cada rol necesitaba consultar información distinta del mismo cliente, así que el CRM se diseñó como fuente de verdad compartida entre módulos, no como una herramienta aislada.",
        "Al integrarse con Relationship Management, el CRM conecta directamente con onboarding, tareas y comunicaciones: un asesor puede pasar de revisar el perfil de un cliente a coordinar un seguimiento o preparar una propuesta sin perder contexto ni repetir información ya cargada en otro módulo.",
      ],
      en: {
        label: "Client Management (CRM)",
        title: "Centralized CRM for client relationships and compliance",
        body: [
          "The Client Management module centralizes everything an advisor needs about a client in a single view: profile, associated accounts, compliance information, and financial data, along with relationship tracking over time. Research across twelve personas (from advisors and portfolio managers to compliance, IT, and both end-client profiles) showed each role needed to consult different information about the same client, so the CRM was designed as a shared source of truth across modules, not an isolated tool.",
          "Integrated with Relationship Management, the CRM connects directly to onboarding, tasks, and communications: an advisor can go from reviewing a client's profile to coordinating a follow-up or preparing a proposal without losing context or re-entering information already captured elsewhere.",
        ],
      },
    },
    {
      id: "tasks-productivity",
      label: "Tareas y Productividad",
      title: "Gestión centralizada de tareas para todo el equipo",
      body: [
        "Los procesos financieros casi nunca se resuelven en una sola pantalla: una propuesta requiere revisión, una operación necesita aprobación, un caso de compliance queda pendiente de seguimiento. El módulo de Tareas y Productividad organiza y asigna estas tareas de forma centralizada, con prioridades, colas de trabajo, estado y documentación de cada caso, para que nada dependa de la memoria individual del asesor o del case manager.",
        "Este módulo conecta con prácticamente todas las áreas de la plataforma: cuando un flujo de Relationship Management, Portfolio Management u Operations queda pendiente de una acción, se convierte en una tarea visible, evitando que procesos importantes se pierdan entre distintos módulos y usuarios.",
      ],
      en: {
        label: "Tasks & Productivity",
        title: "Centralized task management across the whole team",
        body: [
          "Financial processes are rarely resolved in a single screen: a proposal needs review, an order needs approval, a compliance case is left pending follow-up. The Tasks and Productivity module organizes and assigns this work centrally, with priorities, work queues, status, and documentation for each case, so nothing depends on an advisor's or case manager's memory.",
          "This module connects to nearly every area of the platform: whenever a Relationship Management, Portfolio Management, or Operations flow is left waiting on an action, it becomes a visible task, preventing important processes from getting lost between modules and users.",
        ],
      },
    },
    {
      id: "calendar-scheduling",
      label: "Calendario y Reuniones",
      title: "Calendario inteligente integrado con las herramientas del asesor",
      body: [
        "El módulo de Calendario y Programación de Reuniones se integra con la disponibilidad real del asesor y con herramientas externas como Google Calendar y Outlook, mostrando una vista detallada de cada reunión y sus participantes. La necesidad surgió directamente del journey del asesor: coordinar reuniones con clientes es parte constante del trabajo diario, y antes vivía desconectado del resto de la información del cliente.",
        "Al integrarse con el CRM y con los perfiles de cliente, cada reunión agendada queda vinculada al contexto correcto, evitando que el asesor tenga que reconstruir manualmente con quién se reúne, sobre qué cuenta o portafolio, y qué seguimiento quedó pendiente de la conversación anterior.",
      ],
      en: {
        label: "Calendar & Scheduling",
        title: "Smart calendar integrated with the advisor's tools",
        body: [
          "The Calendar and Meeting Scheduling module integrates with the advisor's real availability and with external tools like Google Calendar and Outlook, showing a detailed view of each meeting and its participants. The need came directly from the advisor's journey: coordinating client meetings is a constant part of daily work, and it used to live disconnected from the rest of the client's information.",
          "Integrated with the CRM and client profiles, every scheduled meeting stays linked to the right context, so the advisor doesn't have to manually reconstruct who they're meeting with, which account or portfolio it concerns, and what follow-up was left pending from the previous conversation.",
        ],
      },
    },
    {
      id: "model-builder",
      label: "Model Builder",
      title: "Modelos de inversión reutilizables, con control de versiones y aprobación",
      body: [
        "El Model Builder permite crear y gestionar modelos de inversión personalizados: composición de activos, control de versiones y un flujo de aprobación antes de que un modelo pueda usarse en portafolios reales. Nace de un hallazgo recurrente en discovery: portfolio managers y traders reconstruían estrategias similares una y otra vez, sin una forma centralizada de reutilizarlas ni de asegurar que la versión aplicada fuera realmente la aprobada.",
        "El flujo de aprobación es deliberado: antes de este módulo no existía un punto de control claro entre diseñar una estrategia de inversión y aplicarla a las cuentas de un cliente. El versionado permite además comparar modelos y entender qué cambió entre una revisión y la siguiente, algo especialmente relevante en un contexto financiero donde cada decisión debe quedar trazable.",
      ],
      en: {
        label: "Model Builder",
        title: "Reusable investment models with versioning and approval",
        body: [
          "Model Builder lets teams create and manage custom investment models: asset composition, version control, and an approval flow before a model can be used on real portfolios. It came out of a recurring discovery finding: portfolio managers and traders were rebuilding similar strategies over and over, with no centralized way to reuse them or ensure the version actually applied was the approved one.",
          "The approval flow is deliberate: before this module, there was no clear checkpoint between designing an investment strategy and applying it to a client's accounts. Versioning also lets teams compare models and understand what changed between one revision and the next, especially important in a financial context where every decision needs to stay traceable.",
        ],
      },
    },
    {
      id: "trading-rebalancing",
      label: "Trading",
      title: "Negociación, reequilibrio automatizado y seguimiento de órdenes en tiempo real",
      body: [
        "El módulo de Trading reúne propuestas de negociación, reequilibrio automatizado de carteras y un blotter de ejecución de órdenes, con seguimiento en tiempo real del estado de cada operación. Es el punto donde termina el journey del asesor: después de construir una estrategia en Portfolio Management, la operación necesita ejecutarse, revisarse y, en muchos casos, aprobarse antes de completarse.",
        "Diseñamos este módulo pensando en dos perfiles distintos que lo usan de forma diferente: portfolio managers que ejecutan y rebalancean según el perfil de riesgo del cliente, y traders que gestionan operaciones para múltiples portafolios a la vez según condiciones de mercado. El sistema conserva el contexto que viene de Portfolio Management, evitando que el usuario tenga que reintroducir información ya definida en la propuesta.",
      ],
      en: {
        label: "Trading",
        title: "Trade negotiation, automated rebalancing, and real-time order tracking",
        body: [
          "The Trading module brings together trade proposals, automated portfolio rebalancing, and an order execution blotter, with real-time tracking of each operation's status. It's where the advisor's journey converges: after building a strategy in Portfolio Management, the trade needs to be executed, reviewed, and in many cases approved before it's complete.",
          "We designed this module for two different profiles that use it differently: portfolio managers who execute and rebalance according to a client's risk profile, and traders who manage operations across multiple portfolios at once based on market conditions. The system preserves the context coming from Portfolio Management, so users don't have to re-enter information already defined in the proposal.",
        ],
      },
    },
  ],
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
      "Altafid started as a platform centered on the direct relationship between financial advisors and their clients. The business's evolution opened up a more ambitious opportunity: turning the technology into a B2B solution for banks, RIA firms, family offices, broker-dealers, and independent advisors, which required turning the product into a full ecosystem capable of connecting client management, portfolios, operations, and trading within a single experience. The original platform hadn't been built for that complexity: flows were designed around one-to-one advisor-client relationships, the architecture didn't account for multiple user types, and every new module risked introducing inconsistencies. As UX/UI Design Lead, I led this transformation combining hands-on work with team leadership: defined the product experience, designed complex interfaces and journeys, built the Design System from scratch, and kept a cross-cutting vision so decisions made by different designers built a coherent experience across Relationship Management, Portfolio Management, Operations, and Trading.",
    strategy: [
      "Research combined ongoing sessions with the client, benchmarking of wealth-management and CRM platforms, and eleven documented personas covering advisory, trading, compliance, technology, research, and both end-client profiles, plus entity archetypes like RIAs, family offices, and broker-dealers. The entities themselves put it plainly: \"The lack of integration creates data silos and inefficiencies. We need an integrated platform that brings it all together\" (Broker-Dealer), or \"Compliance can be a nightmare. We need a system that automates this process\" (RIA). The key finding was that users didn't think in separate modules but in goals like onboarding a client, building a portfolio, or executing a trade, and that personalization was a structural need: each type of entity required different permission and process configurations, so the platform had to stay consistent without becoming rigid.",
      "The core strategic decision was to treat Altafid not as a sum of independent tools, but as an ecosystem of connected journeys across four areas: Relationship Management, Portfolio Management, Operations, and Trading. We designed the foundational processes first, since they defined reusable patterns: getting the client profile structure right, for example, shaped onboarding, accounts, portfolios, documents, and operations. We used Design Thinking, Lean UX, Jobs To Be Done, and modular design to structure the experience around what the advisor was trying to accomplish, not around isolated system functions.",
      "I led the Design System build from scratch (colors, typography, tables, forms, states, navigation), not just as a visual library but as a decision-making tool that helped designers and developers solve new cases without starting from zero, especially critical in Portfolio Management, Operations, and Trading, where data structures and actions repeated. Every flow was validated with the client through prototypes and testing sessions, checking not just whether the experience was understandable but whether it correctly represented real financial operations, which led to simplifying forms, reorganizing information, and improving continuity between modules.",
    ],
    headline: "an ecosystem of connected journeys",
  },
};
