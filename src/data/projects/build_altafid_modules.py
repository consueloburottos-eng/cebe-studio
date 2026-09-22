import re, sys, io

PROJECTS_PATH = "../projects.ts"
ALTAFID_PATH = "altafid.ts"

with open(ALTAFID_PATH, "r", encoding="utf-8") as f:
    altafid_src = f.read()

start_marker = "  features: [\n"
end_marker = "  ],\n  gallery: [\n"

si = altafid_src.index(start_marker)
ei = altafid_src.index(end_marker, si)
new_altafid_src = altafid_src[:si] + altafid_src[ei + len("  ],\n"):]

with open(ALTAFID_PATH, "w", encoding="utf-8") as f:
    f.write(new_altafid_src)

print("altafid.ts features[] removed. New length:", len(new_altafid_src))

def block(slug, title, tag, subtitle, result, services, skills, cover_file,
          brief, strategy, headline,
          subtitle_en, result_en, services_en, skills_en,
          brief_en, strategy_en, headline_en, metrics=None, metrics_note=None, metrics_note_en=None):
    skills_ts = ",\n      ".join(f'"{s}"' for s in skills)
    skills_en_ts = ",\n        ".join(f'"{s}"' for s in skills_en)
    strategy_ts = ",\n      ".join(f'"{s}"' for s in strategy)
    strategy_en_ts = ",\n        ".join(f'"{s}"' for s in strategy_en)
    metrics_block = ""
    if metrics:
        lines = ",\n      ".join(f'{{ value: "{v}", label: "{l}" }}' for v, l in metrics)
        metrics_block = f'    metrics: [\n      {lines},\n    ],\n    metricsNote:\n      "{metrics_note}",\n    metricsNoteEn:\n      "{metrics_note_en}",\n'
    return f'''  {{
    slug: "{slug}",
    title: "{title}",
    category: "Product Design",
    tag: "{tag}",
    subtitle: "{subtitle}",
    client: "Altafid",
    role: "UX/UI Design Lead",
    year: "—",
    result: "{result}",
    services: "{services}",
    skills: [
      {skills_ts},
    ],
    cover: "{title[0].upper() + title[1:]}",
    coverMedia: img("altafid", "{cover_file}"),
{metrics_block}    brief:
      "{brief}",
    strategy: [
      {strategy_ts},
    ],
    headline: "{headline}",
    gallery: [],
    en: {{
      tag: "{tag}",
      subtitle: "{subtitle_en}",
      result: "{result_en}",
      services: "{services_en}",
      skills: [
        {skills_en_ts},
      ],
      brief:
        "{brief_en}",
      strategy: [
        {strategy_en_ts},
      ],
      headline: "{headline_en}",
    }},
  }}'''

modules = []

modules.append(block(
    slug="altafid-custom-portals",
    title="altafid — custom portals",
    tag="product · fintech · client portals",
    subtitle="De una plantilla genérica compartida a un portal de cliente propio por entidad",
    result="Client Portal personalizable por marca y entidad, con desempeño de portafolio, historial y mensajería segura",
    services="UX Research · UI · Design Systems",
    skills=["Figma", "UX Research", "Design Systems", "Theming / White-labeling", "Component Libraries", "Diseño responsive"],
    cover_file="08.jpg",
    brief="Cada entidad que usa Altafid necesitaba ofrecer una experiencia de cara al cliente que se sintiera propia, no una plantilla genérica compartida entre distintos bancos o firmas. El Client Portal (validado a través de las personas de cliente final documentadas en investigación, como Michael Sterling y Emily Thompson) muestra desempeño de portafolio, historial de cuenta, documentos y mensajería segura con el asesor, adaptado a la marca de cada entidad.",
    strategy=["Diseñamos los componentes pensando en distintas configuraciones de marca desde el inicio, una de las decisiones estratégicas centrales del proyecto: colores, logotipo y tono podían variar por entidad sin romper la consistencia funcional ni obligar a reconstruir el portal desde cero para cada cliente nuevo."],
    headline="de una plantilla genérica a un portal por marca",
    subtitle_en="From a generic shared template to a client portal owned by each entity",
    result_en="Client Portal customizable by brand and entity, with portfolio performance, history, and secure messaging",
    services_en="UX Research · UI · Design Systems",
    skills_en=["Figma", "User Research", "Design Systems", "Theming / White-labeling", "Component Libraries", "Responsive Design"],
    brief_en="Every entity using Altafid needed a client-facing experience that felt like their own, not a generic template shared across different banks or firms. The Client Portal (validated through the end-client personas documented in research, like Michael Sterling and Emily Thompson) shows portfolio performance, account history, documents, and secure messaging with the advisor, adapted to each entity's brand.",
    strategy_en=["We designed components with different brand configurations in mind from the start, one of the project's core strategic decisions: colors, logo, and tone could vary by entity without breaking functional consistency or forcing a rebuild of the portal from scratch for every new client."],
    headline_en="from a generic template to a portal per brand",
))

