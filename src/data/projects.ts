export type MediaAsset = {
  type: "image" | "video";
  src: string;
};

export type GalleryItem = {
  label: string;
  media?: MediaAsset;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  tag: string;
  subtitle: string;
  client: string;
  role: string;
  year: string;
  result: string;
  services?: string;
  skills: string[];
  cover: string;
  coverMedia?: MediaAsset;
  brief: string;
  strategy: string[];
  headline: string;
  gallery: GalleryItem[];
  pending?: boolean;
};

function img(slug: string, file: string): MediaAsset {
  return { type: "image", src: `/projects/${slug}/${file}` };
}

function video(slug: string, file: string): MediaAsset {
  return { type: "video", src: `/projects/${slug}/${file}` };
}

function mediaFor(folder: string, file: string): MediaAsset {
  return file.endsWith(".mp4") || file.endsWith(".mov") ? video(folder, file) : img(folder, file);
}

// generates generic-labeled gallery items for intro-<start>..<end> uploads;
// `defaultExt` covers projects uploaded mostly as one format (e.g. mostly
// .mp4), `extOverrides` covers individual slots re-uploaded in a different
// format (e.g. { 4: "png" } when intro-04 exists as .png instead of the rest)
function introGallery(
  folder: string,
  title: string,
  start: number,
  end: number,
  defaultExt: string = "webp",
  extOverrides: Record<number, string> = {}
): GalleryItem[] {
  const items: GalleryItem[] = [];
  for (let n = start; n <= end; n++) {
    const ext = extOverrides[n] ?? defaultExt;
    items.push({
      label: `${title} — imagen ${n}`,
      media: mediaFor(folder, `intro-${String(n).padStart(2, "0")}.${ext}`),
    });
  }
  return items;
}

