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
    weight: 24,
    skills: [
      { id: 'test-design', name: 'Diseño de casos de prueba' },
      { id: 'exploratory-testing', name: 'Testing exploratorio' },
      { id: 'defect-reporting', name: 'Gestión y reporte de defectos' }
    ]
  },
  {
    id: 'automation',
    name: 'Automatización',
    weight: 28,
    skills: [
      { id: 'ui-automation', name: 'Automatización UI' },
      { id: 'api-automation', name: 'Automatización API' },
      { id: 'test-frameworks', name: 'Diseño de frameworks de pruebas' }
    ]
  },
  {
    id: 'cicd',
    name: 'CI/CD y Calidad en pipeline',
    weight: 18,
    skills: [
      { id: 'pipeline-integration', name: 'Integración de pruebas en pipeline' },
      { id: 'quality-gates', name: 'Quality gates y métricas de calidad' },
      { id: 'env-management', name: 'Gestión de entornos de prueba' }
    ]
  },
  {
    id: 'analytics',
    name: 'Analítica y Observabilidad',
    weight: 15,
    skills: [
      { id: 'kpi-definition', name: 'Definición de KPIs de calidad' },
      { id: 'dashboarding', name: 'Dashboards y seguimiento' },
      { id: 'log-analysis', name: 'Análisis de logs y trazas' }
    ]
  },
  {
    id: 'performance',
    name: 'Performance',
    weight: 15,
    skills: [
      { id: 'load-testing', name: 'Pruebas de carga' },
      { id: 'bottleneck-analysis', name: 'Análisis de cuellos de botella' },
      { id: 'performance-monitoring', name: 'Monitorización de performance' }
    ]
  }
];