modules.append(block(
    slug="altafid-relationship-management",
    title="altafid — relationship management",
    tag="product · fintech · crm",
    subtitle="De herramientas sueltas por rol a una sola fuente de verdad sobre cada cliente",
    result="CRM conectado con perfil de cliente, tareas, calendario y evaluación de riesgo en una sola fuente de verdad",
    services="UX Research · UI · Design Systems",
    skills=["Figma", "UX Research", "Design Systems", "Data Visualization", "Workflow Automation", "Diseño responsive"],
    cover_file="07.jpg",
    brief="Relationship Management centraliza en una sola vista todo lo que un asesor necesita sobre un cliente: perfil, cuentas asociadas, información de compliance y datos financieros, junto con el seguimiento de la relación en el tiempo. La investigación con doce personas (desde asesores y portfolio managers hasta compliance, IT y los dos perfiles de cliente final) mostró que cada rol necesitaba consultar información distinta del mismo cliente, así que se diseñó como fuente de verdad compartida entre módulos, en vez de una herramienta aislada.",
    strategy=[
        "El módulo administra tanto clientes individuales como entidades legales y grupos de inversión corporativos, con una vista de cliente organizada por household: filtros avanzados por nombre, estado o tipo de cliente, campos personalizables para capturar información específica (financiera, de cumplimiento, o detalles como el estilo de revisión de portafolio preferido), y un perfil que reúne datos personales, financieros, evaluación de riesgo, documentos y actividad en un solo panel, en vez de obligar al asesor a saltar entre pantallas para reconstruir el contexto completo de un cliente.",
        "Los procesos financieros casi nunca se resuelven en una sola pantalla: una propuesta requiere revisión, una operación necesita aprobación, un caso de compliance queda pendiente de seguimiento. Por eso el módulo integra automatización de tareas y flujos de trabajo, un registro completo de actividades para trazabilidad de auditoría, y un calendario integrado con herramientas externas como Google Calendar y Outlook, todo vinculado al cliente o household correspondiente en vez de vivir como herramientas sueltas.",
        "El módulo también ofrece tableros en tiempo real con métricas de AUM, evaluaciones de riesgo y rendimiento de portafolios, dándole al asesor una vista de negocio consolidada sin salir del CRM. Contactos, tareas, calendario y evaluación de riesgo funcionan como un solo sistema conectado en lugar de herramientas separadas — exactamente el objetivo detrás de tratar Altafid como un ecosistema de journeys y no como una colección de módulos independientes.",
    ],
    headline="de herramientas sueltas a una sola fuente de verdad",
    subtitle_en="From scattered, role-specific tools to a single source of truth on every client",
    result_en="A connected CRM with client profile, tasks, calendar, and risk assessment as one source of truth",
    services_en="UX Research · UI · Design Systems",
    skills_en=["Figma", "User Research", "Design Systems", "Data Visualization", "Workflow Automation", "Responsive Design"],
    brief_en="Relationship Management centralizes everything an advisor needs about a client in a single view: profile, associated accounts, compliance information, and financial data, along with relationship tracking over time. Research across twelve personas (from advisors and portfolio managers to compliance, IT, and both end-client profiles) showed each role needed to consult different information about the same client, so it was designed as a shared source of truth across modules, instead of an isolated tool.",
    strategy_en=[
        "The module manages both individual clients and legal entities or corporate investment groups, with a client view organized by household: advanced filters by name, status, or client type, customizable fields to capture specific information (financial, compliance-related, or details like preferred portfolio review style), and a profile that brings together personal data, financials, risk assessment, documents, and activity in a single panel, instead of forcing the advisor to jump between screens to piece together a client's full context.",
        "Financial processes are rarely resolved in a single screen: a proposal needs review, an order needs approval, a compliance case is left pending follow-up. That's why the module integrates task and workflow automation, a full activity log for audit traceability, and a calendar integrated with external tools like Google Calendar and Outlook, all linked to the right client or household instead of living as separate, disconnected tools.",
        "The module also offers real-time dashboards with AUM metrics, risk assessments, and portfolio performance, giving the advisor a consolidated business view without leaving the CRM. Contacts, tasks, calendar, and risk assessment work as one connected system instead of separate tools — exactly the goal behind treating Altafid as an ecosystem of journeys rather than a collection of independent modules.",
    ],
    headline_en="from scattered tools to one source of truth",
    metrics=[("75%", "mejora en eficiencia operativa"), ("28%", "más interacción con clientes"), ("40%", "menos tiempo administrativo")],
    metrics_note="Cifras de marketing publicadas por Altafid para este módulo (CRM y gestión de tareas), no métricas medidas personalmente por Consuelo.",
    metrics_note_en="Marketing figures published by Altafid for this module (CRM and task management), not metrics personally measured by Consuelo.",
))

