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
    role: "Product Designer",
    year: "2025",
    result: "Ecosistema unificado DC · MD · VA",
    services:
      "Diseño de experiencia agéntica · Diseño de sitio web y plataforma de candidatos",
    skills: [
      "Figma",
      "Conversational UX",
      "Design Systems",
      "UX Research",
      "Prototipado",
      "Diseño responsive",
      "Accesibilidad",
      "Colaboración multi-stakeholder",
    ],
    cover: "Talent Capital — plataforma de candidatos",
    coverMedia: video("talent-capital", "hero.mp4"),
    brief:
      "Talent Capital nació de un mandato de una coalición regional: empleadores, agencias de gobierno y organizaciones sin fines de lucro de DC, Maryland y Virginia necesitaban una sola puerta de entrada al mercado laboral de la región. El panorama existente estaba fragmentado — decenas de bolsas de trabajo, portales de formación y programas de coaching que el usuario tenía que descubrir por su cuenta, sin ningún hilo conductor entre ellos. El encargo, en alianza con BuildWithin, era diseñar una plataforma capaz de unificar ese ecosistema y sumarle un agente de IA que hablara con la gente como lo haría un consejero de carrera, no como un buscador con filtros.",
    strategy: [
      "El punto de partida fue la persona que busca trabajo, no la oferta de trabajo. Diseñé la experiencia agéntica de Celeste como la puerta de entrada conversacional de la plataforma: la primera interacción del usuario no es \"elige categoría y ubicación\", es contarle a alguien qué está buscando, y que ese alguien entienda contexto, no solo palabras clave.",
      "En paralelo, diseñé el sitio web y la plataforma de candidatos completa — la arquitectura donde empleo, formación, coaching y eventos conviven con el mismo peso, no como una lista de vacantes con la capacitación como nota al pie. Cada organización socia necesitaba que su programa se sintiera nativo de la plataforma, no insertado a la fuerza, así que el sistema de componentes sostiene por igual una vacante, un programa de coaching ejecutivo o un taller de liderazgo, sin que ninguno se vea de segunda categoría frente al resto.",
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
    tag: "set & diseño teatral",
    subtitle: "Puesta en escena para Federico García Lorca",
    client: "Teatro UC",
    role: "Diseño Escenográfico",
    year: "—",
    result: "Atmósfera coherente con el tono de la obra",
    services: "Escenografía",
    skills: ["Materiales físicos", "Illustrator"],
    cover: "Bodas de Sangre — diseño teatral",
    coverMedia: img("obra-teatral-bodas-de-sangre", "01.jpg"),
    brief:
      "Diseño escenográfico para una producción teatral de \"Bodas de Sangre\" de Federico García Lorca, trabajando color, textura y espacio para construir una atmósfera que reforzara la tensión dramática de la obra y la identidad del lenguaje escénico.",
    strategy: [
      "El diseño se pensó en función del texto y la dirección: cada elemento en escena refuerza la tensión dramática de la historia y ayuda a construir una lectura visual más intensa del conflicto.",
      "La propuesta buscó una puesta en escena con una identidad espacial coherente, donde el material, el color y la composición reforzaran el tono emocional de la pieza.",
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
    tag: "product · fintech",
    subtitle: "Plataforma SaaS de gestión de inversiones",
    client: "Altafid",
    role: "UX/UI Lead",
    year: "—",
    result: "Producto cohesivo en +10 módulos",
    services: "Design system · UX research · UI",
    skills: ["Figma", "Design tokens", "Investigación de usuarios"],
    cover: "Altafid Platform",
    coverMedia: img("altafid", "01.jpg"),
    brief:
      "Altafid es una plataforma SaaS que ayuda a las personas a gestionar y hacer crecer sus inversiones. Como líder UX/UI, superviso la interfaz y el sistema de diseño en toda la superficie del producto — desde el perfilamiento de riesgo hasta portafolios, trading, compliance, billing y CRM.",
    strategy: [
      "El trabajo parte de la investigación: entrevistas y pruebas de usabilidad con inversionistas y asesores reales informan la arquitectura de información, mientras un sistema de diseño compartido mantiene consistencia visual y de comportamiento a medida que el producto crece.",
      "Una experiencia de producto cohesiva a través de más de diez módulos, construida sobre un sistema de diseño reutilizable que permite lanzar funcionalidades nuevas sin romper la consistencia.",
    ],
    headline: "un mismo lenguaje visual",
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
    category: "Identidad",
    tag: "identidad · diseño de objeto",
    subtitle: "Un teatrino de títeres itinerante",
    client: "BULULU",
    role: "Dirección de Arte & Diseño de Producto",
    year: "—",
    result: "Identidad coherente entre logo, personajes y objeto",
    services: "Identidad · Personajes · Estructura",
    skills: ["Illustrator", "Photoshop", "Fotografía de producto"],
    cover: "BULULU",
    coverMedia: img("bululu", "01.jpg"),
    brief:
      "BULULU nació como un proyecto de identidad y objeto para un teatrino de títeres itinerante. El desafío era construir una marca que se sintiera viva, artesanal y reconocible, capaz de sostenerse tanto en el lenguaje visual como en el propio carro-teatrino.",
    strategy: [
      "Diseñé una identidad que uniera logo, personajes y estructura física del objeto, para que cada parte del proyecto reforzara el resto y generara una experiencia visual coherente.",
      "El resultado fue un sistema transportable y potente, con una presencia propia que funcionara en el escenario, en la fotografía de producto y en la comunicación de marca.",
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
    tag: "identidad · packaging",
    subtitle: "Malvaviscos bañados en chocolate",
    client: "Como & Voto",
    role: "Brand & Packaging Design",
    year: "—",
    result: "Identidad coherente entre logo y empaque",
    services: "Brand identity · Packaging",
    skills: ["Illustrator", "Photoshop", "Fotografía de producto"],
    cover: "Como & Voto",
    coverMedia: img("como-y-voto", "01.jpg"),
    brief:
      "Como & Voto buscaba una identidad que transmitiera ternura, humor y una propuesta gastronómica distinta. El proyecto combinó un logo con carácter ilustrado y un empaque que pudiera funcionar como parte de la experiencia de marca, no solo como contenedor.",
    strategy: [
      "La solución se apoyó en una estética de sello artesanal y una ilustración a mano que aportara personalidad, sin perder claridad en el punto de venta.",
      "La identidad se aplicó de manera consistente en el envase y la presentación del producto, generando una experiencia memorable y reconocible.",
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
    skills: ["Figma"],
    cover: "HBT",
    coverMedia: img("hbt", "01.jpg"),
    brief:
      "HBT necesitaba una experiencia de tienda que facilitara la compra de productos muy diversos, sin perder claridad frente a una categoría con muchas variantes y decisiones de compra por resolver. El reto era transformar un catálogo amplio en una interfaz simple, visualmente ordenada y escalable.",
    strategy: [
      "Diseñé la navegación y las fichas de producto para que la información se entendiera rápidamente, con jerarquías claras y un recorrido que guiara la decisión de compra.",
      "La solución priorizó una UI limpia y modular, capaz de crecer con el catálogo y sostener nuevas categorías sin perder cohesión visual.",
    ],
    headline: "decisiones complejas, simples",
    gallery: [],
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
    skills: ["Figma"],
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
    skills: ["Figma"],
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
    tag: "ux/ui · web design · brand",
    subtitle: "Un colectivo de marketing tan enérgico como su sitio",
    client: "Rocket MKT",
    role: "UX/UI & Brand Design",
    year: "—",
    result: "Identidad lista para extenderse a otros puntos de contacto",
    services: "Web design · Brand",
    skills: ["Figma", "Illustrator"],
    cover: "Rocket MKT",
    coverMedia: img("rocket-mkt", "01.jpg"),
    brief:
      "Rocket MKT quería un sitio que transmitiera energía, confianza y una identidad de marca muy propia. El desafío era combinar una propuesta visual audaz con una experiencia web clara y funcional, capaz de sostener la personalidad del colectivo.",
    strategy: [
      "Usé contrastes fuertes, tipografía contundente y una estructura simple para construir una interfaz que se sintiera viva sin perder legibilidad.",
      "La solución entregó una experiencia web con identidad potente, lista para expandirse a otros puntos de contacto y reforzar la marca en digital.",
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
    title: "buildwithin — design system",
    displayTitle: "BuildWithin — Design System",
    introCount: 10,
    client: "BuildWithin",
  },
  { slug: "cnc", title: "cnc", displayTitle: "CNC", coverExt: "webp", introCount: 13 },
  { slug: "dior", title: "dior", displayTitle: "Dior", coverExt: "gif", introCount: 0 },
  { slug: "llay-llay", title: "llay llay", displayTitle: "Llay Llay", coverExt: "webp", introCount: 13 },
  {
    slug: "longboard",
    title: "longboard",
    displayTitle: "Longboard",
    coverExt: "webp",
    introCount: 13,
    introExtOverrides: { 4: "png" },
  },
  {
    slug: "maquillaje-teatral",
    title: "maquillaje teatral",
    displayTitle: "Maquillaje teatral",
    coverExt: "webp",
    introCount: 6,
    introExtOverrides: { 1: "png" },
  },
  { slug: "marley-coffee", title: "marley coffee", displayTitle: "Marley Coffee", coverExt: "png", introCount: 0 },
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
