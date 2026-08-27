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
      id: "custom-portals",
      label: "Custom Portals",
      title: "Portales de cliente y partner personalizables por marca y entidad",
      body: [
        "Cada entidad que usa Altafid necesitaba ofrecer una experiencia de cara al cliente que se sintiera propia, no una plantilla genérica compartida entre distintos bancos o firmas. El Client Portal (validado a través de las personas de cliente final documentadas en investigación, como Michael Sterling y Emily Thompson) muestra desempeño de portafolio, historial de cuenta, documentos y mensajería segura con el asesor, adaptado a la marca de cada entidad.",
        "Diseñamos los componentes pensando en distintas configuraciones de marca desde el inicio, una de las decisiones estratégicas centrales del proyecto: colores, logotipo y tono podían variar por entidad sin romper la consistencia funcional ni obligar a reconstruir el portal desde cero para cada cliente nuevo.",
      ],
      en: {
        label: "Custom Portals",
        title: "Client and partner portals tailored by brand and entity",
        body: [
          "Every entity using Altafid needed a client-facing experience that felt like their own, not a generic template shared across different banks or firms. The Client Portal (validated through the end-client personas documented in research, like Michael Sterling and Emily Thompson) shows portfolio performance, account history, documents, and secure messaging with the advisor, adapted to each entity's brand.",
          "We designed components with different brand configurations in mind from the start, one of the project's core strategic decisions: colors, logo, and tone could vary by entity without breaking functional consistency or forcing a rebuild of the portal from scratch for every new client.",
        ],
      },
    },
    {
      id: "relationship-management",
      label: "Relationship Management",
      title: "Contactos, entidades legales, tareas y calendario en un mismo CRM conectado",
      body: [
        "Relationship Management centraliza en una sola vista todo lo que un asesor necesita sobre un cliente: perfil, cuentas asociadas, información de compliance y datos financieros, junto con el seguimiento de la relación en el tiempo. La investigación con doce personas (desde asesores y portfolio managers hasta compliance, IT y los dos perfiles de cliente final) mostró que cada rol necesitaba consultar información distinta del mismo cliente, así que se diseñó como fuente de verdad compartida entre módulos, en vez de una herramienta aislada.",
        "El módulo administra tanto clientes individuales como entidades legales y grupos de inversión corporativos, con una vista de cliente organizada por household: filtros avanzados por nombre, estado o tipo de cliente, campos personalizables para capturar información específica (financiera, de cumplimiento, o detalles como el estilo de revisión de portafolio preferido), y un perfil que reúne datos personales, financieros, evaluación de riesgo, documentos y actividad en un solo panel, en vez de obligar al asesor a saltar entre pantallas para reconstruir el contexto completo de un cliente.",
        "Los procesos financieros casi nunca se resuelven en una sola pantalla: una propuesta requiere revisión, una operación necesita aprobación, un caso de compliance queda pendiente de seguimiento. Por eso el módulo integra automatización de tareas y flujos de trabajo, un registro completo de actividades para trazabilidad de auditoría, y un calendario integrado con herramientas externas como Google Calendar y Outlook, todo vinculado al cliente o household correspondiente en vez de vivir como herramientas sueltas.",
        "El módulo también ofrece tableros en tiempo real con métricas de AUM, evaluaciones de riesgo y rendimiento de portafolios, dándole al asesor una vista de negocio consolidada sin salir del CRM. Contactos, tareas, calendario y evaluación de riesgo funcionan como un solo sistema conectado en lugar de herramientas separadas — exactamente el objetivo detrás de tratar Altafid como un ecosistema de journeys y no como una colección de módulos independientes.",
      ],
      en: {
        label: "Relationship Management",
        title: "Contacts, legal entities, tasks, and calendar in one connected CRM",
        body: [
          "Relationship Management centralizes everything an advisor needs about a client in a single view: profile, associated accounts, compliance information, and financial data, along with relationship tracking over time. Research across twelve personas (from advisors and portfolio managers to compliance, IT, and both end-client profiles) showed each role needed to consult different information about the same client, so it was designed as a shared source of truth across modules, instead of an isolated tool.",
          "The module manages both individual clients and legal entities or corporate investment groups, with a client view organized by household: advanced filters by name, status, or client type, customizable fields to capture specific information (financial, compliance-related, or details like preferred portfolio review style), and a profile that brings together personal data, financials, risk assessment, documents, and activity in a single panel, instead of forcing the advisor to jump between screens to piece together a client's full context.",
          "Financial processes are rarely resolved in a single screen: a proposal needs review, an order needs approval, a compliance case is left pending follow-up. That's why the module integrates task and workflow automation, a full activity log for audit traceability, and a calendar integrated with external tools like Google Calendar and Outlook, all linked to the right client or household instead of living as separate, disconnected tools.",
          "The module also offers real-time dashboards with AUM metrics, risk assessments, and portfolio performance, giving the advisor a consolidated business view without leaving the CRM. Contacts, tasks, calendar, and risk assessment work as one connected system instead of separate tools — exactly the goal behind treating Altafid as an ecosystem of journeys rather than a collection of independent modules.",
        ],
      },
    },
    {
      id: "onboarding",
      label: "Onboarding",
      title: "Formularios digitales y firma electrónica para incorporar clientes",
      body: [
        "El onboarding fue uno de los primeros flujos que diseñamos, porque su estructura influía directamente en cuentas, portafolios, documentos y operaciones más adelante. El proceso cubre captura de información del cliente, creación de perfiles, recopilación de datos financieros, configuración de cuentas, revisión de documentación y validación final, reemplazando un proceso que antes dependía de formularios en papel o intercambios de correo.",
        "El objetivo no era solo digitalizar el formulario, sino reducir el tiempo entre el primer contacto y una cuenta operativa: firma electrónica en lugar de documentos físicos, validaciones en el momento en vez de errores descubiertos días después, y datos que alimentan directamente el perfil de cliente en Relationship Management en lugar de quedar aislados en un formulario de intake.",
      ],
      en: {
        label: "Onboarding",
        title: "Digital forms and electronic signatures to bring clients on board",
        body: [
          "Onboarding was one of the first flows we designed, since its structure directly shaped accounts, portfolios, documents, and operations downstream. The process covers capturing client information, creating profiles, collecting financial data, setting up accounts, reviewing documentation, and final validation, replacing a process that used to depend on paper forms or email exchanges.",
          "The goal wasn't just to digitize the form, but to shrink the time between first contact and an operating account: electronic signature instead of physical documents, in-the-moment validation instead of errors discovered days later, and data that feeds directly into the client profile in Relationship Management instead of staying isolated in an intake form.",
        ],
      },
    },
    {
      id: "risk-assessment",
      label: "Risk Assessment",
      title: "Cuestionarios de riesgo personalizables con seguimiento de cumplimiento",
      body: [
        "Dentro de Portfolio Design, los asesores necesitan alinear el riesgo y los objetivos financieros de cada cliente antes de tomar decisiones de portafolio. El sistema de cuestionarios de riesgo es totalmente personalizable: los asesores definen sus propias preguntas y ajustan la ponderación de cada respuesta según las necesidades del negocio, mientras la plataforma clasifica automáticamente a cada cliente en un perfil de riesgo específico. La implementación es flexible, con plantillas predefinidas o cuestionarios construidos desde cero, evaluando tanto la tolerancia al riesgo del cliente como su capacidad de riesgo en función de sus objetivos.",
        "La evaluación no termina en el resultado: cada perfil de riesgo necesita mantenerse preciso y actualizado bajo supervisión regulatoria. La plataforma muestra con claridad el estado de cada evaluación (pendiente, completada, vencida) y almacena automáticamente cada cuestionario respondido en formato PDF, listo para auditorías y fácil de recuperar cuando compliance lo requiere.",
        "Del lado del cliente, la evaluación se completa como una experiencia digital fluida: formularios compatibles con cualquier dispositivo, acceso seguro desde el portal del cliente con actualizaciones en tiempo real, y un puntaje de riesgo generado al instante que el asesor puede usar de inmediato para ajustar la estrategia de inversión.",
      ],
      en: {
        label: "Risk Assessment",
        title: "Customizable risk questionnaires with compliance tracking",
        body: [
          "Within Portfolio Design, advisors need to align each client's risk and financial goals before making portfolio decisions. The risk questionnaire system is fully customizable: advisors define their own questions and adjust the weighting of each answer to fit business needs, while the platform automatically classifies each client into a specific risk profile. Implementation is flexible, with predefined templates or questionnaires built from scratch, assessing both the client's risk tolerance and their risk capacity based on their goals.",
          "The assessment doesn't end at the result: every risk profile needs to stay accurate and current under regulatory oversight. The platform clearly shows the status of each assessment (pending, completed, expired) and automatically stores every completed questionnaire as a PDF, ready for audits and easy to retrieve whenever compliance needs it.",
          "On the client side, the assessment happens as a smooth digital experience: forms that work on any device, secure access from the client portal with real-time updates, and an instantly generated risk score the advisor can act on right away to adjust the investment strategy.",
        ],
      },
      gallery: [
        {
          media: img("altafid", "feature-risk-assessment-01.png"),
          caption: "Perfil de riesgo del cliente: puntaje de tolerancia y capacidad, y su ubicación en la curva de distribución de activos según ese perfil.",
          captionEn: "Client risk profile: tolerance and capacity score, plotted against the asset-allocation curve for that profile.",
        },
        {
          media: img("altafid", "feature-risk-assessment-02.png"),
          caption: "Constructor de cuestionarios: agregar y reordenar preguntas, definir tipos de respuesta y organizar la lógica por sección (tolerancia, capacidad).",
          captionEn: "Questionnaire builder: add and reorder questions, define answer types, and organize logic by section (tolerance, capacity).",
        },
        {
          media: img("altafid", "feature-risk-assessment-03.png"),
          caption: "Notificación automática al cliente cuando el asesor solicita actualizar su evaluación de riesgo, con enlace directo y vencimiento a los 10 días.",
          captionEn: "Automatic client notification when the advisor requests an updated risk assessment, with a direct link that expires after 10 days.",
        },
        {
          media: img("altafid", "feature-risk-assessment-04.png"),
          caption: "La misma experiencia del cuestionario en escritorio y mobile, para que el cliente pueda completarlo desde cualquier dispositivo.",
          captionEn: "The same questionnaire experience on desktop and mobile, so the client can complete it from any device.",
        },
      ],
    },
    {
      id: "portfolio-design",
      label: "Portfolio Design",
      title: "Modelos de inversión, fondos mutuos y UMAs, con marketplace y aprobación",
      body: [
        "Portfolio Design da una vista de 360° de toda la estructura de inversión, desde el household hasta la cuenta y el portafolio individual: balances, holdings, transacciones y exposición al riesgo en tiempo real. Portfolio managers y traders reconstruían estrategias similares una y otra vez sin una forma centralizada de reutilizarlas, así que diseñamos un Model Builder para construir modelos de inversión personalizados con ponderaciones estratégicas y análisis de riesgo a nivel de componente.",
        "El flujo de aprobación fue una decisión deliberada: antes no existía un punto de control claro entre diseñar una estrategia y aplicarla a las cuentas de un cliente. El versionado permite comparar modelos y entender qué cambió entre revisiones, y el módulo se conecta con un marketplace de fondos mutuos, UMAs y modelos de terceros, dándole al asesor más opciones sin salir de la plataforma.",
      ],
      en: {
        label: "Portfolio Design",
        title: "Investment models, mutual funds, and UMAs, with marketplace and approval",
        body: [
          "Portfolio Design gives a 360° view of the entire investment structure, from household down to individual account and portfolio: balances, holdings, transactions, and risk exposure in real time. Portfolio managers and traders were rebuilding similar strategies over and over with no centralized way to reuse them, so we designed a Model Builder for creating custom investment models with strategic weightings and component-level risk analysis.",
          "The approval flow was a deliberate decision: there was no clear checkpoint between designing a strategy and applying it to a client's accounts. Versioning lets teams compare models and see what changed between revisions, and the module connects to a marketplace of mutual funds, UMAs, and third-party models, giving advisors more options without leaving the platform.",
        ],
      },
    },
    {
      id: "regulatory-compliance",
      label: "Regulatory Compliance",
      title: "Monitoreo y reporting de cumplimiento entre jurisdicciones",
      body: [
        "El compliance no podía diseñarse como una pantalla más: los arquetipos de entidad documentados en research (Valora Capital, WealthSphere) operaban entre Estados Unidos y Chile, con requisitos regulatorios distintos y cambiantes en cada mercado. El módulo de Regulatory Compliance centraliza la revisión de operaciones marcadas, auditorías y documentación, con roles dedicados (Compliance Lead, Compliance Officer Chile) que necesitaban ver el estado de cumplimiento de cada cliente sin perseguir información entre otros módulos.",
        "Una de las citas de research lo resumía bien: \"El cumplimiento puede ser una pesadilla. Necesitamos un sistema que automatice este proceso\" (RIA). Diseñamos el módulo para que el monitoreo fuera continuo en vez de reactivo, con reporting que se genera a partir de la misma información que ya vive en Relationship Management y Portfolio Design, en lugar de pedirle al equipo de compliance que la reconstruya por separado.",
      ],
      en: {
        label: "Regulatory Compliance",
        title: "Monitoring and reporting across jurisdictions",
        body: [
          "Compliance couldn't be designed as just another screen: the entity archetypes documented in research (Valora Capital, WealthSphere) operated across the US and Chile, with different, changing regulatory requirements in each market. The Regulatory Compliance module centralizes review of flagged transactions, audits, and documentation, with dedicated roles (Compliance Lead, Compliance Officer Chile) who needed to see each client's compliance status without chasing information across other modules.",
          "One research quote summed it up well: \"Compliance can be a nightmare. We need a system that automates this process\" (RIA). We designed the module so monitoring was continuous rather than reactive, with reporting generated from the same information that already lives in Relationship Management and Portfolio Design, instead of asking the compliance team to reconstruct it separately.",
        ],
      },
    },
    {
      id: "analytics",
      label: "Analytics",
      title: "Reportes y dashboards personalizados sobre el negocio y los clientes",
      body: [
        "Distintos roles necesitaban ver el negocio en distintos niveles: un asesor quería entender el desempeño de su cartera de clientes, un compliance lead necesitaba visibilidad sobre auditorías pendientes, y liderazgo necesitaba una vista consolidada del negocio. \"Advanced Analytics and Reporting\" apareció explícitamente como una de las funcionalidades SaaS más valoradas en la investigación con arquetipos de entidad, junto con reporting en tiempo real para tomar decisiones de inversión.",
        "El módulo de Analytics ofrece dashboards en tiempo real y reportes personalizables en lugar de exportar datos manualmente desde cada módulo por separado, apoyándose en la misma base de datos compartida que usan Relationship Management, Portfolio Design y Operations.",
      ],
      en: {
        label: "Analytics",
        title: "Custom reports and dashboards on the business and its clients",
        body: [
          "Different roles needed to see the business at different levels: an advisor wanted to understand their client portfolio's performance, a compliance lead needed visibility into pending audits, and leadership needed a consolidated view of the business. \"Advanced Analytics and Reporting\" came up explicitly as one of the most valued SaaS features in research with entity archetypes, alongside real-time reporting for investment decisions.",
          "The Analytics module offers real-time dashboards and customizable reports instead of manually exporting data from each module separately, drawing on the same shared data that Relationship Management, Portfolio Design, and Operations already use.",
        ],
      },
    },
    {
      id: "document-management",
      label: "Document Management",
      title: "Almacenamiento y control de versiones para documentos de cliente y compliance",
      body: [
        "Document Management aparece en las doce personas documentadas en research, desde el asesor que sube documentos del cliente hasta el compliance lead que necesita que todo esté archivado y accesible para auditorías. Esa repetición fue la señal de que no podía ser un módulo aislado: cada rol sube, organiza o consulta documentos por una razón distinta (reportes de desempeño, formularios fiscales, confirmaciones de operaciones, documentación de compliance), y todos necesitaban encontrarlos en el mismo lugar.",
        "El módulo centraliza almacenamiento y control de versiones, conectado directamente al cliente, la cuenta o la operación a la que pertenece cada documento, en lugar de vivir como una carpeta genérica separada del resto de la plataforma.",
      ],
      en: {
        label: "Document Management",
        title: "Storage and version control for client and compliance documents",
        body: [
          "Document Management shows up across all twelve personas documented in research, from the advisor uploading client documents to the compliance lead who needs everything archived and accessible for audits. That repetition was the signal that it couldn't be an isolated module: every role uploads, organizes, or looks up documents for a different reason (performance reports, tax forms, trade confirmations, compliance documentation), and all of them needed to find them in the same place.",
          "The module centralizes storage and version control, connected directly to the client, account, or transaction each document belongs to, instead of living as a generic folder separate from the rest of the platform.",
        ],
      },
    },
    {
      id: "business-alerts",
      label: "Business Alerts",
      title: "Alertas de desviaciones, eventos y niveles de severidad",
      body: [
        "A lo largo del journey del asesor, uno de los pain points recurrentes era la falta de claridad sobre estados y próximos pasos: operaciones marcadas por compliance, portafolios que se desviaban de su estrategia objetivo, tareas vencidas. Business Alerts convierte esas señales dispersas en un sistema con niveles de severidad, para que el usuario sepa qué requiere atención inmediata y qué puede esperar.",
        "El módulo se alimenta de eventos que ya ocurren en otros módulos (una operación marcada en Regulatory Compliance, un portafolio fuera de rango en Portfolio Design, una tarea vencida en Relationship Management), en lugar de ser un sistema de notificaciones separado que el usuario tiene que revisar por su cuenta.",
      ],
      en: {
        label: "Business Alerts",
        title: "Alerts for deviations, events, and severity levels",
        body: [
          "Throughout the advisor's journey, one of the recurring pain points was a lack of clarity around status and next steps: transactions flagged by compliance, portfolios drifting from their target strategy, overdue tasks. Business Alerts turns those scattered signals into a system with severity levels, so the user knows what needs immediate attention and what can wait.",
          "The module draws on events that already happen in other modules (a transaction flagged in Regulatory Compliance, a portfolio out of range in Portfolio Design, an overdue task in Relationship Management), instead of being a separate notification system the user has to check on their own.",
        ],
      },
    },
    {
      id: "trading",
      label: "Trading",
      title: "Negociación, reequilibrio automatizado y conciliación de operaciones en tiempo real",
      body: [
        "El módulo de Trading reúne propuestas de negociación, reequilibrio automatizado de carteras y un blotter de ejecución de órdenes, con seguimiento en tiempo real del estado de cada operación, además de los procesos de conciliación que confirman que cada operación ejecutada coincide con lo registrado en la cuenta del cliente. Es el punto donde termina el journey del asesor: después de construir una estrategia en Portfolio Design, la operación necesita ejecutarse, revisarse y, en muchos casos, aprobarse antes de completarse.",
        "Diseñamos este módulo pensando en dos perfiles distintos que lo usan de forma diferente: portfolio managers que ejecutan y rebalancean según el perfil de riesgo del cliente, y traders que gestionan operaciones para múltiples portafolios a la vez según condiciones de mercado. El sistema conserva el contexto que viene de Portfolio Design, evitando que el usuario tenga que reintroducir información ya definida en la propuesta.",
      ],
      en: {
        label: "Trading",
        title: "Trade negotiation, automated rebalancing, and real-time reconciliation",
        body: [
          "The Trading module brings together trade proposals, automated portfolio rebalancing, and an order execution blotter, with real-time tracking of each operation's status, plus the reconciliation processes that confirm every executed trade matches what's recorded in the client's account. It's where the advisor's journey converges: after building a strategy in Portfolio Design, the trade needs to be executed, reviewed, and in many cases approved before it's complete.",
          "We designed this module for two different profiles that use it differently: portfolio managers who execute and rebalance according to a client's risk profile, and traders who manage operations across multiple portfolios at once based on market conditions. The system preserves the context coming from Portfolio Design, so users don't have to re-enter information already defined in the proposal.",
        ],
      },
    },
    {
      id: "operations",
      label: "Operations",
      title: "Tarifas flexibles, facturación, agrupación y pagos",
      body: [
        "El módulo de Operations es el centro de facturación y custodia: control operativo de tarifas, facturación, agrupación de cuentas y pagos, con procesos de conciliación que antes dependían de trabajo manual y generaban errores. Cada entidad podía tener estructuras de tarifas distintas, así que el módulo se diseñó para ser flexible, no para asumir un único modelo de cobro.",
        "Al integrarse con Relationship Management y Portfolio Design, la facturación refleja automáticamente qué cuentas y portafolios corresponden a cada cliente o household, reduciendo el trabajo manual en procesos administrativos y mejorando la trazabilidad para auditoría.",
      ],
      en: {
        label: "Operations",
        title: "Flexible fees, invoicing, grouping, and payments",
        body: [
          "The Operations module is the billing and custody center: operational control over fees, invoicing, account grouping, and payments, with reconciliation processes that used to depend on manual work and produced errors. Each entity could have different fee structures, so the module was designed to be flexible rather than assume a single billing model.",
          "Integrated with Relationship Management and Portfolio Design, billing automatically reflects which accounts and portfolios belong to each client or household, reducing manual work in administrative processes and improving traceability for audits.",
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
