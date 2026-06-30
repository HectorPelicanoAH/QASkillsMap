import { LEVELS, SKILL_AREAS } from './skills-data.js';
import { calculateScoreDetails, getDefaultSelections, getMaxScore } from './scoring.js';
import { renderRadarChart } from './radar-chart.js';
import { attachTooltip } from './tooltip.js';

const STORAGE_KEY = 'qa-skills-map-profile-v1';

const skillsContainer = document.querySelector('#skills-container');
const scoreValue = document.querySelector('#score-value');
const scoreSubtitle = document.querySelector('#score-subtitle');
const radarContainer = document.querySelector('#radar-chart-container');
const areaSummary = document.querySelector('#area-summary');
const strengthsList = document.querySelector('#strengths-list');
const opportunitiesList = document.querySelector('#opportunities-list');
const resetButton = document.querySelector('#reset-profile');
const exportButton = document.querySelector('#export-profile');
const importInput = document.querySelector('#import-profile');

function loadSelections() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultSelections();

    const parsed = JSON.parse(raw);
    return { ...getDefaultSelections(), ...(parsed.selections || {}) };
  } catch {
    return getDefaultSelections();
  }
}

let selections = loadSelections();

function persistSelections() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      version: 1,
      updatedAt: new Date().toISOString(),
      selections
    })
  );
}

function createLevelSelect(skillId) {
  const select = document.createElement('select');
  select.dataset.skillId = skillId;

  for (const level of LEVELS) {
    const option = document.createElement('option');
    option.value = String(level.value);
    option.textContent = level.label;
    select.append(option);
  }

  select.value = String(selections[skillId] ?? 0);
  select.addEventListener('change', () => {
    selections[skillId] = Number(select.value);
    persistSelections();
    renderDashboard();
  });

  return select;
}

function renderSkillsForm() {
  skillsContainer.innerHTML = '';

  for (const area of SKILL_AREAS) {
    const section = document.createElement('section');
    section.className = 'area-card';

    const title = document.createElement('h3');
    title.textContent = `${area.name} (100 puntos)`;
    section.append(title);

    const list = document.createElement('div');
    list.className = 'skill-list';

    for (const skill of area.skills) {
      const row = document.createElement('label');
      row.className = 'skill-row';

      const text = document.createElement('span');
      text.textContent = skill.name;
      text.tabIndex = 0;
      text.setAttribute('role', 'button');

      if (skill.weight !== undefined) {
        const badge = document.createElement('span');
        badge.className = 'skill-weight-badge';
        badge.textContent = `${skill.weight}pt`;
        text.append(badge);
      }

      if (skill.levelDescriptions) {
        attachTooltip(text, skill, () => selections[skill.id] ?? 0);
      }

      row.append(text, createLevelSelect(skill.id));
      list.append(row);
    }

    section.append(list);
    skillsContainer.append(section);
  }
}

function renderSkillRanking(target, skills) {
  target.innerHTML = '';

  for (const skill of skills) {
    const li = document.createElement('li');
    li.textContent = `${skill.skillName} · ${skill.score}/${skill.maxScore}`;
    target.append(li);
  }
}

function renderAreaSummary(areas) {
  areaSummary.innerHTML = '';

  for (const area of areas) {
    const wrapper = document.createElement('div');
    wrapper.className = 'area-summary-item';

    const label = document.createElement('span');
    label.textContent = `${area.areaName}: ${area.score}/${area.maxScore}`;

    const progress = document.createElement('progress');
    progress.max = area.maxScore;
    progress.value = area.score;

    wrapper.append(label, progress);
    areaSummary.append(wrapper);
  }
}

function renderDashboard() {
  const details = calculateScoreDetails(selections);
  const percentage = Math.round((details.total / details.maxTotal) * 100);

  scoreValue.textContent = String(percentage);
  scoreSubtitle.textContent = `${details.total}/${getMaxScore()} puntos`;

  renderRadarChart(radarContainer, details.areaScores);
  renderAreaSummary(details.areaScores);
  renderSkillRanking(strengthsList, details.strengths);
  renderSkillRanking(opportunitiesList, details.opportunities);
}

function resetProfile() {
  selections = getDefaultSelections();
  persistSelections();
  renderSkillsForm();
  renderDashboard();
}

function exportProfile() {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    selections
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'qa-skills-profile.json';
  a.click();

  URL.revokeObjectURL(url);
}

function importProfile(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    let parsed;
    try {
      parsed = JSON.parse(String(reader.result));
    } catch {
      window.alert('Error al importar: el archivo no es un JSON válido.');
      return;
    }

    if (!parsed || typeof parsed !== 'object' || typeof parsed.selections !== 'object') {
      window.alert(
        'Error al importar: formato inválido. Usa un JSON exportado por la app con clave "selections".'
      );
      return;
    }

    selections = { ...getDefaultSelections(), ...parsed.selections };
    persistSelections();
    renderSkillsForm();
    renderDashboard();
  };
  reader.readAsText(file);
}

resetButton.addEventListener('click', resetProfile);
exportButton.addEventListener('click', exportProfile);
importInput.addEventListener('change', (event) => {
  const input = event.target;
  importProfile(input.files?.[0]);
  input.value = '';
});

renderSkillsForm();
renderDashboard();
