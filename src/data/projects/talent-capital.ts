import { Project, CaseSection, video, introGallery, sectionsToStrategy } from "./helpers";

const sectionsEs: CaseSection[] = [
  {
    "id": "context",
    "label": "Contexto",
    "title": "Contexto",
    "blocks": [
      {
        "type": "p",
        "text": "Existían empleos, programas de formación y servicios de apoyo laboral en toda la región, pero estaban dispersos entre distintas organizaciones y eran difíciles de navegar."
      },
      {
        "type": "p",
        "text": "Talent Capital nació para conectar a las personas con esas oportunidades y ayudarlas a dar el siguiente paso en su carrera."
      }
    ]
  },
  {
    "id": "contribution",
    "label": "Mi aporte",
    "title": "Mi aporte",
    "blocks": [
      {
        "type": "p",
        "text": "Como Senior Product Designer, lideré el diseño end-to-end de la experiencia de candidatos, desde la arquitectura de información y las interacciones conversacionales hasta las interfaces de alta fidelidad, los componentes de UI reutilizables, el prototipado, la validación y el handoff a ingeniería."
      },
      {
        "type": "p",
        "text": "Trabajé de cerca con Producto, Ingeniería, el cliente y la CEO de BuildWithin para convertir la tecnología agéntica subyacente en una experiencia de producto accesible y coherente."
      }
    ]
  },
  {
    "id": "process",
    "label": "Proceso de diseño",
    "title": "Proceso de diseño",
    "blocks": [
      {
        "type": "subtitle",
        "text": "De la investigación a producción"
      },
      {
        "type": "p",
        "text": "Con solo tres semanas para entregar el MVP, seguí un proceso iterativo centrado en entender las necesidades de las personas, explorar soluciones y validar decisiones con rapidez."
      },
      {
        "type": "p",
        "text": "Trabajé en investigación, arquitectura de información, user flows, wireframes y prototipos de alta fidelidad, y usé Figma Make para explorar interacciones y alinear temprano con Producto e Ingeniería."
      },
      {
        "type": "p",
        "text": "Las pruebas en Maze, las revisiones con stakeholders y el feedback del cliente y de la CEO de BuildWithin alimentaron iteraciones continuas antes del handoff."
      },
      {
        "type": "p",
        "text": "Tras el lanzamiento, usé las conversaciones de Zendesk, los funnels de PostHog y las grabaciones de sesión para entender el comportamiento real de las personas e identificar oportunidades de mejora."
      },
      {
        "type": "p",
        "text": "El proceso no fue lineal. La investigación, el prototipado, la validación y la iteración continuaron a medida que el producto evolucionaba."
      }
    ]
  },
  {
    "id": "decisions",
    "label": "Decisiones clave",
    "title": "Decisiones clave de diseño",
    "blocks": [],
    "children": [
      {
        "id": "decision-1",
        "label": "01 · Multiagente",
        "title": "01 — Simplificar una experiencia multiagente",
        "blocks": [
          {
            "type": "label",
            "text": "El desafío"
          },
          {
            "type": "p",
            "text": "El brief original de BuildWithin proponía mostrar cinco agentes de IA especializados dentro de la interfaz conversacional. Las personas cambiarían de agente según necesitaran empleo, formación, coaching, eventos o apoyo al emprendimiento."
          },
          {
            "type": "p",
            "text": "Me cuestioné si eso reflejaba cómo piensan realmente las personas sus necesidades profesionales."
          },
          {
            "type": "label",
            "text": "La decisión"
          },
          {
            "type": "p",
            "text": "Propuse Celeste como una única interfaz conversacional que reúne el conocimiento y las capacidades de los cinco agentes especializados."
          },
          {
            "type": "p",
            "text": "En vez de navegar entre conversaciones distintas, las personas podían explicar sus objetivos a un solo asesor y acceder al apoyo pertinente a medida que sus necesidades cambiaban."
          },
          {
            "type": "label",
            "text": "Por qué importó"
          },
          {
            "type": "p",
            "text": "El equipo adoptó este enfoque, simplificando la experiencia sin reducir las capacidades de la tecnología subyacente."
          },
          {
            "type": "callout",
            "text": "Las personas podían centrarse en lo que querían lograr en lugar de entender cómo estaba organizado el sistema de IA."
          }
        ]
      },
      {
        "id": "decision-2",
        "label": "02 · Conversación + UI",
        "title": "02 — Combinar conversación con exploración estructurada",
        "blocks": [
          {
            "type": "label",
            "text": "El desafío"
          },
          {
            "type": "p",
            "text": "Revisar conversaciones reales en Zendesk mostró comportamientos distintos. Algunas personas daban contexto detallado, mientras que otras escribían solo unas pocas palabras o abandonaban la interacción."
          },
          {
            "type": "p",
            "text": "Surgió una pregunta: ¿era la conversación siempre la forma más eficaz de explorar oportunidades?"
          },
          {
            "type": "label",
            "text": "La decisión"
          },
          {
            "type": "p",
            "text": "Diseñé una experiencia híbrida que combina la guía conversacional de Celeste con tarjetas de empleo interactivas, filtros y acciones directas."
          },
          {
            "type": "callout",
            "text": "Las personas podían moverse entre el descubrimiento guiado por IA y patrones de interfaz familiares, sin verse obligadas a un recorrido solo de chat."
          },
          {
            "type": "label",
            "text": "Por qué importó"
          },
          {
            "type": "p",
            "text": "El enfoque se implementó en producción, dando a las personas más flexibilidad y control sobre cómo exploraban las oportunidades."
          }
        ]
      },
      {
        "id": "decision-3",
        "label": "03 · Confianza",
        "title": "03 — Diseñar para la confianza y la explicabilidad",
        "blocks": [
          {
            "type": "label",
            "text": "El desafío"
          },
          {
            "type": "p",
            "text": "Las recomendaciones de carrera generadas por IA debían ser comprensibles y ajustables, sobre todo al influir en decisiones profesionales importantes."
          },
          {
            "type": "label",
            "text": "La decisión"
          },
          {
            "type": "p",
            "text": "Diseñé explicaciones del puntaje de compatibilidad, feedback de me gusta / no me gusta, carga de CV y preguntas de aclaración para ayudar a las personas a entender las recomendaciones, aportar contexto y corregir el sistema."
          },
          {
            "type": "label",
            "text": "Por qué importó"
          },
          {
            "type": "callout",
            "text": "Estas interacciones se diseñaron para hacer a Celeste más transparente y dar a las personas control sobre sus decisiones profesionales, en lugar de pedirles que aceptaran recomendaciones sin explicación."
          }
        ]
      },
      {
        "id": "decision-4",
        "label": "04 · Onboarding",
        "title": "04 — Rediseñar el onboarding para mejorar la calidad de los matches",
        "blocks": [
          {
            "type": "label",
            "text": "El desafío"
          },
          {
            "type": "p",
            "text": "Los funnels y las grabaciones de sesión de PostHog revelaron un problema en la experiencia de onboarding."
          },
          {
            "type": "p",
            "text": "Las personas podían saltarse la configuración inicial del perfil, pensada para recoger la información necesaria para generar matches de empleo personalizados."
          },
          {
            "type": "p",
            "text": "Muchas la saltaban y dejaban el perfil incompleto. Como resultado, las recomendaciones eran a menudo demasiado amplias y las personas aportaban poco contexto adicional a través de Celeste."
          },
          {
            "type": "callout",
            "text": "El problema no era solo el abandono del onboarding, sino que las personas llegaban al producto sin información suficiente para que la IA aportara valor."
          },
          {
            "type": "label",
            "text": "La decisión"
          },
          {
            "type": "p",
            "text": "Rediseñé el onboarding para reducir la fricción y facilitar que las personas aportaran información profesional relevante."
          },
          {
            "type": "p",
            "text": "Acorté el flujo inicial a la información general necesaria para un match (preferencias, roles, ubicación y tipo de empleo) e incorporé la carga de CV, de modo que la información del perfil se completara automáticamente en vez de exigir que la ingresaran a mano. También sumé un modal de login, un paso de bienvenida y el sidebar abierto desde el inicio."
          },
          {
            "type": "p",
            "text": "Para quienes igual decidían saltarse el onboarding, diseñé un mensaje persistente y una checklist que explican cómo mejorar sus matches subiendo un CV o completando el perfil."
          },
          {
            "type": "label",
            "text": "Por qué importó"
          },
          {
            "type": "p",
            "text": "Este enfoque preservó la libertad de saltarse el paso y dejó clara la ventaja de completar el perfil."
          },
          {
            "type": "p",
            "text": "Tras el rediseño, el abandono posterior al registro bajó de aproximadamente 40% a 10%, según PostHog."
          },
          {
            "type": "p",
            "text": "Más importante aún, la nueva experiencia resolvió un problema de fondo: ayudar a la IA a reunir suficiente contexto para dar recomendaciones útiles sin que el onboarding se sintiera como una barrera."
          }
        ]
      }
    ]
  },
  {
    "id": "validation",
    "label": "Validación e iteración",
    "title": "Validación e iteración",
    "blocks": [
      {
        "type": "p",
        "text": "Combiné pruebas en Maze, conversaciones de Zendesk, feedback de stakeholders, funnels de PostHog y grabaciones de sesión para evaluar la experiencia durante el desarrollo y después del lanzamiento."
      },
      {
        "type": "p",
        "text": "Estas fuentes ayudaron a identificar dónde las interacciones conversacionales no bastaban, dónde las personas necesitaban más control y cómo los perfiles incompletos afectaban la utilidad de las recomendaciones."
      },
      {
        "type": "p",
        "text": "El rediseño del onboarding fue un ejemplo especialmente valioso de cómo conectar datos de comportamiento con una decisión de producto y luego medir el cambio tras el lanzamiento."
      }
    ]
  },
  {
    "id": "outcome",
    "label": "Resultado y aprendizajes",
    "title": "Resultado y aprendizajes",
    "blocks": [
      {
        "type": "result"
      },
      {
        "type": "subtitle",
        "text": "Aprendizajes"
      },
      {
        "type": "p",
        "text": "El proyecto reforzó una lección importante: diseñar experiencias agénticas no consiste en exponer la complejidad de la IA."
      },
      {
        "type": "p",
        "text": "Consiste en decidir cuándo el sistema debe guiar, cuándo debe pedir contexto y cuándo las personas necesitan control directo."
      },
      {
        "type": "callout",
        "text": "Las decisiones de diseño más valiosas hicieron la tecnología menos visible y la experiencia más útil."
      }
    ]
  }
];