modules.append(block(
    slug="altafid-onboarding",
    title="altafid — onboarding",
    tag="product · fintech · onboarding",
    subtitle="De formularios en papel a una cuenta operativa en minutos",
    result="Onboarding digital con firma electrónica y validación en el momento, conectado al perfil de cliente",
    services="UX Research · UI · Design Systems",
    skills=["Figma", "UX Research", "Design Systems", "Formularios y validación", "Firma electrónica", "Diseño responsive"],
    cover_file="03.jpg",
    brief="El onboarding fue uno de los primeros flujos que diseñamos, porque su estructura influía directamente en cuentas, portafolios, documentos y operaciones más adelante. El proceso cubre captura de información del cliente, creación de perfiles, recopilación de datos financieros, configuración de cuentas, revisión de documentación y validación final, reemplazando un proceso que antes dependiía de formularios en papel o intercambios de correo.",
    strategy=["El objetivo no era solo digitalizar el formulario, sino reducir el tiempo entre el primer contacto y una cuenta operativa: firma electrónica en lugar de documentos físicos, validaciones en el momento en vez de errores descubiertos días después, y datos que alimentan directamente el perfil de cliente en Relationship Management en lugar de quedar aislados en un formulario de intake."],
    headline="de papel y correo a una cuenta operativa en minutos",
    subtitle_en="From paper forms to an operating account in minutes",
    result_en="Digital onboarding with electronic signature and in-the-moment validation, connected to the client profile",
    services_en="UX Research · UI · Design Systems",
    skills_en=["Figma", "User Research", "Design Systems", "Forms & Validation", "Electronic Signature", "Responsive Design"],
    brief_en="Onboarding was one of the first flows we designed, since its structure directly shaped accounts, portfolios, documents, and operations downstream. The process covers capturing client information, creating profiles, collecting financial data, setting up accounts, reviewing documentation, and final validation, replacing a process that used to depend on paper forms or email exchanges.",
    strategy_en=["The goal wasn't just to digitize the form, but to shrink the time between first contact and an operating account: electronic signature instead of physical documents, in-the-moment validation instead of errors discovered days later, and data that feeds directly into the client profile in Relationship Management instead of staying isolated in an intake form."],
    headline_en="from paper and email to an operating account in minutes",
))