// A project's public/projects/<folder> name doesn't always match its URL
// slug (e.g. "bodas-de-sangre" ships assets under "violencia-normalizada").
// Derive the real folder from any media the project already has, falling
// back to the slug only for projects with no assets yet.
export function assetFolder(project: Project): string {
  const sample = project.coverMedia?.src ?? project.gallery.find((g) => g.media)?.media?.src;
  const match = sample?.match(/^\/projects\/([^/]+)\//);
  return match ? match[1] : project.slug;
}

export const projects: Project[] = [
  {
    slug: "talent-capital",
    title: "talent capital",
    category: "Product Design",
    tag: "product design · ux & ui",
    subtitle: "Powered by BuildWithin",
    client: "BuildWithin",
    role: "Lead Product Designer",
    year: "2025",
    result: "Ecosistema unificado DC · MD · VA + validación documental automatizada por IA",
    services:
      "Diseño de experiencia agéntica · Diseño de sitio web y plataforma de candidatos · Design System",
    skills: [
      "Figma",
      "Conversational UX",
      "Design Systems",
      "UX Research",
      "Prototipado (Maze)",
      "Diseño responsive",
      "Accesibilidad",
      "Colaboración multi-stakeholder",
    ],
    cover: "Talent Capital — plataforma de candidatos",
    coverMedia: video("talent-capital", "hero.mp4"),
    brief:
      "Talent Capital nació de un mandato de una coalición regional (DC, Maryland, Virginia): empleadores, agencias de gobierno y organizaciones sin fines de lucro necesitaban una sola puerta de entrada al mercado laboral de la región, hoy fragmentado en decenas de bolsas de trabajo y portales inconexos. En alianza con BuildWithin, lideré como Lead Product Designer el rediseño completo de la plataforma — originalmente enfocada en otro mercado — hacia un producto Workforce capaz de gestionar candidatos, aprendizaje, elegibilidad y oportunidades laborales mediante IA, con Celeste (el agente conversacional) como puerta de entrada, en vez de un buscador con filtros.",
    strategy: [
      "El punto de partida fue la persona que busca trabajo, no la oferta. Diseñé la experiencia agéntica de Celeste como primera interacción: contarle a alguien qué está buscando, no elegir categoría y ubicación. En paralelo, diseñé el sitio web y la plataforma de candidatos completa, donde empleo, formación, coaching y eventos conviven con el mismo peso — cada organización socia necesitaba que su programa se sintiera nativo de la plataforma, así que el sistema de componentes sostiene por igual una vacante que un programa de coaching ejecutivo.",
      "Uno de los procesos más costosos era la validación de elegibilidad, tradicionalmente manual: los candidatos entregaban múltiples documentos y los administradores revisaban uno por uno categoría, vigencia, firmas, coincidencia con el perfil y calidad de imagen — repitiendo la revisión cuando un mismo documento servía para varias categorías. Rediseñé este flujo integrando IA que identifica el tipo de documento, lo clasifica, reutiliza un mismo archivo para múltiples requisitos, valida vencimientos y firmas, detecta baja calidad, y determina elegibilidad antes de avanzar — deteniendo el flujo antes de una revisión administrativa que nunca iba a aprobarse.",
      "Como Lead Product Designer, construí también el Design System que sostiene toda la plataforma y apoyé al equipo en flujos complejos: investigación → arquitectura de información → user flows → wireframes → prototipos de alta fidelidad → pruebas en Maze → revisión con Product → feedback con cliente y CEO → iteración → handoff. El trabajo se validó de forma continua con Product, el cliente y la CEO de BuildWithin, no como una fase aislada al final.",
    ],
    headline: "un consejero, no un buscador",
    gallery: introGallery("talent-capital", "Talent Capital", 1, 13, "mp4", { 1: "webp", 2: "webp" }),
  },
  {
    slug: "quartz",
    title: "quartz",
    category: "Dirección de Arte",
    tag: "dirección de arte · fotografía conceptual",
    subtitle: "El hilo de la Novia — interpretación de Bodas de Sangre",
    client: "Editorial",
    role: "Directora de arte",
    year: "2024",
    result: "Serie en 3 actos",
    services: "Dirección de arte · Fotografía conceptual · Concepto visual",
    skills: [
      "Dirección de arte",
      "Fotografía conceptual",
      "Styling",
      "Investigación conceptual",
      "Storytelling visual",
      "Dirección de movimiento",
    ],
    cover: "Quartz — El hilo de la Novia",
    coverMedia: img("quartz", "cover.webp"),
    brief:
      "Quartz es una reinterpretación visual de Bodas de Sangre de Federico García Lorca, construida como un afiche/serie fotográfica alrededor de un solo personaje: la Novia. En vez de narrar la obra, la serie traduce su transformación emocional al lenguaje corporal del flamenco, usando un hilo rojo como extensión física de aquello que la Novia intenta controlar y que, acto a acto, termina dominándola. El flamenco funciona aquí como símbolo — de la pasión, el deseo, la sangre y la fuerza interna — y el rojo del hilo como su materialización visual: nace contenido dentro del cuerpo y termina ocupando el espacio, igual que la pasión que la obra presenta como destino inevitable.",
    strategy: [
      "La pieza se estructura en tres actos que siguen la evolución psicológica del personaje, no la cronología literal de la obra.",
      "En el primer acto — la pasión contenida —, la Novia aparece rígida y silenciosa, con una postura cerrada que muestra el control que ejerce sobre sí misma. El hilo rojo nace desde su interior pero permanece dentro de los límites del cuerpo; el único lugar donde logra escapar es la cabeza, donde se transforma en flores tejidas — la Novia todavía racionaliza el sentimiento antes de permitirse sentirlo. La flor roja es una pasión viva, pero atrapada dentro de una estructura social y mental.",
      "En el segundo acto — el deseo aparece —, la llegada de Leonardo desordena lo que estaba contenido. El hilo deja de ser estructura y empieza a expandirse; la Novia ya no mira directamente, se cubre el rostro, y el cuerpo queda atrapado por los hilos en una imagen de raíces — conectada a la tierra, a sus impulsos, pero sin poder escapar. Ya no piensa solo con la cabeza: empieza a sentir con todo el cuerpo.",
      "En el tercer acto — el quiebro: liberación y destino —, aparece el Cambré Flamenco (el Quiebro): el cuerpo abandona la verticalidad y se deja llevar. El hilo sale del cuerpo, ocupa el espacio y genera tensión con el exterior. Las manos — narración emocional, no solo gesto — viajan desde el interior hacia el exterior, desde la contención hacia la liberación: el cuerpo dice lo que la palabra ya no puede contener. La serie completa traza el viaje de una mujer que pasa de estar contenida por la norma y la razón, a enfrentarse con su deseo y finalmente dejarse atravesar por él.",
    ],
    headline: "el hilo de la novia",
    gallery: introGallery("quartz", "Quartz", 1, 13, "webp", { 8: "png" }),
  },
  {
    slug: "bodas-de-sangre",
    title: "violencia normalizada",
    category: "Dirección Editorial",
    tag: "dirección editorial",
    subtitle: "Bitácora basada en Bodas de Sangre, Federico García Lorca",
    client: "Proyecto académico",
    role: "Dirección Editorial & Gráfico",
    year: "—",
    result: "Bitácora editorial impresa",
    services: "Dirección editorial",
    skills: [
      "Dirección editorial",
      "Análisis literario",
      "Storytelling",
      "Sistemas editoriales",
      "Tipografía editorial",
      "Diseño de publicaciones impresas",
      "Investigación conceptual",
    ],
    cover: "Violencia normalizada — bitácora",
    coverMedia: img("violencia-normalizada", "01.jpg"),
    brief:
      "Violencia normalizada es una bitácora impresa, desarrollada como proyecto académico, que usa Bodas de Sangre de Federico García Lorca como estructura narrativa para hablar de algo que rara vez se nombra: la violencia que ejercemos sobre otros sin reconocerla como tal, y la que recibimos sin cuestionarla. La obra de Lorca — honor, linaje, matrimonio arreglado, el peso del \"qué dirán\", los celos leídos como amor — funciona como espejo de dinámicas que siguen operando hoy, normalizadas bajo la costumbre, la tradición o el silencio. El objetivo de la bitácora no es analizar la obra desde la literatura, sino usarla como herramienta para que quien lee se reconozca en dos roles a la vez: alguien que en algún momento ha generado una violencia normalizada hacia otro, y alguien que la ha recibido sin identificarla como tal.",
    strategy: [
      "La dirección editorial parte de leer Bodas de Sangre no como tragedia romántica sino como un catálogo de violencias que la obra — y buena parte de la cultura que la rodea — trata como normales: el control familiar sobre la elección de pareja, el silencio impuesto a la Novia, los celos de Leonardo leídos como pasión en vez de posesión, la Madre que transmite el ciclo de venganza como herencia, y el desenlace fatal presentado como destino inevitable en vez de como consecuencia de decisiones normalizadas. Cada uno de estos núcleos se convierte en un capítulo de la bitácora, y cada capítulo obliga al lector a hacer el mismo ejercicio: identificar dónde ha ocupado el lugar de quien ejerce esa violencia, y dónde ha ocupado el lugar de quien la recibe. La estructura editorial no busca dar respuestas cerradas — busca que el formato mismo (bitácora, no ensayo) invite a anotar, reconocer y volver.",
    ],
    headline: "reconocerse en dos roles",
    gallery: [
      { label: "Portada — bitácora", media: img("violencia-normalizada", "02.jpg") },
      { label: "Spread — capítulo I", media: img("violencia-normalizada", "03.jpg") },
      { label: "Spread — capítulo II", media: img("violencia-normalizada", "04.jpg") },
      { label: "Tipografía editorial", media: img("violencia-normalizada", "05.jpg") },
      { label: "Sistema de anotación", media: img("violencia-normalizada", "06.jpg") },
      { label: "Detalle de página", media: img("violencia-normalizada", "07.jpg") },
      { label: "Spread final", media: img("violencia-normalizada", "08.jpg") },
      ...introGallery("violencia-normalizada", "Violencia normalizada", 8, 13),
    ],
  },
  {
    slug: "bodas-de-sangre-teatral",
    title: "bodas de sangre — escenografía",
    category: "Escenografía",
    tag: "set & diseño teatral · diseño de iluminación",
    subtitle: "Puesta en escena interdisciplinaria para Federico García Lorca",
    client: "Teatro UC (proyecto académico)",
    role: "Diseño de iluminación · exploración de escenografía y vestuario",
    year: "—",
    result: "Producción integrada a partir de propuestas de 4+ equipos, seleccionadas por ciclos quincenales",
    services: "Escenografía · Diseño de iluminación · Dirección de arte",
    skills: [
      "Dirección de arte",
      "Diseño de iluminación",
      "Prototipado",
      "Facilitación",
      "Colaboración interdisciplinaria",
      "Product Thinking",
    ],
    cover: "Bodas de Sangre — diseño teatral",
    coverMedia: img("obra-teatral-bodas-de-sangre", "01.jpg"),
    brief:
      "Proyecto académico desarrollado durante un semestre mediante ciclos de trabajo quincenales: distintos equipos de estudiantes de diseño y teatro presentaban, cada dos semanas, propuestas para una misma producción de Bodas de Sangre, cubriendo escenografía, vestuario, iluminación e identidad visual. Después de cada entrega, las alternativas se revisaban colectivamente con la profesora y el equipo teatral, y las más sólidas se incorporaban a la producción final. Mi participación principal se concentró en el equipo de iluminación, usando la luz como recurso narrativo y emocional; además participé en las etapas colectivas de evaluación de escenografía y vestuario.",
    strategy: [
      "El curso combinó exploración divergente (cada equipo producía interpretaciones distintas para el mismo desafío) con selección convergente (el grupo completo analizaba y elegía las soluciones más adecuadas), evitando comprometerse demasiado pronto con una única dirección. En escenografía se seleccionó una propuesta basada en barro y tierra por su carácter terrenal — no como decoración, sino como superficie dramática capaz de afectar el movimiento de los actores y la manera en que la luz incidía sobre el escenario.",
      "Mi contribución se concentró en iluminación, entendida como elemento estructural de la puesta en escena y no como una capa añadida al final. Trabajé la luz sobre varios niveles a la vez: jerarquía (qué debía concentrar la atención), atmósfera (temperatura emocional de cada escena), espacio (ampliar o reducir visualmente el escenario), materialidad (revelar las texturas del barro, la madera, el vestuario) y contraste (aislar cuerpos dentro del fondo oscuro) — usando luces focales y ambientes fríos para generar profundidad, tensión y una sensación de amenaza.",
      "La validación fue recurrente cada dos semanas: presentaciones, crítica colectiva, comparación entre alternativas, pruebas en el espacio teatral con materiales bajo iluminación real y ensayos con actores. La fase final de integración comprobó cómo convivían las decisiones seleccionadas — el barro debía responder a la iluminación, el vestuario destacar sobre el escenario sin romper la atmósfera — transformando propuestas independientes de distintos equipos en una producción compartida y unificada bajo una dirección común.",
    ],
    headline: "el espacio como tensión",
    gallery: [
      { label: "Escenografía — vista general", media: img("obra-teatral-bodas-de-sangre", "02.jpg") },
      { label: "Detalle de set", media: img("obra-teatral-bodas-de-sangre", "03.jpg") },
      { label: "Puesta en escena", media: img("obra-teatral-bodas-de-sangre", "04.jpg") },
      ...introGallery("obra-teatral-bodas-de-sangre", "Bodas de Sangre — escenografía", 4, 13),
    ],
  },
  {
    slug: "polucio",
    title: "polucio",
    category: "Product Design",
    tag: "product design · ux strategy",
    subtitle: "Sistema de información ambiental para aulas",
    client: "Proyecto académico",
    role: "Product Design · UX Strategy · Prototyping · Electronic Design",
    year: "2025",
    result: "Prototipo funcional de monitoreo ambiental para aulas",
    services: "Design strategy · Product design · Prototipado",
    skills: [
      "UX Strategy",
      "Product Design",
      "Prototipado",
      "Diseño de interacción",
      "Diseño electrónico",
      "Investigación de contexto",
    ],
    cover: "Polucio — sistema de monitoreo ambiental",
    coverMedia: img("polucio", "01.jpg"),
    brief:
      "La calidad del aire en las salas de clases suele pasar desapercibida. La acumulación de CO₂ se vuelve gradual y silenciosa, afectando el bienestar y la concentración de estudiantes y docentes sin señales claras para intervenir. Polucio fue concebido como un sistema de información ambiental accesible que transforma datos complejos en una señal visual simple, permitiendo que cualquier persona dentro del aula comprenda cuándo es momento de ventilar el espacio sin depender de datos técnicos ni de aplicaciones externas.",
    strategy: [
      "En lugar de desarrollar una plataforma con gráficos o mediciones técnicas, la estrategia consistió en convertir los datos ambientales en una señal visual compartida por toda la sala. El dispositivo comunica el estado de la calidad del aire mediante cambios de iluminación y promueve una acción concreta: ventilar el aula.",
      "El proyecto se apoyó en tres principios de diseño: visibilidad inmediata, acción sobre la información y educación mediante el diseño. La repetición de estas señales facilita hábitos de ventilación y aumenta la conciencia sobre la relación entre ambiente, salud y aprendizaje.",
      "Polucio se presenta no como un dispositivo electrónico aislado, sino como un proyecto de Product Design y UX centrado en cambiar el comportamiento de los usuarios mediante una interacción física sencilla y significativa.",
    ],
    headline: "hacer visible lo invisible",
    gallery: [
      { label: "Polucio — imagen 2", media: img("polucio", "02.jpg") },
      { label: "Polucio — imagen 3", media: img("polucio", "03.jpg") },
      { label: "Polucio — imagen 4", media: img("polucio", "04.jpg") },
      { label: "Polucio — imagen 5", media: img("polucio", "05.jpg") },
      { label: "Polucio — imagen 6", media: img("polucio", "06.jpg") },
      ...introGallery("polucio", "Polucio", 6, 13),
    ],
  },
  {
    slug: "amphora",
    title: "amphora",
    category: "E-commerce",
    tag: "ux/ui · web design",
    subtitle: "Una tienda online tan cuidada como el producto",
    client: "Amphora",
    role: "UX/UI Design",
    year: "—",
    result: "E-commerce con personalidad de marca",
    services: "Web design",
    skills: ["Figma", "Webflow"],
    cover: "Amphora — e-commerce",
    coverMedia: img("amphora", "hero.png"),
    brief:
      "Amphora necesitaba una tienda online que transmitiera la misma delicadeza y cuidado que el producto que vende. El desafío era traducir una marca sensorial y estética a una experiencia digital clara, con suficiente fuerza para convertir sin perder su personalidad premium.",
    strategy: [
      "Diseñé la arquitectura de la tienda alrededor de la narrativa del producto: presentación visual, jerarquía de información y un recorrido de compra con ritmo fluido para que cada pantalla se sintiera cuidada y coherente.",
      "El resultado fue una interfaz elegante y funcional, con componentes reutilizables que permitieron expandir el catálogo sin perder la identidad de marca.",
    ],
    headline: "una tienda con personalidad",
    gallery: [
      { label: "Amphora — portada", media: img("amphora", "01.jpg") },
      { label: "Amphora — producto", media: img("amphora", "02.jpg") },
      { label: "Amphora — interacción", media: img("amphora", "03.gif") },
      ...introGallery("amphora", "Amphora", 4, 13, "webp", { 6: "mp4", 11: "gif" }),
    ],
  },
  {
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
  },
  {
    slug: "altafid-design-system",
    title: "altafid — design system",
    category: "Design System",
    tag: "design system",
    subtitle: "Tipografía, color e iconografía documentados",
    client: "Altafid",
    role: "Design Systems Lead",
    year: "—",
    result: "Base de componentes reutilizable",
    services: "Design tokens · Componentes",
    skills: ["Figma", "Design tokens"],
    cover: "Altafid — Design System",
    coverMedia: img("design-system", "hero.webp"),
    brief:
      "El sistema de diseño de Altafid documenta tipografía, color, iconografía y componentes reutilizables, permitiendo que equipos de producto y desarrollo trabajen con un mismo lenguaje visual.",
    strategy: [
      "Auditamos las pantallas existentes para identificar inconsistencias, luego consolidamos estilos y componentes en una librería única con reglas claras de uso.",
      "Una base de componentes documentada que acelera el diseño y desarrollo de nuevas pantallas manteniendo coherencia visual.",
    ],
    headline: "una base que escala",
    // mixed video/image set uploaded via the dev tool; mediaFor() picks the
    // right element per file extension (.mp4 → video, .webp → image)
    gallery: [
      "01.mp4", "02.webp", "03.webp", "04.webp",
      "intro-04.webp", "intro-05.webp", "intro-06.webp", "intro-07.webp",
      "intro-08.mp4", "intro-09.webp", "intro-10.webp", "intro-11.webp", "intro-12.webp",
    ].map((file, i) => ({
      label: `Altafid Design System — imagen ${i + 1}`,
      media: mediaFor("design-system", file),
    })),
  },
  {
    slug: "bululu",
    title: "bululu",
    category: "Diseño de Servicios",
    tag: "diseño de servicios · experiencia educativa",
    subtitle: "Teatro itinerante para el desarrollo socioemocional en la primera infancia",
    client: "Proyecto de título (académico)",
    role: "Diseñadora integral — investigación, estrategia, diseño de servicio, identidad, personajes, prototipado físico y validación",
    year: "—",
    result: "Metodología validada con niños en un colegio colaborador",
    services: "Investigación · Estrategia de servicio · Branding · Diseño de personajes · Diseño de experiencia · Diseño de producto",
    skills: [
      "Research",
      "UX Strategy",
      "Service Design",
      "Product Thinking",
      "Interaction Design",
      "Visual Design",
      "Prototyping",
      "User Testing",
      "Facilitation",
      "Stakeholder Management",
    ],
    cover: "BULULU",
    coverMedia: img("bululu", "01.jpg"),
    brief:
      "BULULU es un servicio educativo itinerante orientado a fortalecer el desarrollo socioemocional en niños y niñas de educación preescolar, usando teatro, títeres, música, movimiento y reconocimiento de expresiones faciales para enseñar a identificar emociones y desarrollar empatía. Nace de una investigación sobre la disminución de la empatía en la infancia y la escasa formación sistemática en habilidades socioemocionales dentro del currículo escolar. La hipótesis central: los niños comprenden mejor las emociones cuando las viven de forma concreta y corporal, no cuando reciben una explicación verbal — apoyada en el concepto de neuronas espejo. Desarrollado de forma individual como proyecto de título, asumí investigación, estrategia, diseño de servicio, identidad, personajes, prototipado físico y validación de principio a fin.",
    strategy: [
      "La investigación combinó revisión teórica con entrevistas a psicólogas, profesoras y profesoras de actuación — cada perfil aportó una dimensión distinta: desarrollo socioemocional y adecuación por edad, contexto real de aula y dinámica de grupo, y criterios de dramatización, construcción de personajes y storytelling. El insight clave: el teatro ofrece una distancia segura — hablar sobre lo que siente un títere es más fácil que hablar de una experiencia personal propia.",
      "Diseñé el servicio como un modelo B2B2C con dos aliados: un colegio (espacio de validación y contexto real) y una compañía de teatro educativo (operador que comercializa y traslada el teatro entre establecimientos). La experiencia sigue una secuencia progresiva — observar → comprender → representar → clasificar → reflexionar — que lleva a los niños de personajes externos hacia sus propias emociones: presentación teatral con cinco camaleones emocionales, música y expresión corporal, reconocimiento visual mediante fichas de velcro sobre paneles de colores, y una reflexión final que conecta lo vivido con la vida cotidiana.",
      "El teatro itinerante desmontable es a la vez escenario, soporte pedagógico y almacenamiento — un solo objeto multifuncional que se convierte en el elemento icónico de la marca. Validé la experiencia con niños en un colegio colaborador, probando específicamente reconocimiento emocional, comprensión de los títeres, asociación de colores, seguimiento del storytelling y nivel de lenguaje apropiado para su edad — ajustando decisiones de diseño a partir de la respuesta real de los niños, no de supuestos adultos.",
    ],
    headline: "un teatrino con identidad propia",
    gallery: [
      { label: "BULULU — carro completo", media: img("bululu", "02.jpg") },
      { label: "BULULU — personajes", media: img("bululu", "03.jpg") },
      { label: "BULULU — logo", media: img("bululu", "04.jpg") },
      { label: "BULULU — textil", media: img("bululu", "05.jpg") },
      { label: "BULULU — detalle", media: img("bululu", "06.jpg") },
      { label: "BULULU — en uso", media: img("bululu", "07.jpg") },
      ...introGallery("bululu", "Bululu", 7, 13),
    ],
  },
  {
    slug: "la-chanchada",
    title: "la chanchada",
    category: "Identidad",
    tag: "identidad · brand design",
    subtitle: "Propuesta de identidad para una marca local",
    client: "La Chanchada",
    role: "Brand Design",
    year: "—",
    result: "Identidad visual con personalidad propia",
    services: "Branding · Diseño editorial",
    skills: ["Branding", "Illustrator", "Photoshop", "Diseño editorial"],
    cover: "La Chanchada — identidad",
    coverMedia: img("la-chanchada", "cover.webp"),
    brief:
      "La Chanchada necesitaba una identidad que reflejara su carácter cercano, popular y distintivo. El reto era construir una propuesta visual con personalidad propia, capaz de sostenerse en la marca, el packaging y la comunicación cotidiana.",
    strategy: [
      "Diseñé una identidad visual que combinara una estética reconocible con un tono cercano, para que la marca se sintiera auténtica, memorable y diferente.",
      "La solución buscó traducir la esencia del proyecto en un sistema flexible que funcionara en distintos puntos de contacto sin perder coherencia ni fuerza.",
    ],
    headline: "una identidad con sabor y presencia",
    gallery: introGallery("la-chanchada", "La Chanchada", 1, 13),
  },
  {
    slug: "como-y-voto",
    title: "como & voto",
    category: "Identidad",
    tag: "identidad · packaging · diseño contextual",
    subtitle: "Un envase que resuelve una restricción de contexto real",
    client: "Como & Voto",
    role: "Brand & Packaging Design",
    year: "—",
    result: "Sistema coherente entre logo, empaque y mecanismo de extracción",
    services: "Brand identity · Packaging · Diseño de producto",
    skills: ["Illustrator", "Photoshop", "Packaging Design", "Fotografía de producto", "Product Thinking"],
    cover: "Como & Voto",
    coverMedia: img("como-y-voto", "01.jpg"),
    brief:
      "El proyecto parte de una observación contextual: en determinados espacios de sesión prolongada no se permite ingresar alimentos, aunque sí bebestibles. Como & Voto propone un envase con apariencia de vaso de café que contiene malvaviscos o trufas bañadas en chocolate, con una tapa diseñada para extraer una unidad sin abrir completamente el envase — el packaging funciona como interfaz entre el producto, la norma del espacio y el comportamiento del usuario, no solo como contenedor.",
    strategy: [
      "La estrategia se apoyó en tres principios: integración contextual (usar una tipología ya aceptada en el entorno, el vaso para llevar), discreción funcional (la tapa permite retirar una unidad sin exponer todo el contenido) y una identidad vinculada al contexto (nombre, gesto gráfico y colores conectan el acto de comer con el lenguaje del entorno de uso).",
      "La solución final integra producto, identidad y packaging en una experiencia coherente con el contexto para el que fue diseñada — portabilidad, facilidad de extracción y reducción de interrupciones durante una sesión prolongada.",
    ],
    headline: "un sello con carácter",
    gallery: [
      { label: "Como & Voto — packaging", media: img("como-y-voto", "02.jpg") },
      { label: "Como & Voto — logo", media: img("como-y-voto", "03.jpg") },
      { label: "Como & Voto — producto", media: img("como-y-voto", "04.jpg") },
      { label: "Como & Voto — detalle", media: img("como-y-voto", "05.jpg") },
      { label: "Como & Voto — set", media: img("como-y-voto", "06.jpg") },
      ...introGallery("como-y-voto", "Como & Voto", 6, 13),
    ],
  },
  {
    slug: "hbt",
    title: "hbt",
    category: "Web Design",
    tag: "ux/ui · web design",
    subtitle: "Artículos de cocina y hogar online",
    client: "HBT",
    role: "UX/UI Design",
    year: "—",
    result: "Interfaz lista para escalar el catálogo",
    services: "Web design",
    skills: ["Figma", "Information Architecture", "Interaction Design", "Design System"],
    cover: "HBT",
    coverMedia: img("hbt", "01.jpg"),
    brief:
      "HBT necesitaba una experiencia de tienda que facilitara la compra de productos muy diversos, sin perder claridad frente a una categoría con muchas variantes y decisiones de compra por resolver. El reto era transformar un catálogo amplio en una interfaz simple, visualmente ordenada y escalable.",
    strategy: [
      "Diseñé la navegación y las fichas de producto para que la información se entendiera rápidamente, con jerarquías claras y un recorrido que guiara la decisión de compra.",
      "La solución priorizó una UI limpia y modular, capaz de crecer con el catálogo y sostener nuevas categorías sin perder cohesión visual.",
    ],
    headline: "decisiones complejas, simples",
    gallery: introGallery("hbt", "HBT", 1, 13, "webp", { 4: "png", 5: "png", 11: "png" }),
  },
  {
    slug: "londra",
    title: "londra",
    category: "Web Design",
    tag: "ux/ui · web design",
    subtitle: "Tienda de decoración para el hogar",
    client: "Londra",
    role: "UX/UI Design",
    year: "—",
    result: "Portada fácil de actualizar con contenido nuevo",
    services: "Web design",
    skills: ["Figma", "Responsive Design", "Information Architecture", "Interaction Design"],
    cover: "Londra",
    coverMedia: img("londra", "01.jpg"),
    brief:
      "Londra necesitaba una tienda digital que se sintiera elegante, cálida y fácil de actualizar. El proyecto se concentró en mostrar colecciones y novedades de forma atractiva, mientras se mantenía una arquitectura de navegación flexible para el crecimiento del catálogo.",
    strategy: [
      "Diseñé un sistema de grilla y bloques de contenido que permitiera destacar promociones, colecciones y novedades sin necesidad de reestructurar la página cada temporada.",
      "El resultado fue una portada y una estructura de categorías claras, con un tono visual que reforzaba la propuesta de decoración del hogar.",
    ],
    headline: "una grilla que respira",
    gallery: [
      { label: "Londra — portada", media: img("londra", "02.jpg") },
    ],
  },
  {
    slug: "nicopoly",
    title: "nicopoly",
    category: "E-commerce",
    tag: "ux/ui · web design",
    subtitle: "E-commerce de moda",
    client: "Nicopoly",
    role: "UX/UI Design",
    year: "—",
    result: "Sistema visual consistente de punta a punta",
    services: "Web design",
    skills: ["Figma", "Responsive Design", "Information Architecture", "Interaction Design"],
    cover: "Nicopoly",
    coverMedia: img("nicopoly", "01.jpg"),
    brief:
      "Nicopoly requería una experiencia de compra que fuera simple, visualmente consistente y adecuada para un público que necesitaba navegar y decidir con rapidez. El proyecto abarcó la mirada general del e-commerce, desde categorías hasta el detalle de producto y el carro.",
    strategy: [
      "Mapeé el flujo de compra para diseñar una interfaz más fluida y comprensible, con filtrado claro, tarjetas de producto consistentes y un recorrido orientado a la conversión.",
      "La propuesta buscó reducir fricción y hacer del proceso de compra una experiencia ordenada, elegante y fácil de seguir.",
    ],
    headline: "comprar, simplificado",
    gallery: [
      { label: "Nicopoly — categoría", media: img("nicopoly", "02.jpg") },
      { label: "Nicopoly — producto", media: img("nicopoly", "03.jpg") },
    ],
  },
  {
    slug: "rocket-mkt",
    title: "rocket mkt",
    category: "Brand + Web",
    tag: "brand identity · ux/ui · marketing website",
    subtitle: "Construyendo una marca digital desde cero",
    client: "Tekpro (nueva unidad de negocio: Rocket MKT)",
    role: "Lead Brand & Product Designer",
    year: "—",
    result: "Identidad completa + sitio corporativo orientado a generación de leads",
    services: "Brand Strategy · Visual Identity · Web design · Motion",
    skills: [
      "Brand Strategy",
      "Visual Identity",
      "UX Strategy",
      "UI Design",
      "Motion Design",
      "Design System",
    ],
    cover: "Rocket MKT",
    coverMedia: img("rocket-mkt", "01.jpg"),
    brief:
      "Tekpro buscaba crear una nueva unidad de negocio especializada en marketing digital: Rocket MKT. El reto iba mucho más allá de un sitio web — había que construir una marca completa desde cero (identidad visual, lenguaje gráfico, personalidad, sistema visual y experiencia digital) capaz de diferenciarse del resto de la empresa, transmitir creatividad e innovación, y generar confianza suficiente para atraer nuevos clientes en un mercado de agencias altamente competitivo. Como Lead Brand & Product Designer, diseñé la identidad visual desde cero y luego traduje esa identidad en una experiencia digital orientada a la generación de leads.",
    strategy: [
      "El proceso fue deliberadamente brand-first: Brand Strategy → Visual Identity → Design Language → Website UX → Lead Generation, en vez de diseñar primero el sitio y aplicarle colores después. Definimos los atributos de marca (creatividad, innovación, cercanía, orientación a resultados, enfoque digital) a partir de entender qué posicionamiento debía ocupar Rocket MKT frente a otras agencias, y esos atributos guiaron tanto la identidad visual como las decisiones posteriores de UX.",
      "Diseñé la identidad completa —logotipo, paleta cromática, tipografía, iconografía, patrones gráficos, lenguaje visual, recursos ilustrativos— usando una paleta vibrante para transmitir energía e innovación, diferenciándose deliberadamente del lenguaje visual conservador de las agencias tradicionales.",
      "Con la identidad consolidada, diseñé el sitio corporativo (Home, Servicios, Casos de éxito, Clientes, Contacto) con una navegación inmersiva mediante menú fullscreen y animaciones que reforzaban la personalidad de marca — el recorrido fue pensado para responder progresivamente las preguntas de un potencial cliente hasta llegar al formulario de contacto.",
    ],
    headline: "personalidad distintiva y segura",
    gallery: [
      { label: "Rocket MKT — home", media: img("rocket-mkt", "02.jpg") },
      { label: "Rocket MKT — interacción", media: img("rocket-mkt", "03.gif") },
      { label: "Rocket MKT — motion", media: img("rocket-mkt", "04.gif") },
      { label: "Rocket MKT — detalle", media: img("rocket-mkt", "05.gif") },
    ],
  },
  {
    slug: "soya-adicto",
    title: "soyadicto",
    category: "Identidad",
    tag: "identidad · food brand",
    subtitle: "Hamburguesas a base de soya",
    client: "SoyAdicto",
    role: "Brand & Graphic Design",
    year: "—",
    result: "Identidad con carácter propio",
    services: "Brand identity · Ilustración · Fotografía de producto",
    skills: ["Illustrator", "Photoshop", "Fotografía de producto"],
    cover: "SoyAdicto",
    coverMedia: img("soya-adicto", "01.jpg"),
    brief:
      "SoyAdicto planteaba la oportunidad de construir una identidad de marca con carácter, a partir de un concepto que jugaba con el juego de palabras entre soja y adicción. El reto era traducir esa idea a una propuesta visual coherente, aplicable a empaque, textil e imagen del producto.",
    strategy: [
      "Desarrollé una ilustración central y una tipografía manuscrita que sostuvieran la personalidad de la marca, aportando una sensación artesanal y reconocible.",
      "La identidad se aplicó de forma consistente en las piezas físicas y en la comunicación visual, generando una presencia que se recordaba con facilidad.",
    ],
    headline: "identidad con carácter",
    gallery: [
      { label: "SoyAdicto — ilustración", media: img("soya-adicto", "02.jpg") },
      { label: "SoyAdicto — producto", media: img("soya-adicto", "03.jpg") },
      { label: "SoyAdicto — aplicación", media: img("soya-adicto", "04.jpg") },
      ...introGallery("soya-adicto", "SoyAdicto", 4, 13),
    ],
  },
  {
    slug: "cnc",
    title: "cnc — bicicleta de equilibrio",
    category: "Product Design",
    tag: "diseño industrial · fabricación digital · cad",
    subtitle: "De modelo 3D a prototipo CNC: bicicleta infantil de equilibrio",
    client: "Proyecto académico — curso de Modelo y Prototipado",
    role: "Diseñadora de producto — conceptualización, modelado 3D, preparación CNC, fabricación y montaje",
    year: "—",
    result: "Prototipo ensamblado a partir de piezas mecanizadas en CNC",
    services: "Diseño de producto · Modelado 3D · Fabricación digital",
    skills: [
      "3D Modeling",
      "CAD",
      "Design for Manufacturing",
      "CNC Fabrication",
      "Physical Prototyping",
      "Technical Drawing",
      "Assembly Design",
    ],
    cover: "CNC — bicicleta de equilibrio",
    coverMedia: img("cnc", "cover.webp"),
    brief:
      "Proyecto académico del curso de Modelo y Prototipado, orientado a aprender el flujo completo de fabricación digital: diseñar y fabricar una bicicleta infantil de equilibrio, recorriendo desde el modelado 3D hasta la producción de piezas con una máquina CNC. El objetivo no era solo diseñar un objeto visualmente atractivo, sino aprender a pensar un producto que pudiera modelarse, descomponerse en piezas, mecanizarse, ensamblarse y evaluarse como prototipo físico real — entendiendo que diseñar en pantalla no garantiza que el producto pueda fabricarse correctamente.",
    strategy: [
      "La estrategia consistió en diseñar simultáneamente el objeto y su proceso de fabricación, en vez de finalizar primero una forma y adaptarla después a la CNC. El framework central fue Design for Manufacturing: cada decisión formal debía responder también a preguntas técnicas — ¿puede esta geometría cortarse en la máquina?, ¿cómo se separa el producto en piezas?, ¿qué tolerancia necesitan los ejes y encastres?, ¿qué partes requieren mayor resistencia?",
      "El modelado 3D permitió definir proporciones, comprobar relaciones entre cuadro, asiento, ruedas y manillar, y anticipar puntos de unión antes de fabricar. Elegí una bicicleta de equilibrio como tipología porque ofrecía el balance justo entre simplicidad y complejidad — reconocible, pero con suficientes desafíos de estructura, ejes y estabilidad para poner a prueba el proceso completo de fabricación CNC.",
      "La fabricación reveló diferencias entre la intención digital y el comportamiento real del material — tolerancias, flexión, ajuste de encastres, dificultad de montaje — que el modelo digital no podía resolver por sí solo. Cada corrección se convirtió en aprendizaje: el prototipo físico funcionó como una forma de investigación, no como una representación final del diseño.",
    ],
    headline: "del cad al objeto",
    gallery: introGallery("cnc", "CNC", 1, 13),
  },
  {
    slug: "llay-llay",
    title: "peque olimpiadas llay-llay",
    category: "Service Design",
    tag: "experience design · service design · identidad",
    subtitle: "Una experiencia lúdica para conectar a cinco comunidades educativas",
    client: "Puentes UC + Municipalidad de Llay-Llay",
    role: "Diseñadora integrante de un equipo multidisciplinario de 4 personas",
    year: "—",
    result: "Evento que reunió a 5 jardines infantiles bajo una identidad y narrativa común",
    services: "Experience Design · Service Design · Identidad visual · Diseño de evento",
    skills: [
      "Research",
      "UX Strategy",
      "Service Design",
      "Visual Design",
      "Facilitation",
      "Stakeholder Management",
      "Collaboration",
    ],
    cover: "Peque Olimpiadas Llay-Llay",
    coverMedia: img("llay-llay", "cover.webp"),
    brief:
      "Durante mi práctica de servicio en Puentes UC, colaboré con un equipo de cuatro personas y una contraparte municipal para diseñar y producir las Peque Olimpiadas Llay-Llay: una jornada que reuniera a cinco jardines infantiles en una experiencia común. El reto no era solo estético — una olimpiada con lógica deportiva convencional podía resultar difícil de comprender o poco atractiva para niños en edad preescolar. Diseñamos, en cambio, un sistema completo: universo visual, mascotas por jardín, juegos, invitaciones, señalética, actividades familiares y ambientación general, priorizando reconocimiento y participación por sobre competencia.",
    strategy: [
      "La estrategia se apoyó en cuatro principios: reconocimiento antes que explicación (los niños aún no leen de forma autónoma, así que la experiencia se comunica con personajes, formas y colores), participación antes que competencia (el disfrute y la colaboración priman sobre el rendimiento), sistema antes que piezas (la identidad se aplica a invitaciones, mascotas, señalética, disfraces, escenario y recuerdos por igual) y comunidad antes que usuario aislado (el niño no participa solo — la experiencia también responde a familias, educadoras y organizadores).",
      "Diseñamos una mascota anfitriona y un personaje propio por cada jardín, lo que permitió construir reconocimiento y pertenencia sin depender de instrucciones escritas. El flujo de experiencia completo — invitación → preparación → llegada → identificación → orientación → participación → celebración → recuerdo — mostró que el proyecto no comenzaba al entrar al recinto: la invitación ya preparaba a las familias, y las fotografías y objetos generados extendían la experiencia después del evento.",
      "La validación fue principalmente contextual y operativa: revisamos las propuestas con la contraparte municipal, ajustamos los elementos a las capacidades reales de producción, y observamos su funcionamiento durante el evento. La participación espontánea de los niños y su capacidad de reconocer personajes y actividades fueron las señales cualitativas de que el sistema resultaba comprensible y atractivo.",
    ],
    headline: "una identidad que se puede jugar",
    gallery: introGallery("llay-llay", "Llay Llay", 1, 13),
  },
  {
    slug: "longboard",
    title: "longboard pintail",
    category: "Product Design",
    tag: "diseño industrial · fabricación digital · manufactura",
    subtitle: "Diseño, modelado digital y fabricación mediante CNC y prensado al vacío",
    client: "Proyecto universitario — curso de Prototipado y Modelado",
    role: "Industrial Designer / Product Designer — proceso completo de diseño, modelado, fabricación y acabado",
    year: "—",
    result: "Longboard funcional, fabricado y documentado con fotografía de producto",
    services: "Diseño industrial · Modelado 3D · Fabricación digital · Manufactura",
    skills: [
      "CAD Modeling",
      "Digital Fabrication",
      "Manufacturing",
      "Prototyping",
      "Material Knowledge",
      "Product Photography",
    ],
    cover: "Longboard Pintail",
    coverMedia: img("longboard", "cover.webp"),
    brief:
      "Diseñé y fabriqué un longboard tipo Pintail funcional como proyecto universitario del curso de Prototipado y Modelado, recorriendo el ciclo completo de desarrollo de producto físico: conceptualización, modelado digital, fabricación mediante CNC, laminado, prensado al vacío y terminaciones. Más allá de diseñar un longboard atractivo, el desafío era desarrollar un proceso de fabricación real capaz de producir un deck resistente, con curvatura controlada y acabado profesional, integrando modelado 3D, manufactura asistida por computador, mecanizado CNC, laminado de madera y prensado al vacío.",
    strategy: [
      "Definí una geometría tipo Pintail por su estabilidad y estética clásica inspirada en el surf, y a partir del modelo 3D desarrollé dos moldes complementarios — uno convexo y otro cóncavo — cuya función no era cortar la silueta final, sino generar la curvatura del deck durante el prensado. Cada decisión tomada en el modelado afectaba directamente la forma del molde, la curvatura resultante y el comportamiento del material durante el prensado.",
      "Los moldes se mecanizaron en una fresadora CNC. Sobre el molde inferior apilé múltiples chapas delgadas de bambú impregnadas en cola fría, cerré el conjunto con el molde superior y lo introduje en un sistema de vacío reforzado con prensas, asegurando presión uniforme durante el curado del adhesivo — permitiendo que todas las chapas adoptaran la curvatura definida digitalmente.",
      "Tras el curado, corté el contorno definitivo del longboard a partir de la placa curva laminada, y completé lijado, perforaciones, instalación de lija transparente, montaje de trucks y ruedas. Cerré el proyecto con una sesión fotográfica tipo producto inspirada en el lenguaje visual del surf y el lifestyle de California, resaltando la veta natural de la madera y el contraste entre trucks fucsia y ruedas amarillas.",
    ],
    headline: "una idea que se puede tocar",
    gallery: introGallery("longboard", "Longboard", 1, 13, "webp", { 4: "png" }),
  },
  {
    slug: "marley-coffee",
    title: "marley coffee",
    category: "E-commerce",
    tag: "ux/ui · web design · consumo masivo",
    subtitle: "Ecommerce de café premium",
    client: "Marley Coffee",
    role: "UX/UI Designer",
    year: "—",
    result: "Ecommerce alineado con la identidad de marca, catálogo organizado",
    services: "Web design",
    skills: ["Figma", "Information Architecture", "Design System", "Product Thinking"],
    cover: "Marley Coffee — portada",
    coverMedia: img("marley-coffee", "cover.png"),
    brief:
      "Marley Coffee necesitaba una plataforma de ecommerce que reflejara su identidad de marca — colores corporativos, personalidad, fuerte presencia del producto — mientras ofrecía una experiencia de compra intuitiva y familiar. El objetivo era permitir descubrir el catálogo, explorar productos y completar la compra sin fricciones, equilibrando una identidad visual muy reconocible con las mejores prácticas de usabilidad en ecommerce.",
    strategy: [
      "La estrategia priorizó una estructura de navegación ampliamente reconocida por usuarios de ecommerce, dejando que el branding — no la novedad estructural — diferenciara la experiencia: fotografías de alta calidad, productos como protagonistas, navegación simple, componentes consistentes y CTAs visibles.",
      "Diseñé Home, PLP, PDP, carrito, header, footer, páginas institucionales y componentes reutilizables, organizando la arquitectura de información para reducir el número de pasos hacia el producto. El sistema visual usó la paleta corporativa (negro, blanco, rojo, verde, amarillo) manteniendo coherencia con la identidad de marca existente.",
    ],
    headline: "café, sin fricción",
    gallery: introGallery("marley-coffee", "Marley Coffee", 1, 13),
  },
];

const PENDING_STUBS: {
  slug: string;
  title: string;
  displayTitle: string;
  // omit when no photos have been uploaded yet — the tile falls back to a
  // placeholder instead of pointing at a file that doesn't exist
  coverExt?: string;
  introCount: number;
  introExtOverrides?: Record<number, string>;
  // defaults to the title; set when the title isn't the client's name
  client?: string;
}[] = [
  { slug: "brava", title: "brava", displayTitle: "Brava", coverExt: "webp", introCount: 13 },
  { slug: "buildwithin", title: "buildwithin", displayTitle: "BuildWithin", coverExt: "png", introCount: 13, client: "BuildWithin" },
  {
    slug: "buildwithin-design-system",
    title: "buildwithin — superadmin",
    displayTitle: "BuildWithin — SuperAdmin",
    coverExt: "png",
    introCount: 13,
    client: "BuildWithin",
  },
  { slug: "dior", title: "dior", displayTitle: "Dior", coverExt: "gif", introCount: 13 },
  {
    slug: "maquillaje-teatral",
    title: "maquillaje teatral",
    displayTitle: "Maquillaje teatral",
    coverExt: "webp",
    introCount: 6,
    introExtOverrides: { 1: "png" },
  },
  { slug: "pants", title: "pants", displayTitle: "Pants", coverExt: "webp", introCount: 13 },
];

// Most of these have real photos already (uploaded via the local dev tool) but
// no written client/brief/strategy copy yet — only the media gets wired up
// here; the placeholder text stays until that copy is written. Stubs without a
// coverExt have no photos at all yet and render as placeholders throughout.
for (const stub of PENDING_STUBS) {
  projects.push({
    slug: stub.slug,
    title: stub.title,
    category: "Próximamente",
    tag: "proyecto por documentar",
    subtitle: "Case study en preparación",
    client: stub.client ?? stub.title,
    role: "—",
    year: "—",
    result: "Próximamente",
    skills: [],
    cover: `${stub.displayTitle} — portada`,
    coverMedia: stub.coverExt ? img(stub.slug, `cover.${stub.coverExt}`) : undefined,
    brief:
      "El contenido de este proyecto está en preparación — pronto vas a poder ver el caso completo acá.",
    strategy: [],
    headline: "próximamente",
    gallery: introGallery(stub.slug, stub.displayTitle, 1, stub.introCount, "webp", stub.introExtOverrides),
    pending: true,
  });
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjectSlug = "talent-capital";

export const categories: string[] = Array.from(
  new Set(projects.map((p) => p.category))
);

export function searchProjects(query: string): Project[] {
  const q = query.trim().toLowerCase();
  if (!q) return projects;
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  if (!words.length) return projects;
  const scored = projects.map((p) => {
    const haystack = [
      p.title,
      p.category,
      p.tag,
      p.client,
      p.services ?? "",
      ...p.skills,
    ]
      .join(" ")
      .toLowerCase();
    const score = words.reduce((n, w) => n + (haystack.includes(w) ? 1 : 0), 0);
    return { p, score };
  });
  const matched = scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
  return matched.length ? matched : projects;
}