const sectionsEn: CaseSection[] = [
  {
    "id": "context",
    "label": "Context",
    "title": "Context",
    "blocks": [
      {
        "type": "p",
        "text": "Jobs, training programs, and career support services existed throughout the region, but they were scattered across different organizations and difficult to navigate."
      },
      {
        "type": "p",
        "text": "Talent Capital was created to connect people with these opportunities and help them take the next step in their careers."
      }
    ]
  },
  {
    "id": "contribution",
    "label": "My contribution",
    "title": "My contribution",
    "blocks": [
      {
        "type": "p",
        "text": "As Senior Product Designer, I led the end-to-end design of the candidate experience, from information architecture and conversational interactions to high-fidelity interfaces, reusable UI components, prototyping, validation, and engineering handoff."
      },
      {
        "type": "p",
        "text": "I worked closely with Product, Engineering, the client, and BuildWithin's CEO to turn the underlying agentic technology into an accessible and coherent product experience."
      }
    ]
  },
  {
    "id": "process",
    "label": "Design process",
    "title": "Design process",
    "blocks": [
      {
        "type": "subtitle",
        "text": "From research to production"
      },
      {
        "type": "p",
        "text": "With only three weeks to deliver the MVP, I followed an iterative process focused on understanding user needs, exploring solutions, and validating decisions quickly."
      },
      {
        "type": "p",
        "text": "I worked across research, information architecture, user flows, wireframes, and high-fidelity prototypes, using Figma Make to explore interactions and align early with Product and Engineering."
      },
      {
        "type": "p",
        "text": "Maze testing, stakeholder reviews, and feedback from the client and BuildWithin's CEO informed continuous iterations before handoff."
      },
      {
        "type": "p",
        "text": "After launch, I used Zendesk conversations, PostHog funnels, and session recordings to understand real user behavior and identify opportunities for improvement."
      },
      {
        "type": "p",
        "text": "The process wasn't linear. Research, prototyping, validation, and iteration continued as the product evolved."
      }
    ]
  },
  {
    "id": "decisions",
    "label": "Key decisions",
    "title": "Key design decisions",
    "blocks": [],
    "children": [
      {
        "id": "decision-1",
        "label": "01 · Multi-agent",
        "title": "01 — Simplifying a multi-agent experience",
        "blocks": [
          {
            "type": "label",
            "text": "The challenge"
          },
          {
            "type": "p",
            "text": "BuildWithin's original brief proposed exposing five specialized AI agents within the conversational interface. Users would switch between agents depending on whether they needed jobs, training, coaching, events, or entrepreneurship support."
          },
          {
            "type": "p",
            "text": "I questioned whether this reflected how people actually think about their career needs."
          },
          {
            "type": "label",
            "text": "The decision"
          },
          {
            "type": "p",
            "text": "I proposed Celeste as a single conversational interface bringing together the knowledge and capabilities of all five specialized agents."
          },
          {
            "type": "p",
            "text": "Instead of navigating different conversations, users could explain their goals to one advisor and access the relevant support as their needs changed."
          },
          {
            "type": "label",
            "text": "Why it mattered"
          },
          {
            "type": "p",
            "text": "The team adopted this approach, simplifying the experience without reducing the capabilities of the underlying technology."
          },
          {
            "type": "callout",
            "text": "Users could focus on what they wanted to achieve rather than understanding how the AI system was organized."
          }
        ]
      },
      {
        "id": "decision-2",
        "label": "02 · Conversation + UI",
        "title": "02 — Combining conversation with structured exploration",
        "blocks": [
          {
            "type": "label",
            "text": "The challenge"
          },
          {
            "type": "p",
            "text": "Reviewing real conversations through Zendesk revealed different user behaviors. Some people provided detailed context, while others entered only a few words or abandoned the interaction."
          },
          {
            "type": "p",
            "text": "This raised a question: was conversation always the most effective way to explore opportunities?"
          },
          {
            "type": "label",
            "text": "The decision"
          },
          {
            "type": "p",
            "text": "I designed a hybrid experience combining Celeste's conversational guidance with interactive job cards, filters, and direct actions."
          },
          {
            "type": "callout",
            "text": "Users could move between AI-guided discovery and familiar interface patterns without being forced into a chat-only journey."
          },
          {
            "type": "label",
            "text": "Why it mattered"
          },
          {
            "type": "p",
            "text": "The approach was implemented in production, giving people greater flexibility and control over how they explored opportunities."
          }
        ]
      },
      {
        "id": "decision-3",
        "label": "03 · Trust",
        "title": "03 — Designing for trust and explainability",
        "blocks": [
          {
            "type": "label",
            "text": "The challenge"
          },
          {
            "type": "p",
            "text": "AI-generated career recommendations needed to be understandable and adjustable, especially when influencing important professional decisions."
          },
          {
            "type": "label",
            "text": "The decision"
          },
          {
            "type": "p",
            "text": "I designed match-score explanations, like/dislike feedback, CV upload, and clarification questions to help users understand recommendations, provide context, and correct the system."
          },
          {
            "type": "label",
            "text": "Why it mattered"
          },
          {
            "type": "callout",
            "text": "These interactions were designed to make Celeste more transparent and give users control over their career decisions rather than asking them to accept recommendations without explanation."
          }
        ]
      },
      {
        "id": "decision-4",
        "label": "04 · Onboarding",
        "title": "04 — Redesigning onboarding to improve match quality",
        "blocks": [
          {
            "type": "label",
            "text": "The challenge"
          },
          {
            "type": "p",
            "text": "PostHog funnels and session recordings revealed a problem in the onboarding experience."
          },
          {
            "type": "p",
            "text": "Users could skip the initial profile setup, which was intended to collect the information needed to generate personalized job matches."
          },
          {
            "type": "p",
            "text": "Many skipped it, leaving their profiles incomplete. As a result, recommendations were often too broad, and users provided little additional context through Celeste."
          },
          {
            "type": "callout",
            "text": "The issue wasn't simply onboarding abandonment. It was that people could reach the product without enough information for the AI to provide meaningful value."
          },
          {
            "type": "label",
            "text": "The decision"
          },
          {
            "type": "p",
            "text": "I redesigned onboarding to reduce friction while making it easier for users to provide relevant career information."
          },
          {
            "type": "p",
            "text": "I shortened the initial flow to the general information needed for a match (preferences, roles, location, and job type) and introduced CV upload, allowing profile information to be populated automatically instead of requiring users to enter everything manually. I also added a login modal, a welcome step, and an open sidebar from the start."
          },
          {
            "type": "p",
            "text": "For users who still chose to skip onboarding, I designed a persistent message and checklist explaining how to improve their matches by uploading a CV or completing their profile."
          },
          {
            "type": "label",
            "text": "Why it mattered"
          },
          {
            "type": "p",
            "text": "This approach preserved users' freedom to skip while making the value of completing their profile clear."
          },
          {
            "type": "p",
            "text": "Following the redesign, post-signup drop-off decreased from approximately 40% to 10%, as observed in PostHog."
          },
          {
            "type": "p",
            "text": "More importantly, the new experience addressed a fundamental problem: helping the AI collect enough context to provide useful recommendations without making onboarding feel like a barrier."
          }
        ]
      }
    ]
  },
  {
    "id": "validation",
    "label": "Validation & iteration",
    "title": "Validation & iteration",
    "blocks": [
      {
        "type": "p",
        "text": "I combined Maze testing, Zendesk conversations, stakeholder feedback, PostHog funnels, and session recordings to evaluate the experience throughout development and after launch."
      },
      {
        "type": "p",
        "text": "These inputs helped identify where conversational interactions were insufficient, where users needed more control, and how incomplete profiles affected the usefulness of recommendations."
      },
      {
        "type": "p",
        "text": "The onboarding redesign was a particularly valuable example of connecting behavioral data to a product decision, then measuring the change after release."
      }
    ]
  },
  {
    "id": "outcome",
    "label": "Outcome & learnings",
    "title": "Outcome & learnings",
    "blocks": [
      {
        "type": "result"
      },
      {
        "type": "subtitle",
        "text": "Learnings"
      },
      {
        "type": "p",
        "text": "The project reinforced an important lesson: designing agentic experiences isn't about exposing the complexity of AI."
      },
      {
        "type": "p",
        "text": "It's about deciding when the system should guide, when it should ask for context, and when people need direct control."
      },
      {
        "type": "callout",
        "text": "The most valuable design decisions made the technology less visible and the experience more useful."
      }
    ]
  }
];