modules.append(block(
    slug="altafid-portfolio-design",
    title="altafid — portfolio design",
    tag="product · fintech · portfolio management",
    subtitle="De estructuras de inversión dispersas a una vista de 360° con marketplace y aprobación",
    result="Vista de 360° de la estructura de inversión con Model Builder, versionado y marketplace de fondos",
    services="UX Research · UI · Diseño de flujos complejos",
    skills=["Figma", "UX Research", "Design Systems", "Data Visualization", "Approval Workflows", "Diseño responsive"],
    cover_file="04.jpg",
    brief="Portfolio Design da una vista de 360° de toda la estructura de inversión, desde el household hasta la cuenta y el portafolio individual: balances, holdings, transacciones y exposición al riesgo en tiempo real. Portfolio managers y traders reconstruían estrategias similares una y otra vez sin una forma centralizada de reutilizarlas, así que diseñamos un Model Builder para construir modelos de inversión personalizados con ponderaciones estratégicas y análisis de riesgo a nivel de componente.",
    strategy=["El flujo de aprobación fue una decisión deliberada: antes no existía un punto de control claro entre diseñar una estrategia y aplicarla a las cuentas de un cliente. El versionado permite comparar modelos y entender qué cambió entre revisiones, y el módulo se conecta con un marketplace de fondos mutuos, UMAs y modelos de terceros, dándole al asesor más opciones sin salir de la plataforma."],
    headline="de estructuras dispersas a una vista de 360°",
    subtitle_en="From scattered investment structures to a 360° view with marketplace and approval",
    result_en="A 360° view of the investment structure with Model Builder, versioning, and a fund marketplace",
    services_en="UX Research · UI · Complex flow design",
    skills_en=["Figma", "User Research", "Design Systems", "Data Visualization", "Approval Workflows", "Responsive Design"],
    brief_en="Portfolio Design gives a 360° view of the entire investment structure, from household down to individual account and portfolio: balances, holdings, transactions, and risk exposure in real time. Portfolio managers and traders were rebuilding similar strategies over and over with no centralized way to reuse them, so we designed a Model Builder for creating custom investment models with strategic weightings and component-level risk analysis.",
    strategy_en=["The approval flow was a deliberate decision: there was no clear checkpoint between designing a strategy and applying it to a client's accounts. Versioning lets teams compare models and see what changed between revisions, and the module connects to a marketplace of mutual funds, UMAs, and third-party models, giving advisors more options without leaving the platform."],
    headline_en="from scattered structures to a 360° view",
))

modules.append(block(
    slug="altafid-regulatory-compliance",
    title="altafid — regulatory compliance",
    tag="product · fintech · compliance",
    subtitle="De compliance reactivo a monitoreo continuo entre jurisdicciones",
    result="Monitoreo continuo de cumplimiento entre Estados Unidos y Chile, con reporting conectado a otros módulos",
    services="UX Research · UI · Compliance Design",
    skills=["Figma", "UX Research", "Design Systems", "Compliance & Regulatory Design", "Data Visualization", "Diseño responsive"],
    cover_file="05.jpg",
    brief="El compliance no podía diseñarse como una pantalla más: los arquetipos de entidad documentados en research (Valora Capital, WealthSphere) operaban entre Estados Unidos y Chile, con requisitos regulatorios distintos y cambiantes en cada mercado. El módulo de Regulatory Compliance centraliza la revisión de operaciones marcadas, auditorías y documentación, con roles dedicados (Compliance Lead, Compliance Officer Chile) que necesitaban ver el estado de cumplimiento de cada cliente sin perseguir información entre otros módulos.",
    strategy=['Una de las citas de research lo resumía bien: \"El cumplimiento puede ser una pesadilla. Necesitamos un sistema que automatice este proceso\" (RIA). Diseñamos el módulo para que el monitoreo fuera continuo en vez de reactivo, con reporting que se genera a partir de la misma información que ya vive en Relationship Management y Portfolio Design, en lugar de pedirle al equipo de compliance que la reconstruya por separado.'],
    headline="de compliance reactivo a monitoreo continuo",
    subtitle_en="From reactive compliance to continuous monitoring across jurisdictions",
    result_en="Continuous compliance monitoring across the US and Chile, with reporting connected to other modules",
    services_en="UX Research · UI · Compliance Design",
    skills_en=["Figma", "User Research", "Design Systems", "Compliance & Regulatory Design", "Data Visualization", "Responsive Design"],
    brief_en="Compliance couldn't be designed as just another screen: the entity archetypes documented in research (Valora Capital, WealthSphere) operated across the US and Chile, with different, changing regulatory requirements in each market. The Regulatory Compliance module centralizes review of flagged transactions, audits, and documentation, with dedicated roles (Compliance Lead, Compliance Officer Chile) who needed to see each client's compliance status without chasing information across other modules.",
    strategy_en=['One research quote summed it up well: \"Compliance can be a nightmare. We need a system that automates this process\" (RIA). We designed the module so monitoring was continuous rather than reactive, with reporting generated from the same information that already lives in Relationship Management and Portfolio Design, instead of asking the compliance team to reconstruct it separately.'],
    headline_en="from reactive compliance to continuous monitoring",
))

