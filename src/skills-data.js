export const LEVELS = [
  { value: 0, label: '0 - Sin experiencia', factor: 0 },
  { value: 1, label: '1 - Básico', factor: 0.25 },
  { value: 2, label: '2 - Intermedio', factor: 0.5 },
  { value: 3, label: '3 - Avanzado', factor: 0.75 },
  { value: 4, label: '4 - Referente', factor: 1 }
];

export const SKILL_AREAS = [
  {
    id: 'manual-testing',
    name: 'Testing Manual',
    chartLabel: 'Testing\nManual',
    weight: 15,
    skills: [
      {
        id: 'test-design',
        name: 'Diseño de casos de prueba',
        weight: 4,
        levelDescriptions: [
          'No conoces técnicas de diseño de tests.',
          'Conoces pruebas básicas funcionales y caja negra.',
          'Aplicas partición de equivalencia, valores límite y tablas de decisión.',
          'Dominas técnicas avanzadas (pairwise, grafos de causa-efecto) y criterios de cobertura.',
          'Defines la estrategia de diseño del equipo y formas a otros en técnicas avanzadas.'
        ]
      },
      {
        id: 'exploratory-testing',
        name: 'Testing exploratorio',
        weight: 4,
        levelDescriptions: [
          'No has practicado testing exploratorio estructurado.',
          'Exploras la aplicación de forma libre y documentas hallazgos básicos.',
          'Usas sesiones SBET, charters y heurísticas (HICCUPPS, FCC).',
          'Diseñas tours y estrategias de exploración, detectas riesgos latentes.',
          'Lideras sesiones de exploración en equipo y creas metodologías propias.'
        ]
      },
      {
        id: 'defect-reporting',
        name: 'Reporte y gestión de defectos',
        weight: 4,
        levelDescriptions: [
          'No sabes cómo documentar bugs de forma efectiva.',
          'Creas tickets básicos con descripción y pasos reproducibles.',
          'Incluyes entorno, evidencias, severidad correcta y pasos mínimos.',
          'Analizas causa raíz, priorizas con criterio y haces seguimiento hasta cierre.',
          'Defines el proceso de defect management del equipo y métricas de bug leakage.'
        ]
      },
      {
        id: 'regression-testing',
        name: 'Testing de regresión',
        weight: 3,
        levelDescriptions: [
          'No has gestionado ciclos de regresión.',
          'Ejecutas suites de regresión existentes siguiendo instrucciones.',
          'Seleccionas casos de regresión relevantes según el impacto del cambio.',
          'Diseñas estrategias de regresión selectiva y smoke testing automatizado.',
          'Optimizas el portfolio de regresión con cobertura basada en riesgo y datos.'
        ]
      }
    ]
  },
  {
    id: 'automation',
    name: 'Automatización',
    chartLabel: 'Auto-\nmatización',
    weight: 20,
    skills: [
      {
        id: 'ui-automation',
        name: 'Automatización UI / E2E',
        weight: 6,
        levelDescriptions: [
          'No has escrito tests de interfaz automatizados.',
          'Has ejecutado o modificado tests E2E existentes.',
          'Escribes tests E2E usando locators robustos y aserciones.',
          'Diseñas Page Object Model, manejas waits dinámicos y paralelización.',
          'Arquitecturas cross-browser, estrategias anti-flakiness y mantenimiento a escala.'
        ]
      },
      {
        id: 'api-automation',
        name: 'Automatización de APIs',
        weight: 5,
        levelDescriptions: [
          'No has automatizado pruebas de API.',
          'Conoces los conceptos REST y has ejecutado colecciones existentes.',
          'Escribes tests de contrato, validación de schema y assertions en response.',
          'Automatizas flujos completos con autenticación, datos dinámicos y ambientes.',
          'Defines estándares de contract testing y cobertura de microservicios en el equipo.'
        ]
      },
      {
        id: 'test-frameworks',
        name: 'Diseño de frameworks de pruebas',
        weight: 5,
        levelDescriptions: [
          'Usas frameworks tal como te los entregan.',
          'Entiendes la estructura básica de un framework existente.',
          'Añades utilidades, fixtures y configuración al framework.',
          'Diseñas frameworks modulares con reporting, retry logic y manejo de datos.',
          'Creas frameworks reutilizables adoptados por múltiples equipos y proyectos.'
        ]
      },
      {
        id: 'bdd',
        name: 'BDD / Gherkin / Cucumber',
        weight: 4,
        levelDescriptions: [
          'No has trabajado con BDD.',
          'Lees y ejecutas escenarios Gherkin existentes.',
          'Escribes escenarios Gherkin bien estructurados y reutilizables.',
          'Diseñas la capa de step definitions, coordinas con negocio los escenarios.',
          'Lideras la adopción de BDD en la organización y facilitas Example Mapping.'
        ]
      }
    ]
  },
  {
    id: 'testing-tools',
    name: 'Herramientas de Testing',
    chartLabel: 'Herram.\nTesting',
    weight: 15,
    skills: [
      {
        id: 'playwright',
        name: 'Playwright',
        weight: 5,
        levelDescriptions: [
          'No has utilizado Playwright.',
          'Has ejecutado tests existentes y conoces la sintaxis básica.',
          'Escribes tests con Page Object Model, capturas de pantalla y vídeo.',
          'Configuras proyectos multi-browser, API testing, traces y reportes avanzados.',
          'Creas fixtures/plugins reutilizables y defines el stack de automatización del equipo.'
        ]
      },
      {
        id: 'selenium',
        name: 'Selenium / WebDriver',
        weight: 3,
        levelDescriptions: [
          'No has usado Selenium o WebDriver.',
          'Ejecutas tests existentes y entiendes el driver pattern.',
          'Escribes tests con WebDriver usando Page Objects y manejo de waits.',
          'Configuras Selenium Grid, integras con CI y manejas casos complejos.',
          'Dominas la arquitectura completa y contribuyes a frameworks corporativos.'
        ]
      },
      {
        id: 'postman',
        name: 'Postman / REST Assured',
        weight: 4,
        levelDescriptions: [
          'No has realizado pruebas de API con estas herramientas.',
          'Ejecutas colecciones existentes en Postman.',
          'Creas colecciones con variables de entorno, assertions y flujos encadenados.',
          'Automatizas colecciones con Newman en CI, gestionas entornos y datos de prueba.',
          'Defines estándares de testing de API para el equipo, integras contract testing.'
        ]
      },
      {
        id: 'cypress',
        name: 'Cypress',
        weight: 3,
        levelDescriptions: [
          'No has utilizado Cypress.',
          'Ejecutas tests existentes y conoces el panel interactivo de Cypress.',
          'Escribes tests E2E con comandos custom, fixtures e intercepción de red.',
          'Configuras multi-entorno, component testing y Cloud Cypress para CI.',
          'Defines la estrategia de testing con Cypress, creas plugins y contribuyes al equipo.'
        ]
      }
    ]
  },
  {
    id: 'cicd',
    name: 'CI/CD y DevOps',
    chartLabel: 'CI/CD y\nDevOps',
    weight: 12,
    skills: [
      {
        id: 'jenkins',
        name: 'Jenkins',
        weight: 3,
        levelDescriptions: [
          'No has trabajado con Jenkins.',
          'Ejecutas jobs existentes y lees logs de CI.',
          'Creas y configuras jobs/pipelines simples con etapas de test.',
          'Diseñas pipelines declarativos con stages, paralelismo y quality gates.',
          'Administras instancias Jenkins, defines pipelines compartidos y plugins corporativos.'
        ]
      },
      {
        id: 'github-actions',
        name: 'GitHub Actions',
        weight: 3,
        levelDescriptions: [
          'No has trabajado con GitHub Actions.',
          'Lees workflows existentes y entiendes el flujo básico.',
          'Creas workflows para ejecutar tests automáticamente en PRs y pushes.',
          'Diseñas workflows con matrices, caché, secretos y actions reutilizables.',
          'Creas actions propias publicadas en Marketplace y defines estándares de CI en la org.'
        ]
      },
      {
        id: 'docker-testing',
        name: 'Docker en Testing',
        weight: 3,
        levelDescriptions: [
          'No has usado Docker en el contexto de testing.',
          'Ejecutas contenedores existentes para levantar entornos de prueba.',
          'Creas Dockerfiles y docker-compose para entornos reproducibles.',
          'Diseñas stacks de test con múltiples servicios, redes y volúmenes.',
          'Defines la estrategia de contenedores para CI/CD y gestionas registries privados.'
        ]
      },
      {
        id: 'quality-gates',
        name: 'Quality Gates y métricas',
        weight: 3,
        levelDescriptions: [
          'No has definido ni gestionado quality gates.',
          'Conoces el concepto y lees reportes de cobertura o análisis estático.',
          'Configuras quality gates básicos (cobertura mínima, 0 errores críticos en SonarQube).',
          'Defines umbrales alineados a riesgo, alertas automáticas y breaking builds.',
          'Diseñas la política de calidad del equipo, OKRs de calidad y cultura shift-left.'
        ]
      }
    ]
  },
  {
    id: 'management-tools',
    name: 'Gestión y Proceso',
    chartLabel: 'Gestión y\nProceso',
    weight: 8,
    skills: [
      {
        id: 'jira-azure-devops',
        name: 'Jira / Azure DevOps',
        weight: 2,
        levelDescriptions: [
          'No has usado Jira o Azure DevOps.',
          'Creas y actualizas tickets básicos (bugs, tasks).',
          'Gestionas sprints, epics y subtareas, usas filtros JQL básicos.',
          'Configuras proyectos, workflows personalizados, dashboards y automatizaciones.',
          'Administras Jira o Azure DevOps a nivel organizacional y defines procesos de gestión de defectos.'
        ]
      },
      {
        id: 'git',
        name: 'Git / Control de versiones',
        weight: 2,
        levelDescriptions: [
          'No has usado Git.',
          'Usas add, commit, push y pull en ramas existentes.',
          'Manejas branches, merges, resolución de conflictos y pull requests.',
          'Dominas rebase, cherry-pick, stash, bisect y estrategias de branching (GitFlow).',
          'Defines la estrategia de versionado del equipo y formas a otros en buenas prácticas.'
        ]
      },
      {
        id: 'agile-qa',
        name: 'QA en metodologías Agile',
        weight: 2,
        levelDescriptions: [
          'No has trabajado en entornos Agile.',
          'Participas en ceremonies (daily, sprint review) y entiendes el flujo de trabajo.',
          'Creas criterios de aceptación, colaboras en refinamiento y gestionas deuda técnica de QA.',
          'Lideras la definición del DoD, promueves shift-left y three amigos.',
          'Diseñas la estrategia de QA ágil en múltiples equipos, coaching a POs y devs.'
        ]
      },
      {
        id: 'documentation',
        name: 'Documentación técnica',
        weight: 2,
        levelDescriptions: [
          'No generas documentación de testing.',
          'Documentas casos de prueba básicos en plantillas estándar.',
          'Creas planes de prueba, estrategias de test y documentas arquitecturas.',
          'Generas documentación viva (living docs) y wikis actualizadas con evidencias.',
          'Defines los estándares de documentación de QA del equipo y los mantienes actualizados.'
        ]
      }
    ]
  },
  {
    id: 'performance',
    name: 'Performance',
    chartLabel: 'Performance',
    weight: 10,
    skills: [
      {
        id: 'load-testing',
        name: 'JMeter / k6 / Gatling',
        weight: 4,
        levelDescriptions: [
          'No has ejecutado pruebas de carga.',
          'Ejecutas scripts de carga existentes y lees resultados básicos (TPS, latencia).',
          'Diseñas escenarios de carga realistas con perfiles de usuario y umbrales.',
          'Analizas cuellos de botella, correlaciones y realizas profiling de la aplicación.',
          'Defines la estrategia de performance del producto, capacity planning y NFRs.'
        ]
      },
      {
        id: 'performance-monitoring',
        name: 'Monitorización de performance',
        weight: 3,
        levelDescriptions: [
          'No has usado herramientas de APM o monitorización.',
          'Lees dashboards de métricas básicas (CPU, memoria, tiempo de respuesta).',
          'Usas herramientas APM (Datadog, New Relic, Grafana) para análisis de anomalías.',
          'Configuras alertas, SLOs/SLAs y correlacionas métricas con incidencias.',
          'Diseñas la estrategia de observabilidad del producto, defines SLIs y error budgets.'
        ]
      },
      {
        id: 'bottleneck-analysis',
        name: 'Análisis de cuellos de botella',
        weight: 3,
        levelDescriptions: [
          'No has analizado problemas de rendimiento.',
          'Identificas tiempos de respuesta lentos mediante logs o trazas básicas.',
          'Usas profilers y analizas queries SQL, timeouts y saturación de recursos.',
          'Aplicas metodología USE/RED, correlacionas síntomas con causas raíz técnicas.',
          'Lideras investigaciones de performance críticas y defines estrategias de optimización.'
        ]
      }
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics y Observabilidad',
    chartLabel: 'Analytics',
    weight: 10,
    skills: [
      {
        id: 'kpi-definition',
        name: 'Definición de KPIs de calidad',
        weight: 4,
        levelDescriptions: [
          'No has definido métricas de calidad de software.',
          'Conoces métricas básicas como tasa de defectos y cobertura de tests.',
          'Defines y mides KPIs relevantes (defect leakage, MTTD, test effectiveness).',
          'Alineas KPIs de calidad con objetivos de negocio y OKRs del producto.',
          'Creas frameworks de medición de calidad para múltiples equipos y productos.'
        ]
      },
      {
        id: 'dashboarding',
        name: 'Dashboards y reporting',
        weight: 3,
        levelDescriptions: [
          'No has creado dashboards de calidad.',
          'Lees e interpretas dashboards existentes de CI/CD o cobertura.',
          'Creas dashboards básicos en Grafana, Jira Dashboards o herramientas similares.',
          'Diseñas dashboards ejecutivos con tendencias, alertas y análisis comparativo.',
          'Implementas data pipelines para dashboards en tiempo real con múltiples fuentes.'
        ]
      },
      {
        id: 'log-analysis',
        name: 'Análisis de logs y trazas',
        weight: 3,
        levelDescriptions: [
          'No has analizado logs de sistemas.',
          'Lees logs de aplicación para entender errores básicos.',
          'Usas herramientas (ELK, Splunk, CloudWatch) para buscar y filtrar eventos.',
          'Creas queries avanzadas, alertas y correlaciones entre servicios distribuidos.',
          'Diseñas la estrategia de logging y tracing distribuido del equipo.'
        ]
      }
    ]
  },
  {
    id: 'accessibility',
    name: 'Accesibilidad',
    chartLabel: 'Accesi-\nbilidad',
    weight: 10,
    skills: [
      {
        id: 'wcag-knowledge',
        name: 'WCAG y cumplimiento normativo',
        weight: 3,
        levelDescriptions: [
          'No conoces pautas de accesibilidad ni estándares WCAG.',
          'Conoces principios básicos (perceptible, operable, comprensible, robusto) y términos comunes.',
          'Aplicas criterios WCAG 2.1 AA en revisiones funcionales y detectas incumplimientos frecuentes.',
          'Interpretas criterios complejos, defines checklists de cumplimiento y acompañas remediaciones.',
          'Lideras la estrategia de accesibilidad, defines políticas de cumplimiento y referencias normativas.'
        ]
      },
      {
        id: 'a11y-manual-testing',
        name: 'Testing manual de accesibilidad',
        weight: 3,
        levelDescriptions: [
          'No has ejecutado pruebas manuales de accesibilidad.',
          'Validas aspectos básicos como contraste, tamaño de fuente y textos alternativos.',
          'Ejecutas pruebas de navegación por teclado, foco visible, estructura de headings y formularios.',
          'Diseñas sesiones de testing a11y por flujos críticos y priorizas hallazgos por impacto en usuarios.',
          'Defines el proceso de testing manual a11y del equipo y entrenas a otros QAs en técnicas avanzadas.'
        ]
      },
      {
        id: 'a11y-automation-tools',
        name: 'Automatización con herramientas a11y',
        weight: 2,
        levelDescriptions: [
          'No has usado herramientas automáticas de accesibilidad.',
          'Ejecutas escaneos puntuales con herramientas como Lighthouse o axe en entornos locales.',
          'Integras checks automáticos de accesibilidad en suites de UI y reportas issues accionables.',
          'Configuras reglas, umbrales y ejecución en CI para prevenir regresiones de accesibilidad.',
          'Diseñas una estrategia híbrida (manual + automatizada) y defines estándares de calidad a11y en la organización.'
        ]
      },
      {
        id: 'assistive-tech-validation',
        name: 'Validación con tecnologías asistivas',
        weight: 2,
        levelDescriptions: [
          'No has validado productos con tecnologías asistivas.',
          'Conoces conceptos de lectores de pantalla y haces pruebas básicas guiadas.',
          'Pruebas flujos con NVDA/VoiceOver y verificas anuncios, landmarks y orden de lectura.',
          'Diagnosticas problemas complejos de ARIA, nombre accesible y comportamiento dinámico del DOM.',
          'Lideras validaciones con usuarios y tecnologías asistivas, y defines criterios de aceptación inclusivos.'
        ]
      }
    ]
  },
  {
    id: 'languages',
    name: 'Lenguajes',
    chartLabel: 'Lenguajes',
    weight: 10,
    skills: [
      {
        id: 'javascript-typescript',
        name: 'JavaScript / TypeScript',
        weight: 3,
        levelDescriptions: [
          'No tienes experiencia con JavaScript o TypeScript.',
          'Entiendes la sintaxis básica: variables, funciones y condicionales.',
          'Manejas promesas/async-await, módulos y puedes escribir tests con Jest/Vitest.',
          'Dominas TypeScript, patrones de diseño aplicados a testing y metaprogramación.',
          'Arquitecturas avanzadas, contribución a librerías de testing y code review de alto nivel.'
        ]
      },
      {
        id: 'python',
        name: 'Python',
        weight: 3,
        levelDescriptions: [
          'No tienes experiencia con Python.',
          'Entiendes la sintaxis básica y puedes leer scripts simples.',
          'Escribes scripts de automatización, tests con pytest y manejo de APIs con requests.',
          'Dominas fixtures, mocking, parametrización avanzada y scripting de datos.',
          'Desarrollas frameworks de testing en Python e integras con data engineering.'
        ]
      },
      {
        id: 'java',
        name: 'Java / Kotlin',
        weight: 2,
        levelDescriptions: [
          'No tienes experiencia con Java o Kotlin.',
          'Entiendes la sintaxis OOP básica y puedes leer código Java.',
          'Escribes tests con JUnit/TestNG, Mockito y configuración Maven/Gradle.',
          'Dominas Spring Boot testing, RestAssured y arquitecturas de test en Java.',
          'Diseñas frameworks empresariales en Java y testing de microservicios.'
        ]
      },
      {
        id: 'sql',
        name: 'SQL y bases de datos',
        weight: 2,
        levelDescriptions: [
          'No tienes experiencia con SQL.',
          'Ejecutas SELECTs básicos y entiendes la estructura de tablas.',
          'Escribes queries con JOINs, subqueries y validaciones de integridad de datos.',
          'Analizas query plans, optimizas consultas y gestionas pruebas de datos en BD.',
          'Defines estrategias de testing de datos, validación de migraciones y testing de DWH.'
        ]
      }
    ]
  }
];
