export type GallerySize = "normal" | "ancha" | "alta" | "grande";

export type GalleryItem = {
  size: GallerySize;
  label: string;
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
  brief: string;
  strategy: string[];
  headline: string;
  gallery: GalleryItem[];
};

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
    brief:
      "Talent Capital nació de un mandato de una coalición regional: empleadores, agencias de gobierno y organizaciones sin fines de lucro de DC, Maryland y Virginia necesitaban una sola puerta de entrada al mercado laboral de la región. El panorama existente estaba fragmentado — decenas de bolsas de trabajo, portales de formación y programas de coaching que el usuario tenía que descubrir por su cuenta, sin ningún hilo conductor entre ellos. El encargo, en alianza con BuildWithin, era diseñar una plataforma capaz de unificar ese ecosistema y sumarle un agente de IA que hablara con la gente como lo haría un consejero de carrera, no como un buscador con filtros.",
    strategy: [
      "El punto de partida fue la persona que busca trabajo, no la oferta de trabajo. Diseñé la experiencia agéntica de Celeste como la puerta de entrada conversacional de la plataforma: la primera interacción del usuario no es \"elige categoría y ubicación\", es contarle a alguien qué está buscando, y que ese alguien entienda contexto, no solo palabras clave.",
      "En paralelo, diseñé el sitio web y la plataforma de candidatos completa — la arquitectura donde empleo, formación, coaching y eventos conviven con el mismo peso, no como una lista de vacantes con la capacitación como nota al pie. Cada organización socia necesitaba que su programa se sintiera nativo de la plataforma, no insertado a la fuerza, así que el sistema de componentes sostiene por igual una vacante, un programa de coaching ejecutivo o un taller de liderazgo, sin que ninguno se vea de segunda categoría frente al resto.",
    ],
    headline: "un consejero, no un buscador",
    gallery: [
      { size: "grande", label: "Plataforma — vista general" },
      { size: "normal", label: "Agente Celeste — conversación" },
      { size: "normal", label: "Panel de candidato" },
      { size: "ancha", label: "Sistema de componentes" },
      { size: "normal", label: "Programas y coaching" },
      { size: "ancha", label: "Responsive — mobile" },
    ],
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
    brief:
      "Quartz es una reinterpretación visual de Bodas de Sangre de Federico García Lorca, construida como un afiche/serie fotográfica alrededor de un solo personaje: la Novia. En vez de narrar la obra, la serie traduce su transformación emocional al lenguaje corporal del flamenco, usando un hilo rojo como extensión física de aquello que la Novia intenta controlar y que, acto a acto, termina dominándola. El flamenco funciona aquí como símbolo — de la pasión, el deseo, la sangre y la fuerza interna — y el rojo del hilo como su materialización visual: nace contenido dentro del cuerpo y termina ocupando el espacio, igual que la pasión que la obra presenta como destino inevitable.",
    strategy: [
      "La pieza se estructura en tres actos que siguen la evolución psicológica del personaje, no la cronología literal de la obra.",
      "En el primer acto — la pasión contenida —, la Novia aparece rígida y silenciosa, con una postura cerrada que muestra el control que ejerce sobre sí misma. El hilo rojo nace desde su interior pero permanece dentro de los límites del cuerpo; el único lugar donde logra escapar es la cabeza, donde se transforma en flores tejidas — la Novia todavía racionaliza el sentimiento antes de permitirse sentirlo. La flor roja es una pasión viva, pero atrapada dentro de una estructura social y mental.",
      "En el segundo acto — el deseo aparece —, la llegada de Leonardo desordena lo que estaba contenido. El hilo deja de ser estructura y empieza a expandirse; la Novia ya no mira directamente, se cubre el rostro, y el cuerpo queda atrapado por los hilos en una imagen de raíces — conectada a la tierra, a sus impulsos, pero sin poder escapar. Ya no piensa solo con la cabeza: empieza a sentir con todo el cuerpo.",
      "En el tercer acto — el quiebro: liberación y destino —, aparece el Cambré Flamenco (el Quiebro): el cuerpo abandona la verticalidad y se deja llevar. El hilo sale del cuerpo, ocupa el espacio y genera tensión con el exterior. Las manos — narración emocional, no solo gesto — viajan desde el interior hacia el exterior, desde la contención hacia la liberación: el cuerpo dice lo que la palabra ya no puede contener. La serie completa traza el viaje de una mujer que pasa de estar contenida por la norma y la razón, a enfrentarse con su deseo y finalmente dejarse atravesar por él.",
    ],
    headline: "el hilo de la novia",
    gallery: [
      { size: "grande", label: "Acto III — El Quiebro" },
      { size: "alta", label: "Acto I — la pasión contenida" },
      { size: "normal", label: "Detalle — hilo rojo" },
      { size: "ancha", label: "Acto II — el deseo aparece" },
      { size: "normal", label: "Detalle — flores tejidas" },
      { size: "normal", label: "Composición final" },
    ],
  },
  {
    slug: "bodas-de-sangre",
    title: "violencia normalizada",
    category: "Dirección Editorial",
    tag: "dirección editorial",
    subtitle: "Bitácora basada en Bodas de Sangre, Federico García Lorca",
    client: "Proyecto académico",
    role: "Dirección editorial",
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
    brief:
      "Violencia normalizada es una bitácora impresa, desarrollada como proyecto académico, que usa Bodas de Sangre de Federico García Lorca como estructura narrativa para hablar de algo que rara vez se nombra: la violencia que ejercemos sobre otros sin reconocerla como tal, y la que recibimos sin cuestionarla. La obra de Lorca — honor, linaje, matrimonio arreglado, el peso del \"qué dirán\", los celos leídos como amor — funciona como espejo de dinámicas que siguen operando hoy, normalizadas bajo la costumbre, la tradición o el silencio. El objetivo de la bitácora no es analizar la obra desde la literatura, sino usarla como herramienta para que quien lee se reconozca en dos roles a la vez: alguien que en algún momento ha generado una violencia normalizada hacia otro, y alguien que la ha recibido sin identificarla como tal.",
    strategy: [
      "La dirección editorial parte de leer Bodas de Sangre no como tragedia romántica sino como un catálogo de violencias que la obra — y buena parte de la cultura que la rodea — trata como normales: el control familiar sobre la elección de pareja, el silencio impuesto a la Novia, los celos de Leonardo leídos como pasión en vez de posesión, la Madre que transmite el ciclo de venganza como herencia, y el desenlace fatal presentado como destino inevitable en vez de como consecuencia de decisiones normalizadas. Cada uno de estos núcleos se convierte en un capítulo de la bitácora, y cada capítulo obliga al lector a hacer el mismo ejercicio: identificar dónde ha ocupado el lugar de quien ejerce esa violencia, y dónde ha ocupado el lugar de quien la recibe. La estructura editorial no busca dar respuestas cerradas — busca que el formato mismo (bitácora, no ensayo) invite a anotar, reconocer y volver.",
    ],
    headline: "reconocerse en dos roles",
    gallery: [
      { size: "grande", label: "Portada — bitácora" },
      { size: "normal", label: "Spread — capítulo I" },
      { size: "normal", label: "Spread — capítulo II" },
      { size: "ancha", label: "Tipografía editorial" },
      { size: "normal", label: "Sistema de anotación" },
      { size: "ancha", label: "Spread final" },
    ],
  },
];

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