modules.append(block(
    slug="altafid-analytics",
    title="altafid — analytics",
    tag="product · fintech · analytics",
    subtitle="De exportar datos a mano a dashboards en tiempo real por rol",
    result="Dashboards en tiempo real y reportes personalizables por rol, sobre la misma base de datos compartida",
    services="UX Research · UI · Data Visualization",
    skills=["Figma", "UX Research", "Design Systems", "Data Visualization", "Dashboards", "Diseño responsive"],
    cover_file="06.jpg",
    brief='Distintos roles necesitaban ver el negocio en distintos niveles: un asesor quería entender el desempeño de su cartera de clientes, un compliance lead necesitaba visibilidad sobre auditorías pendientes, y liderazgo necesitaba una vista consolidada del negocio. \"Advanced Analytics and Reporting\" apareció explícitamente como una de las funcionalidades SaaS más valoradas en la investigación con arquetipos de entidad, junto con reporting en tiempo real para tomar decisiones de inversión.',
    strategy=["El módulo de Analytics ofrece dashboards en tiempo real y reportes personalizables en lugar de exportar datos manualmente desde cada módulo por separado, apoyándose en la misma base de datos compartida que usan Relationship Management, Portfolio Design y Operations."],
    headline="de exportar datos a mano a dashboards en tiempo real",
    subtitle_en="From manual data exports to real-time dashboards by role",
    result_en="Real-time dashboards and customizable reports by role, drawing on the same shared database",
    services_en="UX Research · UI · Data Visualization",
    skills_en=["Figma", "User Research", "Design Systems", "Data Visualization", "Dashboards", "Responsive Design"],
    brief_en='Different roles needed to see the business at different levels: an advisor wanted to understand their client portfolio\'s performance, a compliance lead needed visibility into pending audits, and leadership needed a consolidated view of the business. \"Advanced Analytics and Reporting\" came up explicitly as one of the most valued SaaS features in research with entity archetypes, alongside real-time reporting for investment decisions.',
    strategy_en=["The Analytics module offers real-time dashboards and customizable reports instead of manually exporting data from each module separately, drawing on the same shared data that Relationship Management, Portfolio Design, and Operations already use."],
    headline_en="from manual exports to real-time dashboards",
))

modules.append(block(
    slug="altafid-document-management",
    title="altafid — document management",
    tag="product · fintech · document management",
    subtitle="De carpetas sueltas por rol a documentos conectados al cliente",
    result="Almacenamiento centralizado y control de versiones, conectado al cliente, cuenta u operación correspondiente",
    services="UX Research · UI · Design Systems",
    skills=["Figma", "UX Research", "Design Systems", "Control de versiones", "Compliance & Regulatory Design", "Diseño responsive"],
    cover_file="02.jpg",
    brief="Document Management aparece en las doce personas documentadas en research, desde el asesor que sube documentos del cliente hasta el compliance lead que necesita que todo esté archivado y accesible para auditorías. Esa repetición fue la señal de que no podía ser un módulo aislado: cada rol sube, organiza o consulta documentos por una razón distinta (reportes de desempeño, formularios fiscales, confirmaciones de operaciones, documentación de compliance), y todos necesitaban encontrarlos en el mismo lugar.",
    strategy=["El módulo centraliza almacenamiento y control de versiones, conectado directamente al cliente, la cuenta o la operación a la que pertenece cada documento, en lugar de vivir como una carpeta genérica separada del resto de la plataforma."],
    headline="de carpetas sueltas a documentos conectados al cliente",
    subtitle_en="From loose, role-specific folders to documents connected to the client",
    result_en="Centralized storage and version control, connected to the relevant client, account, or transaction",
    services_en="UX Research · UI · Design Systems",
    skills_en=["Figma", "User Research", "Design Systems", "Version Control", "Compliance & Regulatory Design", "Responsive Design"],
    brief_en="Document Management shows up across all twelve personas documented in research, from the advisor uploading client documents to the compliance lead who needs everything archived and accessible for audits. That repetition was the signal that it couldn't be an isolated module: every role uploads, organizes, or looks up documents for a different reason (performance reports, tax forms, trade confirmations, compliance documentation), and all of them needed to find them in the same place.",
    strategy_en=["The module centralizes storage and version control, connected directly to the client, account, or transaction each document belongs to, instead of living as a generic folder separate from the rest of the platform."],
    headline_en="from loose folders to documents connected to the client",
))

