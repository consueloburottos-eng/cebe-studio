import { Project, CaseSection, img, introGallery, sectionsToStrategy } from "./helpers";

const sectionsEs: CaseSection[] = [
  {
    "id": "context",
    "label": "Contexto",
    "title": "Contexto",
    "blocks": [
      {
        "type": "p",
        "text": "BuildWithin necesitaba evolucionar su plataforma de gestión de fuerza laboral para apoyar a organizaciones que administran programas de formación, oportunidades de empleo, elegibilidad de candidatos y avance de participantes."
      },
      {
        "type": "p",
        "text": "La plataforma atendía a organizaciones con requisitos operativos distintos, incluidos programas de desarrollo de fuerza laboral regidos por los criterios de elegibilidad de WIOA."
      },
      {
        "type": "p",
        "text": "También debía acomodar seis roles de usuario distintos (Super Admin, Organization Admin, Talent Manager, Case Manager, Employer y Staff interno), cada uno con responsabilidades y acceso a la información diferentes."
      },
      {
        "type": "p",
        "text": "Cada rol tenía su propia experiencia de plataforma separada, y los Super Admins pasaban de una a otra mediante un selector en el sidebar. Quienes administraban varias organizaciones también debían moverse entre contextos organizacionales."
      },
      {
        "type": "p",
        "text": "A medida que la plataforma crecía, este enfoque sumaba complejidad de navegación innecesaria y hacía cada vez más difícil escalar la experiencia."
      }
    ]
  },
  {
    "id": "solution",
    "label": "Solución",
    "title": "Solución",
    "blocks": [
      {
        "type": "p",
        "text": "Diseñé una experiencia enterprise unificada, construida en torno a flujos compartidos, permisos por rol y configuraciones organizacionales configurables."
      },
      {
        "type": "p",
        "text": "En vez de crear experiencias de plataforma separadas para cada rol, la solución estableció una interfaz común donde el acceso a la información y a las funciones lo determinan los permisos."
      },
      {
        "type": "p",
        "text": "Consolidé en una sola plataforma lo que antes eran seis experiencias separadas, cambié cómo se visualizan los permisos e hice los roles configurables, de modo que se puedan crear nuevos roles según las necesidades."
      },
      {
        "type": "p",
        "text": "Los Super Admins podían acceder a la información de todos los roles sin cambiar repetidamente de interfaz, mientras que el resto de las personas veía solo la información y las acciones relevantes para sus responsabilidades."
      },
      {
        "type": "p",
        "text": "La plataforma también incorporó flujos de elegibilidad configurables, verificación documental asistida por IA y componentes reutilizables que sostuvieron experiencias consistentes entre los módulos administrativos."
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
        "text": "Como Senior Product Designer, lideré el diseño end-to-end de la experiencia administrativa durante seis meses."
      },
      {
        "type": "p",
        "text": "Mis responsabilidades incluyeron la arquitectura del producto, los user flows, las interacciones empresariales complejas, las interfaces de alta fidelidad, los componentes reutilizables, el prototipado y la validación de usabilidad."
      },
      {
        "type": "p",
        "text": "Colaboré con la CEO de BuildWithin, Product Managers, Ingeniería, Customer Success y clientes para entender los requisitos operativos y traducirlos en experiencias de producto escalables."
      },
      {
        "type": "p",
        "text": "Más allá de diseñar interfaces, cuestioné el enfoque multiplataforma propuesto y defendí una arquitectura unificada basada en permisos por rol."
      }
    ]
  },
  {
    "id": "challenge",
    "label": "Desafío",
    "title": "Desafío",
    "blocks": [
      {
        "type": "subtitle",
        "text": "Sostener la complejidad sin multiplicar las interfaces"
      },
      {
        "type": "p",
        "text": "BuildWithin necesitaba acomodar distintas organizaciones, responsabilidades administrativas y requisitos regulatorios dentro del mismo producto."
      },
      {
        "type": "p",
        "text": "La dirección inicial consideraba experiencias de plataforma separadas para los distintos roles."
      },
      {
        "type": "p",
        "text": "Sin embargo, las personas administradoras a menudo necesitaban información que cruzaba esos límites. Un Super Admin, por ejemplo, necesitaba ver la misma información operativa disponible para los Case Managers y otros roles administrativos."
      },
      {
        "type": "p",
        "text": "Al mismo tiempo, las organizaciones necesitaban configurar sus propios requisitos de elegibilidad, documentos y flujos sin depender de desarrollo a medida para cada variación."
      },
      {
        "type": "callout",
        "text": "El desafío era crear una experiencia lo bastante flexible para sostener estas diferencias y, a la vez, comprensible, consistente y escalable."
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
        "text": "Entender la plataforma existente y a sus usuarios"
      },
      {
        "type": "p",
        "text": "Empecé con un análisis en profundidad del producto existente junto a la CEO y los Product Managers."
      },
      {
        "type": "p",
        "text": "Examinamos la navegación de la plataforma, los flujos administrativos y los problemas que introducía su modelo de cambio de rol."
      },
      {
        "type": "p",
        "text": "Junto a Customer Success identificamos clientes para entrevistar y entender mejor cómo las organizaciones usaban la plataforma en su operación diaria."
      },
      {
        "type": "p",
        "text": "Esas conversaciones se centraron en las tareas recurrentes, las necesidades de información, las responsabilidades y las dificultades que encontraban las personas administradoras al gestionar candidatos y programas."
      },
      {
        "type": "subtitle",
        "text": "De la investigación a la arquitectura del producto"
      },
      {
        "type": "p",
        "text": "Los hallazgos orientaron la exploración de una experiencia unificada, construida en torno a navegación compartida, permisos y flujos configurables."
      },
      {
        "type": "p",
        "text": "Mapeé los recorridos administrativos, definí las jerarquías de información y exploré patrones de interacción para tareas complejas como la configuración de elegibilidad y la verificación de candidatos."
      },
      {
        "type": "p",
        "text": "Con Figma desarrollé prototipos e interfaces de alta fidelidad, trabajando de forma iterativa con Producto e Ingeniería para resolver los requisitos técnicos y operativos."
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
        "label": "01 · Una plataforma",
        "title": "01 — Una plataforma en vez de múltiples experiencias por rol",
        "blocks": [
          {
            "type": "label",
            "text": "El desafío"
          },
          {
            "type": "p",
            "text": "La plataforma existente estaba dividida en experiencias separadas por rol, y los Super Admins pasaban de una a otra con un selector de avatar en el sidebar."
          },
          {
            "type": "p",
            "text": "Esto generaba una complejidad de navegación innecesaria, sobre todo cuando las personas administradoras necesitaban información de varios roles u organizaciones."
          },
          {
            "type": "p",
            "text": "La dirección inicial del producto consideraba mantener experiencias separadas para cada rol."
          },
          {
            "type": "label",
            "text": "La decisión"
          },
          {
            "type": "p",
            "text": "Cuestioné este enfoque y propuse una plataforma unificada basada en acceso y permisos por rol."
          },
          {
            "type": "p",
            "text": "En lugar de duplicar interfaces, la plataforma compartiría la misma estructura y los mismos flujos."
          },
          {
            "type": "p",
            "text": "Los Super Admins tendrían visibilidad completa de las funciones administrativas, mientras que los demás roles tendrían acceso restringido a información y acciones específicas según sus responsabilidades."
          },
          {
            "type": "p",
            "text": "También rediseñé cómo se visualizan los permisos e hice los roles configurables, de modo que se puedan crear nuevos roles según las necesidades."
          },
          {
            "type": "p",
            "text": "Esto eliminó la necesidad de que los Super Admins cambiaran repetidamente de interfaz por rol para acceder a distintas partes de la plataforma."
          },
          {
            "type": "label",
            "text": "Por qué importó"
          },
          {
            "type": "p",
            "text": "La decisión simplificó la experiencia administrativa y estableció una arquitectura de producto más escalable."
          },
          {
            "type": "p",
            "text": "En vez de mantener múltiples interfaces con funcionalidad superpuesta, BuildWithin podía sostener distintas responsabilidades con un sistema compartido."
          },
          {
            "type": "callout",
            "text": "La complejidad de los permisos quedó dentro de la plataforma y no se convirtió en una carga de navegación para las personas usuarias."
          }
        ]
      },
      {
        "id": "decision-2",
        "label": "02 · Elegibilidad",
        "title": "02 — Hacer configurables los requisitos de elegibilidad",
        "blocks": [
          {
            "type": "label",
            "text": "El desafío"
          },
          {
            "type": "p",
            "text": "Las organizaciones necesitaban definir requisitos de elegibilidad distintos según sus programas y obligaciones regulatorias."
          },
          {
            "type": "p",
            "text": "En los flujos ligados a WIOA, esos requisitos podían incluir información personal, documentos de respaldo, condiciones de empleo y umbrales de ingreso del hogar."
          },
          {
            "type": "p",
            "text": "No todos los documentos seguían las mismas reglas de validación. Algunos exigían revisar el vencimiento, y otros necesitaban períodos de vigencia configurables según cuándo se emitió el documento o cuándo ocurrió un evento determinado."
          },
          {
            "type": "p",
            "text": "La primera versión del flujo asumió que una lista fija de documentos por categoría alcanzaba para todas las organizaciones. La UX research mostró que no: cada organización cliente aceptaba distintos documentos válidos por categoría y aplicaba sus propias reglas."
          },
          {
            "type": "callout",
            "text": "Un formulario fijo no habría podido acomodar estas diferencias."
          },
          {
            "type": "label",
            "text": "La decisión"
          },
          {
            "type": "p",
            "text": "Diseñé una experiencia de elegibilidad configurable, organizada en tres áreas:"
          },
          {
            "type": "list",
            "items": [
              "Application Fields: permitía a las personas administradoras definir la información que debían entregar los candidatos.",
              "Required Documents: permitía a las organizaciones elegir la documentación aceptable por categoría y configurar requisitos por documento, incluidos períodos de vigencia como 30, 60 o 90 días.",
              "Income Eligibility Rules: admitía límites de ingreso del hogar configurables según el tamaño de la familia."
            ]
          },
          {
            "type": "p",
            "text": "Para manejar las excepciones por documento, introduje controles de configuración contextuales que muestran ajustes adicionales solo cuando son relevantes."
          },
          {
            "type": "p",
            "text": "Así, quienes administran podían gestionar distintas condiciones de elegibilidad sin recorrer un formulario innecesariamente complejo."
          },
          {
            "type": "label",
            "text": "Por qué importó"
          },
          {
            "type": "p",
            "text": "Las organizaciones podían configurar sus requisitos de elegibilidad con una experiencia administrativa consistente, en vez de depender de interfaces distintas para cada tipo de documento."
          },
          {
            "type": "p",
            "text": "El patrón de configuración se validó con pruebas de usabilidad, y la estructura de fondo siguió siendo lo bastante flexible para acomodar requisitos adicionales."
          }
        ]
      },
      {
        "id": "decision-3",
        "label": "03 · Verificación",
        "title": "03 — Convertir la verificación de elegibilidad en un flujo accionable",
        "blocks": [
          {
            "type": "label",
            "text": "El desafío"
          },
          {
            "type": "p",
            "text": "Los Case Managers necesitaban monitorear a los candidatos durante todo el proceso de elegibilidad, identificar solicitudes incompletas, revisar la documentación y determinar cuándo era necesario intervenir."
          },
          {
            "type": "p",
            "text": "La elegibilidad no era simplemente un estado binario. Un candidato podía estar preparando su solicitud, esperando entregar documentos, preaprobado o requerir revisión adicional. El vencimiento de documentos y la información incompleta agregaban más complejidad."
          },
          {
            "type": "callout",
            "text": "Un único indicador de elegibilidad no daba contexto suficiente para manejar estas situaciones."
          },
          {
            "type": "label",
            "text": "La decisión"
          },
          {
            "type": "p",
            "text": "Diseñé una experiencia de revisión progresiva que conecta las tablas de gestión de candidatos, los estados de elegibilidad y la verificación a nivel de documento."
          },
          {
            "type": "p",
            "text": "La tabla principal de candidatos mostraba badges de elegibilidad, para que los Case Managers entendieran el avance de cada solicitud sin abrir cada ficha."
          },
          {
            "type": "p",
            "text": "Cada estado comunicaba una situación y una posible acción distintas:"
          },
          {
            "type": "list",
            "items": [
              "Not Started: identificar candidatos que no habían comenzado el proceso de elegibilidad.",
              "In Progress: monitorear solicitudes incompletas e identificar candidatos que podrían necesitar ayuda.",
              "Pre-approved: identificar solicitudes listas para revisión y aprobación humana.",
              "Needs Review: destacar información o documentos que requieren verificación adicional.",
              "Ineligible / Expired: identificar casos en que documentación antes válida había vencido y requería renovación."
            ]
          },
          {
            "type": "p",
            "text": "Al seleccionar un candidato se abría una vista previa detallada con información resumida y una sección de Elegibilidad."
          },
          {
            "type": "p",
            "text": "En esa sección, categorías de elegibilidad desplegables mostraban cada requisito de verificación, indicadores de avance y los documentos de respaldo."
          },
          {
            "type": "p",
            "text": "Los Case Managers podían inspeccionar los archivos subidos y revisar la información usada para evaluar cada requisito."
          },
          {
            "type": "p",
            "text": "La experiencia también incorporó procesamiento de documentos asistido por IA para extraer información relevante y completar los registros de los candidatos."
          },
          {
            "type": "label",
            "text": "Por qué importó"
          },
          {
            "type": "p",
            "text": "El diseño conectó la verificación automatizada con la decisión humana."
          },
          {
            "type": "p",
            "text": "En lugar de presentar la elegibilidad como un resultado aislado, la interfaz ayudó a los Case Managers a entender el avance de cada solicitud, identificar excepciones y tomar la acción adecuada."
          },
          {
            "type": "callout",
            "text": "El objetivo era hacer más transparentes y manejables los flujos de verificación complejos, sin quitar la supervisión humana."
          }
        ]
      },
      {
        "id": "decision-4",
        "label": "04 · Design system",
        "title": "04 — Construir consistencia con patrones de diseño reutilizables",
        "blocks": [
          {
            "type": "label",
            "text": "El desafío"
          },
          {
            "type": "p",
            "text": "La plataforma debía sostener distintos flujos administrativos manteniendo la consistencia entre módulos y roles."
          },
          {
            "type": "p",
            "text": "Algunas interacciones, como tablas de datos, navegación, formularios y tarjetas de resumen, podían reutilizarse en todo el producto. Otras, en particular la verificación de documentos y la configuración de elegibilidad, requerían componentes especializados."
          },
          {
            "type": "label",
            "text": "La decisión"
          },
          {
            "type": "p",
            "text": "Usé shadcn/ui como base de un sistema de componentes compartido y lo extendí con patrones a la medida de los requisitos enterprise de BuildWithin."
          },
          {
            "type": "p",
            "text": "Los componentes reutilizables sostenían interacciones comunes como gestión de datos, navegación, comunicación de estados y resúmenes de información."
          },
          {
            "type": "p",
            "text": "Para los flujos de elegibilidad diseñé componentes especializados para vistas previas de documentos, estados de verificación, requisitos configurables y resúmenes de elegibilidad de candidatos."
          },
          {
            "type": "p",
            "text": "Estos componentes seguían principios de interacción y visuales compartidos, y a la vez acomodaban la complejidad específica de los flujos regulados."
          },
          {
            "type": "label",
            "text": "Por qué importó"
          },
          {
            "type": "p",
            "text": "El design system dio consistencia a las experiencias administrativas sin obligar a que cada flujo usara componentes genéricos."
          },
          {
            "type": "callout",
            "text": "Sostuvo una plataforma más coherente y permitió que la funcionalidad especializada evolucionara dentro de un lenguaje de diseño compartido."
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
        "text": "Combiné pruebas de usabilidad, entrevistas con clientes, revisiones con stakeholders y prototipado iterativo para evaluar la experiencia administrativa."
      },
      {
        "type": "p",
        "text": "Las pruebas en Maze ayudaron a validar la interfaz de configuración de elegibilidad y confirmaron que el patrón de interacción inicial se entendía sin requerir cambios importantes por usabilidad."
      },
      {
        "type": "p",
        "text": "Una iteración importante surgió después del primer diseño del MVP, cuando el Product Manager y la organización involucrada identificaron requisitos adicionales para la elegibilidad por ingreso del hogar."
      },
      {
        "type": "p",
        "text": "La interfaz debía acomodar límites de ingreso configurables según el tamaño de la familia y darle más protagonismo a esta información dentro de la revisión de elegibilidad."
      },
      {
        "type": "p",
        "text": "Ajusté la jerarquía de la información y reorganicé cómo se presentaban los requisitos de ingreso, los documentos de respaldo y los estados de verificación."
      },
      {
        "type": "callout",
        "text": "Esto dejó clara una distinción importante: no toda iteración de diseño nace de un problema de usabilidad. Algunas surgen porque el producto debe acomodar nuevos requisitos operativos sin perder la coherencia de la experiencia."
      }
    ]
  },
  {
    "id": "outcome",
    "label": "Resultado y aprendizajes",
    "title": "Resultado y aprendizajes",
    "blocks": [
      {
        "type": "p",
        "text": "El proyecto estableció una base de diseño unificada para la plataforma de administración enterprise de BuildWithin, que sostiene múltiples contextos organizacionales, seis roles de usuario y flujos complejos de gestión de fuerza laboral."
      },
      {
        "type": "p",
        "text": "La experiencia reunió permisos por rol, requisitos de elegibilidad configurables, verificación documental asistida por IA y patrones de diseño reutilizables."
      },
      {
        "type": "subtitle",
        "text": "Aprendizajes"
      },
      {
        "type": "p",
        "text": "El aporte más importante fue cuestionar el supuesto de que distintos roles de usuario requerían distintas experiencias de plataforma."
      },
      {
        "type": "p",
        "text": "Al diseñar en torno a flujos compartidos y acceso controlado a la información, ayudé a establecer un enfoque más escalable para la arquitectura de producto enterprise."
      },
      {
        "type": "p",
        "text": "El proyecto también reforzó la importancia de hacer comprensibles los sistemas operativos complejos sin simplificar de más sus requisitos de fondo."
      },
      {
        "type": "callout",
        "text": "El gran diseño enterprise no consiste en quitar la complejidad, sino en organizarla para que las personas se concentren en sus responsabilidades en vez de navegar el sistema."
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
        "text": "BuildWithin needed to evolve its workforce management platform to support organizations managing training programs, employment opportunities, candidate eligibility, and participant progress."
      },
      {
        "type": "p",
        "text": "The platform served organizations with different operational requirements, including workforce development programs governed by WIOA eligibility criteria."
      },
      {
        "type": "p",
        "text": "It also needed to accommodate six distinct user roles (Super Admin, Organization Admin, Talent Manager, Case Manager, Employer, and internal Staff), each with different responsibilities and information access."
      },
      {
        "type": "p",
        "text": "Each role had its own separate platform experience, and Super Admins switched between them through a selector in the sidebar. Administrators working across multiple organizations also had to navigate between organizational contexts."
      },
      {
        "type": "p",
        "text": "As the platform expanded, this approach introduced unnecessary navigation complexity and made the experience increasingly difficult to scale."
      }
    ]
  },
  {
    "id": "solution",
    "label": "Solution",
    "title": "Solution",
    "blocks": [
      {
        "type": "p",
        "text": "I designed a unified enterprise experience built around shared workflows, role-based permissions, and configurable organizational settings."
      },
      {
        "type": "p",
        "text": "Instead of creating separate platform experiences for each role, the solution established a common interface where access to information and functionality was determined by permissions."
      },
      {
        "type": "p",
        "text": "I consolidated what used to be six separate platform experiences into one platform, changed how permissions are visualized, and made roles configurable so new roles can be created as needs require."
      },
      {
        "type": "p",
        "text": "Super Admins could access information across roles without repeatedly switching between different interfaces, while other users saw only the information and actions relevant to their responsibilities."
      },
      {
        "type": "p",
        "text": "The platform also introduced configurable eligibility workflows, AI-assisted document verification, and reusable components that supported consistent experiences across administrative modules."
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
        "text": "As Senior Product Designer, I led the end-to-end design of the administrative experience over six months."
      },
      {
        "type": "p",
        "text": "My responsibilities included product architecture, user flows, complex enterprise interactions, high-fidelity interfaces, reusable components, prototyping, and usability validation."
      },
      {
        "type": "p",
        "text": "I collaborated with BuildWithin's CEO, Product Managers, Engineering, Customer Success, and clients to understand operational requirements and translate them into scalable product experiences."
      },
      {
        "type": "p",
        "text": "Beyond designing interfaces, I challenged the proposed multi-platform approach and advocated for a unified architecture based on role-specific permissions."
      }
    ]
  },
  {
    "id": "challenge",
    "label": "Challenge",
    "title": "Challenge",
    "blocks": [
      {
        "type": "subtitle",
        "text": "Supporting complexity without multiplying interfaces"
      },
      {
        "type": "p",
        "text": "BuildWithin needed to accommodate different organizations, administrative responsibilities, and regulatory requirements within the same product."
      },
      {
        "type": "p",
        "text": "The initial direction considered separate platform experiences for different roles."
      },
      {
        "type": "p",
        "text": "However, administrators often needed information that crossed those boundaries. A Super Admin, for example, needed visibility into the same operational information available to Case Managers and other administrative roles."
      },
      {
        "type": "p",
        "text": "At the same time, organizations needed to configure their own eligibility requirements, documents, and workflows without depending on custom development for every variation."
      },
      {
        "type": "callout",
        "text": "The challenge was to create an experience flexible enough to support these differences while remaining understandable, consistent, and scalable."
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
        "text": "Understanding the existing platform and its users"
      },
      {
        "type": "p",
        "text": "I began by conducting an in-depth analysis of the existing product alongside the CEO and Product Managers."
      },
      {
        "type": "p",
        "text": "We examined the platform's navigation, administrative workflows, and the challenges introduced by its role-switching model."
      },
      {
        "type": "p",
        "text": "Working with Customer Success, we also identified clients for interviews to better understand how organizations used the platform in their daily operations."
      },
      {
        "type": "p",
        "text": "These conversations focused on recurring tasks, information needs, responsibilities, and the difficulties administrators encountered when managing candidates and programs."
      },
      {
        "type": "subtitle",
        "text": "From research to product architecture"
      },
      {
        "type": "p",
        "text": "The findings informed the exploration of a unified experience built around shared navigation, permissions, and configurable workflows."
      },
      {
        "type": "p",
        "text": "I mapped administrative journeys, defined information hierarchies, and explored interaction patterns for complex tasks such as eligibility configuration and candidate verification."
      },
      {
        "type": "p",
        "text": "Using Figma, I developed prototypes and high-fidelity interfaces, working iteratively with Product and Engineering to address technical and operational requirements."
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
        "label": "01 · One platform",
        "title": "01 — One platform instead of multiple role-based experiences",
        "blocks": [
          {
            "type": "label",
            "text": "The challenge"
          },
          {
            "type": "p",
            "text": "The existing platform was split into separate role-specific experiences, and Super Admins switched between them using an avatar selector in the sidebar."
          },
          {
            "type": "p",
            "text": "This created unnecessary navigation complexity, especially when administrators needed information across multiple roles or organizations."
          },
          {
            "type": "p",
            "text": "The initial product direction considered maintaining separate experiences for each role."
          },
          {
            "type": "label",
            "text": "The decision"
          },
          {
            "type": "p",
            "text": "I challenged this approach and proposed a unified platform based on role-based access and permissions."
          },
          {
            "type": "p",
            "text": "Rather than duplicating interfaces, the platform would share the same underlying structure and workflows."
          },
          {
            "type": "p",
            "text": "Super Admins would have comprehensive visibility across administrative functions, while other roles would have restricted access to specific information and actions according to their responsibilities."
          },
          {
            "type": "p",
            "text": "I also redesigned how permissions are visualized and made roles configurable, so new roles can be created as needs require."
          },
          {
            "type": "p",
            "text": "This removed the need for Super Admins to repeatedly switch between role-specific interfaces to access different parts of the platform."
          },
          {
            "type": "label",
            "text": "Why it mattered"
          },
          {
            "type": "p",
            "text": "The decision simplified the administrative experience while establishing a more scalable product architecture."
          },
          {
            "type": "p",
            "text": "Instead of maintaining multiple interfaces with overlapping functionality, BuildWithin could support different responsibilities through a shared system."
          },
          {
            "type": "callout",
            "text": "The complexity of permissions remained within the platform rather than becoming a navigation burden for users."
          }
        ]
      },
      {
        "id": "decision-2",
        "label": "02 · Eligibility",
        "title": "02 — Making eligibility requirements configurable",
        "blocks": [
          {
            "type": "label",
            "text": "The challenge"
          },
          {
            "type": "p",
            "text": "Organizations needed to define different eligibility requirements depending on their programs and regulatory obligations."
          },
          {
            "type": "p",
            "text": "For WIOA-related workflows, these requirements could include personal information, supporting documents, employment conditions, and household income thresholds."
          },
          {
            "type": "p",
            "text": "Not every document followed the same validation rules. Some required expiration checks, while others needed configurable validity periods based on when the document was issued or when a particular event occurred."
          },
          {
            "type": "p",
            "text": "The first version of the flow assumed a fixed document list per category would work for every organization. UX research showed it didn't: each client organization accepted different valid documents per category and applied its own rules."
          },
          {
            "type": "callout",
            "text": "Designing a fixed form would not accommodate these differences."
          },
          {
            "type": "label",
            "text": "The decision"
          },
          {
            "type": "p",
            "text": "I designed a configurable eligibility experience organized around three areas:"
          },
          {
            "type": "list",
            "items": [
              "Application Fields allowed administrators to define the information candidates needed to provide.",
              "Required Documents enabled organizations to select acceptable documentation by category and configure document-specific requirements, including validity periods such as 30, 60, or 90 days.",
              "Income Eligibility Rules supported configurable household income limits based on family size."
            ]
          },
          {
            "type": "p",
            "text": "To manage document-specific exceptions, I introduced contextual configuration controls that exposed additional settings only when relevant."
          },
          {
            "type": "p",
            "text": "This allowed administrators to manage different eligibility conditions without navigating an unnecessarily complex form."
          },
          {
            "type": "label",
            "text": "Why it mattered"
          },
          {
            "type": "p",
            "text": "Organizations could configure eligibility requirements through a consistent administrative experience rather than relying on separate interfaces for different document types."
          },
          {
            "type": "p",
            "text": "The configuration pattern was validated through usability testing, while the underlying structure remained flexible enough to accommodate additional requirements."
          }
        ]
      },
      {
        "id": "decision-3",
        "label": "03 · Verification",
        "title": "03 — Turning eligibility verification into an actionable workflow",
        "blocks": [
          {
            "type": "label",
            "text": "The challenge"
          },
          {
            "type": "p",
            "text": "Case Managers needed to monitor candidates throughout the eligibility process, identify incomplete applications, review documentation, and determine when intervention was necessary."
          },
          {
            "type": "p",
            "text": "Eligibility was not simply a binary status. Candidates could be preparing their applications, waiting to provide documents, pre-approved, or require additional review. Document expiration and incomplete information introduced further complexity."
          },
          {
            "type": "callout",
            "text": "A single eligibility indicator would not provide enough context to manage these situations effectively."
          },
          {
            "type": "label",
            "text": "The decision"
          },
          {
            "type": "p",
            "text": "I designed a progressive review experience connecting candidate management tables, eligibility statuses, and document-level verification."
          },
          {
            "type": "p",
            "text": "The main candidate table displayed eligibility badges, allowing Case Managers to understand application progress without opening every candidate record."
          },
          {
            "type": "p",
            "text": "Each status communicated a different situation and potential action:"
          },
          {
            "type": "list",
            "items": [
              "Not Started: Identify candidates who had not begun the eligibility process.",
              "In Progress: Monitor incomplete applications and identify candidates who might need assistance.",
              "Pre-approved: Identify applications ready for human review and approval.",
              "Needs Review: Highlight information or documents requiring additional verification.",
              "Ineligible / Expired: Identify cases where previously valid documentation had expired and required renewal."
            ]
          },
          {
            "type": "p",
            "text": "Selecting a candidate opened a detailed preview containing summary information and an Eligibility section."
          },
          {
            "type": "p",
            "text": "Within this section, expandable eligibility categories displayed individual verification requirements, completion indicators, and supporting documents."
          },
          {
            "type": "p",
            "text": "Case Managers could inspect uploaded files and review the information used to evaluate each requirement."
          },
          {
            "type": "p",
            "text": "The experience also incorporated AI-assisted document processing to extract relevant information and populate candidate records."
          },
          {
            "type": "label",
            "text": "Why it mattered"
          },
          {
            "type": "p",
            "text": "The design connected automated verification with human decision-making."
          },
          {
            "type": "p",
            "text": "Rather than presenting eligibility as an isolated result, the interface helped Case Managers understand application progress, identify exceptions, and take appropriate action."
          },
          {
            "type": "callout",
            "text": "The goal was to make complex verification workflows more transparent and manageable without removing human oversight."
          }
        ]
      },
      {
        "id": "decision-4",
        "label": "04 · Design system",
        "title": "04 — Building consistency through reusable design patterns",
        "blocks": [
          {
            "type": "label",
            "text": "The challenge"
          },
          {
            "type": "p",
            "text": "The platform needed to support different administrative workflows while maintaining consistency across modules and roles."
          },
          {
            "type": "p",
            "text": "Some interactions, such as data tables, navigation, forms, and summary cards, could be reused throughout the product. Others, particularly document verification and eligibility configuration, required specialized components."
          },
          {
            "type": "label",
            "text": "The decision"
          },
          {
            "type": "p",
            "text": "I used shadcn/ui as a foundation for a shared component system, extending it with patterns tailored to BuildWithin's enterprise requirements."
          },
          {
            "type": "p",
            "text": "Reusable components supported common interactions such as data management, navigation, status communication, and information summaries."
          },
          {
            "type": "p",
            "text": "For eligibility workflows, I designed specialized components for document previews, verification states, configurable requirements, and candidate eligibility summaries."
          },
          {
            "type": "p",
            "text": "These components followed shared interaction and visual principles while accommodating the specific complexity of regulated workflows."
          },
          {
            "type": "label",
            "text": "Why it mattered"
          },
          {
            "type": "p",
            "text": "The design system provided consistency across administrative experiences without forcing every workflow into generic components."
          },
          {
            "type": "callout",
            "text": "It supported a more coherent platform while allowing specialized functionality to evolve within a shared design language."
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
        "text": "I combined usability testing, client interviews, stakeholder reviews, and iterative prototyping to evaluate the administrative experience."
      },
      {
        "type": "p",
        "text": "Maze testing helped validate the eligibility configuration interface, confirming that the initial interaction pattern was understandable without requiring significant usability-driven changes."
      },
      {
        "type": "p",
        "text": "One important iteration emerged after the first MVP design, when the Product Manager and the organization involved identified additional requirements for household income eligibility."
      },
      {
        "type": "p",
        "text": "The interface needed to accommodate configurable income limits based on family size and give this information greater prominence within the eligibility review experience."
      },
      {
        "type": "p",
        "text": "I adjusted the information hierarchy, reorganizing how income requirements, supporting documents, and verification statuses were presented."
      },
      {
        "type": "callout",
        "text": "This highlighted an important distinction: not every design iteration comes from a usability problem. Some emerge because the product must accommodate new operational requirements while preserving a coherent experience."
      }
    ]
  },
  {
    "id": "outcome",
    "label": "Outcome & learnings",
    "title": "Outcome & learnings",
    "blocks": [
      {
        "type": "p",
        "text": "The project established a unified design foundation for BuildWithin's enterprise administration platform, supporting multiple organizational contexts, six user roles, and complex workforce management workflows."
      },
      {
        "type": "p",
        "text": "The experience brought together role-based permissions, configurable eligibility requirements, AI-assisted document verification, and reusable design patterns."
      },
      {
        "type": "subtitle",
        "text": "Learnings"
      },
      {
        "type": "p",
        "text": "The most important contribution was challenging the assumption that different user roles required different platform experiences."
      },
      {
        "type": "p",
        "text": "By designing around shared workflows and controlled access to information, I helped establish a more scalable approach to enterprise product architecture."
      },
      {
        "type": "p",
        "text": "The project also reinforced the importance of making complex operational systems understandable without oversimplifying their underlying requirements."
      },
      {
        "type": "callout",
        "text": "Great enterprise design isn't about removing complexity. It's about organizing it so people can focus on their responsibilities instead of navigating the system."
      }
    ]
  }
];


export const buildwithinSuperAdmin: Project = {
  slug: "buildwithin-superadmin",
  title: "Superadmin: configurable, AI-assisted eligibility for Workforce programs",
  category: "Plataforma enterprise para programas Workforce",
  tag: "product design · enterprise saas · ai-powered ops",
  subtitle: "Plataforma Enterprise para gestionar programas Workforce con IA",
  client: "BuildWithin",
  role: "Senior Product Designer (Contractor)",
  year: "2025",
  result:
    "Una plataforma unificada que consolidó seis experiencias separadas por rol en un solo ecosistema Enterprise configurable, con permisos por rol, flujos de elegibilidad configurables y verificación documental asistida por IA",
  metrics: [
    { value: "6", label: "Perfiles de usuario distintos soportados", labelEn: "Distinct user roles supported" },
    { value: "6 meses", valueEn: "6 months", label: "Duración de la transformación completa", labelEn: "Full transformation timeline" },
    {
      value: "Design System",
      valueEn: "Design System",
      label: "Sobre shadcn/ui, extendido para toda la plataforma",
      labelEn: "Built on shadcn/ui, extended across the whole platform",
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
    "BuildWithin Admin Platform es el sistema Enterprise que administra el ciclo completo de programas Workforce — configuración, elegibilidad, aprendizaje y operación — para gobiernos, organizaciones y centros de capacitación. La plataforma original de BuildWithin estaba pensada para otro modelo de negocio; la evolucionamos hacia un producto Workforce que debía soportar seis perfiles de usuario distintos (Super Admin, Organization Admin, Talent Manager, Case Manager, Employer, Staff interno), cada uno con permisos, herramientas y flujos propios. Como Senior Product Designer (Contractor) lideré esta transformación completa durante 6 meses: definí la experiencia de producto de principio a fin, diseñé las funcionalidades principales, construí el Design System, y validé cada decisión junto con Product, la CEO y los stakeholders — sin perder de vista que cada organización cliente tiene reglas de negocio completamente distintas entre sí.",
  strategy: sectionsToStrategy(sectionsEs),
  sections: sectionsEs,
  decision: {
    "problem": "La plataforma de BuildWithin estaba dividida en experiencias separadas para cada uno de sus seis roles, lo que sumaba complejidad de navegación y dificultaba escalar entre organizaciones.",
    "solution": "Una plataforma enterprise unificada y configurable, con permisos por rol y flujos de elegibilidad configurables.",
    "did": "Lideré el diseño end-to-end de la experiencia administrativa durante seis meses, desde la arquitectura de producto hasta los componentes reutilizables y la validación de usabilidad.",
    "result": "Una base de diseño unificada que sostiene múltiples organizaciones, seis roles de usuario y verificación de elegibilidad asistida por IA."
  },
  badges: [
    "SaaS Enterprise",
    "Workforce",
    "Permisos por rol",
    "Roles configurables",
    "Flujos configurables",
    "Verificación asistida por IA",
    "Design system",
    "Arquitectura UX",
  ],
  tools: [
    { name: "Figma", use: "Prototipos e interfaces de alta fidelidad" },
    { name: "Maze", use: "Pruebas de usabilidad de la configuración de elegibilidad" },
    { name: "shadcn/ui", use: "Base del sistema de componentes compartido" },
  ],
  digitalPresence: {
    heading: "Impacto",
    headingEn: "Impact",
    stats: [
      { title: "Roles de usuario soportados", titleEn: "User roles supported", value: "6", valueEn: "6", detail: "Dentro de una experiencia de plataforma unificada.", detailEn: "Within a unified platform experience." },
      { title: "Arquitectura unificada por rol", titleEn: "Unified role-based architecture", value: "1 plataforma", valueEn: "1 platform", detail: "Diseñada para eliminar la navegación innecesaria entre interfaces separadas por rol.", detailEn: "Designed to eliminate unnecessary navigation between separate role-specific interfaces." },
      { title: "Flujos de elegibilidad configurables", titleEn: "Configurable eligibility workflows", value: "Configurable", valueEn: "Configurable", detail: "Con documentación, umbrales de ingreso y requisitos de elegibilidad propios de cada organización.", detailEn: "Supporting organization-specific documentation, income thresholds, and eligibility requirements." },
      { title: "Verificación documental asistida por IA", titleEn: "AI-assisted document verification", value: "IA + humano", valueEn: "AI + human", detail: "Combina extracción automática de información con revisión humana.", detailEn: "Combining automated information extraction with human review." },
      { title: "Design system compartido", titleEn: "Shared design system", value: "shadcn/ui", valueEn: "shadcn/ui", detail: "Patrones reutilizables en los flujos enterprise.", detailEn: "Providing reusable patterns across enterprise workflows." },
    ],
    note: "Alcance y capacidades del producto.",
    noteEn: "Scope and capabilities of the product.",
  },
  secondaryFeatureIds: ["pathways-learning-management", "candidate-360"],
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
    category: "Enterprise Workforce Program Platform",
    tag: "product design · enterprise saas · ai-powered ops",
    subtitle: "Enterprise platform for running Workforce programs with AI",
    result:
      "A unified platform that consolidated six separate role-based experiences into one configurable Enterprise ecosystem, with role-based permissions, configurable eligibility workflows, and AI-assisted document verification",
    services: "Product Design · Design System · Enterprise product strategy",
    skills: ["Figma", "Maze", "Design Systems", "Enterprise UX", "AI-powered workflows", "Prototyping", "Stakeholder Management"],
    brief:
      "BuildWithin Admin Platform is the Enterprise system that runs the full lifecycle of Workforce programs — configuration, eligibility, learning, and operations — for governments, organizations, and training centers. BuildWithin's original platform was built for a different business model; we evolved it into a Workforce product that had to support six distinct user profiles (Super Admin, Organization Admin, Talent Manager, Case Manager, Employer, internal Staff), each with its own permissions, tools, and flows. As Senior Product Designer (Contractor) I led this full transformation over 6 months: defined the end-to-end product experience, designed the core features, built the Design System, and validated every decision alongside Product, the CEO, and stakeholders — without losing sight of the fact that every client organization runs on completely different business rules.",
    strategy: sectionsToStrategy(sectionsEn),
    sections: sectionsEn,
    decision: {
      "problem": "BuildWithin's platform was split into separate experiences for each of its six roles, adding navigation complexity and making it hard to scale across organizations.",
      "solution": "One unified, configurable enterprise platform with role-based permissions and configurable eligibility workflows.",
      "did": "I led the end-to-end design of the administrative experience over six months, from product architecture to reusable components and usability validation.",
      "result": "A unified design foundation supporting multiple organizations, six user roles, and AI-assisted eligibility verification."
    },
    badges: [
      "Enterprise SaaS",
      "Workforce",
      "Role-based permissions",
      "Configurable roles",
      "Configurable workflows",
      "AI-assisted verification",
      "Design system",
      "UX architecture",
    ],
    tools: [
      { name: "Figma", use: "Prototypes and high-fidelity interfaces" },
      { name: "Maze", use: "Usability testing of the eligibility configuration" },
      { name: "shadcn/ui", use: "Foundation of the shared component system" },
    ],
    headline: "configure, don't code",
  },
};
