# QASkillsMap

Servicio web local para mapear skills QA por áreas, asignar nivel de dominio y obtener una ficha tipo FIFA con fortalezas y debilidades.

## Qué incluye

- Áreas de QA hardcodeadas en código (manual, automatización, CI/CD, analítica y performance).
- Skills por área con niveles de 0 a 4.
- Sistema de pesos para que el máximo global sea **100 puntos**.
- Ficha de resultado con score global, detalle por área, top fortalezas y debilidades.
- Persistencia local con `localStorage`.
- Exportación e importación de perfil en JSON.

## Uso local

```bash
npm install
npm start
```

Después abre `http://localhost:3000`.

## Configuración de áreas y skills

Edita `src/skills-data.js` para ajustar:

- áreas funcionales,
- skills,
- peso de cada área,
- niveles de dominio.