modules.append(block(
    slug="altafid-business-alerts",
    title="altafid — business alerts",
    tag="product · fintech · alerts",
    subtitle="De señales dispersas entre módulos a un sistema con niveles de severidad",
    result="Sistema de alertas con niveles de severidad, alimentado por eventos de otros módulos",
    services="UX Research · UI · Design Systems",
    skills=["Figma", "UX Research", "Design Systems", "Diseño de notificaciones", "Data Visualization", "Diseño responsive"],
    cover_file="03.jpg",
    brief="A lo largo del journey del asesor, uno de los pain points recurrentes era la falta de claridad sobre estados y próximos pasos: operaciones marcadas por compliance, portafolios que se desviaban de su estrategia objetivo, tareas vencidas. Business Alerts convierte esas señales dispersas en un sistema con niveles de severidad, para que el usuario sepa qué requiere atención inmediata y qué puede esperar.",
    strategy=["El módulo se alimenta de eventos que ya ocurren en otros módulos (una operación marcada en Regulatory Compliance, un portafolio fuera de rango en Portfolio Design, una tarea vencida en Relationship Management), en lugar de ser un sistema de notificaciones separado que el usuario tiene que revisar por su cuenta."],
    headline="de señales dispersas a un sistema de severidad",
    subtitle_en="From scattered signals across modules to a system with severity levels",
    result_en="An alerts system with severity levels, fed by events from other modules",
    services_en="UX Research · UI · Design Systems",
    skills_en=["Figma", "User Research", "Design Systems", "Notification Design", "Data Visualization", "Responsive Design"],
    brief_en="Throughout the advisor's journey, one of the recurring pain points was a lack of clarity around status and next steps: transactions flagged by compliance, portfolios drifting from their target strategy, overdue tasks. Business Alerts turns those scattered signals into a system with severity levels, so the user knows what needs immediate attention and what can wait.",
    strategy_en=["The module draws on events that already happen in other modules (a transaction flagged in Regulatory Compliance, a portfolio out of range in Portfolio Design, an overdue task in Relationship Management), instead of being a separate notification system the user has to check on their own."],
    headline_en="from scattered signals to a severity system",
))