export const talentCapital: Project = {
  slug: "talent-capital",
  title: "Celeste: a conversational AI agent to find jobs",
  category: "Agente de IA para empleo y capacitación",
  tag: "product design · ux & ui",
  subtitle: "Diseñé de punta a punta una plataforma de carrera con IA para personas que buscan empleo en Washington D.C., Maryland y Virginia, centrada en Celeste, un coach de carrera conversacional, sobre la tecnología agéntica de BuildWithin. MVP en tres semanas y lanzamiento público en abril de 2026.",
  client: "Talent Capital (MWCOG)",
  role: "Senior Product Designer (Contractor)",
  year: "2025",
  result:
    "Talent Capital se lanzó públicamente en abril de 2026, conectando a personas de toda la región con oportunidades de empleo y desarrollo profesional. La plataforma superó los 83.000 usuarios activos, dio acceso a más de 100.000 ofertas y fue reconocida como Product of the Year por Technical.ly.",
  services:
    "Diseño de producto end-to-end · Estrategia UX · Diseño de interacción · Componentes de UI",
  skills: [
    "Figma",
    "Conversational UX",
    "Agentic UX",
    "Explainable AI",
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
    "Los despidos masivos de empleados federales en Washington D.C., Maryland y Virginia dejaron a muchos profesionales ante la incertidumbre laboral, con el riesgo de perder talento hacia otros estados. Talent Capital es una plataforma de carrera con IA centrada en Celeste, un coach de carrera conversacional que ayuda a las personas a descubrir empleos, formación, coaching y eventos relevantes según sus habilidades, objetivos y necesidades cambiantes. En lugar de funcionar como una bolsa de empleo tradicional, la plataforma combina orientación personalizada con IA y exploración estructurada, para que cada persona descubra oportunidades y recorra su camino profesional de distintas maneras.",
  strategy: sectionsToStrategy(sectionsEs),
  sections: sectionsEs,
  badges: [
    "IA conversacional",
    "UX agéntico",
    "Mobile first",
    "Workforce",
    "IA explicable",
    "Product design end-to-end",
    "Estrategia UX",
    "Diseño de interacción",
    "Componentes de UI",
    "Accesibilidad (WCAG 2.1 AA)",
    "MVP en 3 semanas",
  ],
  tools: [
    { name: "Figma", use: "Diseño y prototipos de alta fidelidad" },
    { name: "Figma Make", use: "Explorar interacciones y alinear temprano con Producto e Ingeniería" },
    { name: "Maze", use: "Pruebas de usabilidad" },
    { name: "Zendesk", use: "Revisión de conversaciones reales de usuarios" },
    { name: "PostHog", use: "Funnels y grabaciones de sesión" },
    { name: "Claude Code" },
    { name: "Usuarios sintéticos", use: "Pruebas con usuarios sintéticos" },
  ],
  headline: "un consejero, no un buscador",
  decision: {
    problem: "Los despidos masivos de empleados federales en Washington DC, Virginia y Maryland dejaron a muchas personas sin trabajo, con el riesgo de que se fueran a otros estados.",
    solution: "Una plataforma para personas que buscan empleo, con una experiencia agéntica, impulsada por la tecnología agéntica de BuildWithin.",
    did: "Diseñé el proyecto de punta a punta y definí los componentes de UI.",
    result: "Una plataforma con 83.000+ usuarios activos, reconocida como Product of the Year por Technical.ly.",
  },
  digitalPresence: {
    heading: "Impacto",
    headingEn: "Impact",
    stats: [
      { title: "Usuarios activos", titleEn: "Active users", value: "83.000+", valueEn: "83,000+", detail: "TalentCapital.AI tras el lanzamiento público", detailEn: "TalentCapital.AI after the public launch" },
      { title: "Ofertas activas", titleEn: "Active openings", value: "100.000+", valueEn: "100,000+", detail: "En D.C., Maryland y Virginia, según TalentCapital.AI", detailEn: "Across D.C., Maryland and Virginia, per TalentCapital.AI" },
      { title: "Abandono tras el registro", titleEn: "Post-signup drop-off", value: "40% → 10%", detail: "Al rediseñar el onboarding con funnels de PostHog", detailEn: "After redesigning onboarding with PostHog funnels" },
      { title: "Del inicio al MVP", titleEn: "From start to MVP", value: "3 semanas", valueEn: "3 weeks", detail: "Priorizando descubrimiento de empleos y Celeste", detailEn: "Prioritizing job discovery and Celeste" },
    ],
    note: "Cifras de producto del lanzamiento público de TalentCapital.AI y de la analítica interna (PostHog).",
    noteEn: "Product figures from the public launch of TalentCapital.AI and internal analytics (PostHog).",
  },
  gallery: introGallery("talent-capital", "Talent Capital", 1, 13, "mp4", { 1: "webp", 2: "webp" }),
  en: {
    category: "AI Agent for Workforce",
    tag: "product design · ux & ui",
    subtitle: "I designed end to end an AI career platform for job seekers in Washington D.C., Maryland and Virginia, built around Celeste, a conversational career coach, on BuildWithin's agentic technology. MVP in three weeks and public launch in April 2026.",
    result:
      "Talent Capital publicly launched in April 2026, connecting people across the region with employment and career development opportunities. The platform reached more than 83,000 active users, provided access to over 100,000 openings, and was recognized as Product of the Year by Technical.ly.",
    services: "End-to-end Product Design · UX Strategy · Interaction Design · UI Components",
    skills: [
      "Figma",
      "Conversational UX",
      "Agentic UX",
      "Explainable AI",
      "Design Systems",
      "UX Research",
      "Prototyping (Maze)",
      "Responsive Design",
      "Accessibility",
      "Multi-stakeholder Collaboration",
    ],
    brief:
      "Mass layoffs of federal employees across Washington D.C., Maryland, and Virginia left many professionals facing career uncertainty, with the risk of losing talent to other states. Talent Capital is an AI-powered career platform centered around Celeste, a conversational career coach that helps people discover relevant jobs, training, coaching, and events based on their skills, goals, and evolving needs. Rather than functioning as a traditional job board, the platform combines personalized AI guidance with structured exploration, allowing users to discover opportunities and navigate their career journey in different ways.",
    strategy: sectionsToStrategy(sectionsEn),
    sections: sectionsEn,
    badges: [
      "Conversational AI",
      "Agentic UX",
      "Mobile first",
      "Workforce",
      "Explainable AI",
      "End-to-end product design",
      "UX strategy",
      "Interaction design",
      "UI components",
      "Accessibility (WCAG 2.1 AA)",
      "MVP in 3 weeks",
    ],
    tools: [
      { name: "Figma", use: "High-fidelity design and prototypes" },
      { name: "Figma Make", use: "Exploring interactions and aligning early with Product and Engineering" },
      { name: "Maze", use: "Usability testing" },
      { name: "Zendesk", use: "Reviewing real user conversations" },
      { name: "PostHog", use: "Funnels and session recordings" },
      { name: "Claude Code" },
      { name: "Synthetic users", use: "Testing with synthetic users" },
    ],
    headline: "an advisor, not a search bar",
    decision: {
      problem: "Mass layoffs of federal employees in Washington DC, Virginia and Maryland left many people without work, at risk of moving to other states.",
      solution: "A platform for job seekers with an agentic experience, powered by BuildWithin's agentic technology.",
      did: "I designed the project end to end and defined the UI components.",
      result: "A platform with 83,000+ active users, named Product of the Year by Technical.ly.",
    },
  },
};