modules.append(block(
    slug="altafid-trading",
    title="altafid — trading",
    tag="product · fintech · trading",
    subtitle="De la propuesta a la operación conciliada, en un mismo flujo",
    result="Propuestas de negociación, rebalanceo automatizado y blotter de ejecución, con conciliación en tiempo real",
    services="UX Research · UI · Diseño de flujos complejos",
    skills=["Figma", "UX Research", "Design Systems", "Data Visualization", "Diseño de flujos complejos", "Diseño responsive"],
    cover_file="04.jpg",
    brief="El módulo de Trading reúne propuestas de negociación, reequilibrio automatizado de carteras y un blotter de ejecución de órdenes, con seguimiento en tiempo real del estado de cada operación, además de los procesos de conciliación que confirman que cada operación ejecutada coincide con lo registrado en la cuenta del cliente. Es el punto donde termina el journey del asesor: después de construir una estrategia en Portfolio Design, la operación necesita ejecutarse, revisarse y, en muchos casos, aprobarse antes de completarse.",
    strategy=["Diseñamos este módulo pensando en dos perfiles distintos que lo usan de forma diferente: portfolio managers que ejecutan y rebalancean según el perfil de riesgo del cliente, y traders que gestionan operaciones para múltiples portafolios a la vez según condiciones de mercado. El sistema conserva el contexto que viene de Portfolio Design, evitando que el usuario tenga que reintroducir información ya definida en la propuesta."],
    headline="de la propuesta a la operación conciliada",
    subtitle_en="From proposal to reconciled trade, in one flow",
    result_en="Trade proposals, automated rebalancing, and an execution blotter, with real-time reconciliation",
    services_en="UX Research · UI · Complex flow design",
    skills_en=["Figma", "User Research", "Design Systems", "Data Visualization", "Complex Flow Design", "Responsive Design"],
    brief_en="The Trading module brings together trade proposals, automated portfolio rebalancing, and an order execution blotter, with real-time tracking of each operation's status, plus the reconciliation processes that confirm every executed trade matches what's recorded in the client's account. It's where the advisor's journey converges: after building a strategy in Portfolio Design, the trade needs to be executed, reviewed, and in many cases approved before it's complete.",
    strategy_en=["We designed this module for two different profiles that use it differently: portfolio managers who execute and rebalance according to a client's risk profile, and traders who manage operations across multiple portfolios at once based on market conditions. The system preserves the context coming from Portfolio Design, so users don't have to re-enter information already defined in the proposal."],
    headline_en="from proposal to reconciled trade",
))

modules.append(block(
    slug="altafid-operations",
    title="altafid — operations",
    tag="product · fintech · billing & operations",
    subtitle="De conciliación manual a facturación conectada al cliente",
    result="Centro de facturación y custodia con tarifas flexibles por entidad y conciliación automática",
    services="UX Research · UI · Design Systems",
    skills=["Figma", "UX Research", "Design Systems", "Formularios y validación", "Data Visualization", "Diseño responsive"],
    cover_file="06.jpg",
    brief="El módulo de Operations es el centro de facturación y custodia: control operativo de tarifas, facturación, agrupación de cuentas y pagos, con procesos de conciliación que antes dependían de trabajo manual y generaban errores. Cada entidad podía tener estructuras de tarifas distintas, así que el módulo se diseñó para ser flexible, no para asumir un único modelo de cobro.",
    strategy=["Al integrarse con Relationship Management y Portfolio Design, la facturación refleja automáticamente qué cuentas y portafolios corresponden a cada cliente o household, reduciendo el trabajo manual en procesos administrativos y mejorando la trazabilidad para auditoría."],
    headline="de conciliación manual a facturación conectada",
    subtitle_en="From manual reconciliation to billing connected to the client",
    result_en="A billing and custody center with flexible per-entity fees and automatic reconciliation",
    services_en="UX Research · UI · Design Systems",
    skills_en=["Figma", "User Research", "Design Systems", "Forms & Validation", "Data Visualization", "Responsive Design"],
    brief_en="The Operations module is the billing and custody center: operational control over fees, invoicing, account grouping, and payments, with reconciliation processes that used to depend on manual work and produced errors. Each entity could have different fee structures, so the module was designed to be flexible rather than assume a single billing model.",
    strategy_en=["Integrated with Relationship Management and Portfolio Design, billing automatically reflects which accounts and portfolios belong to each client or household, reducing manual work in administrative processes and improving traceability for audits."],
    headline_en="from manual reconciliation to connected billing",
))

new_blocks_ts = ",\n".join(modules) + ",\n"

with open(PROJECTS_PATH, "r", encoding="utf-8") as f:
    projects_src = f.read()

anchor = '  {\n    slug: "altafid-design-system",'
idx = projects_src.index(anchor)
new_projects_src = projects_src[:idx] + new_blocks_ts + projects_src[idx:]

with open(PROJECTS_PATH, "w", encoding="utf-8") as f:
    f.write(new_projects_src)

print("projects.ts updated. New length:", len(new_projects_src))
print("Inserted", len(modules), "new project blocks.")
