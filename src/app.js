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

function loadCheckedAreas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.checkedAreas)) return new Set();
    return new Set(parsed.checkedAreas);
  } catch {
    return new Set();
  }
}

let selections = loadSelections();
let checkedAreas = loadCheckedAreas();

function persistSelections() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      version: 1,
      updatedAt: new Date().toISOString(),
      selections,
      checkedAreas: [...checkedAreas]
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
    section.dataset.areaId = area.id;

    const title = document.createElement('h3');
    const titleText = document.createTextNode(`${area.name} (100 puntos) `);
    const badge = document.createElement('span');
    badge.className = 'area-status-badge';
    badge.dataset.areaBadge = area.id;
    badge.setAttribute('role', 'button');
    badge.setAttribute('tabindex', '0');
    badge.setAttribute('aria-pressed', 'false');
    badge.addEventListener('click', () => {
      if (checkedAreas.has(area.id)) {
        checkedAreas.delete(area.id);
      } else {
        checkedAreas.add(area.id);
      }
      persistSelections();
      renderDashboard();
    });
    badge.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        badge.click();
      }
    });
    title.append(titleText, badge);
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

function renderAreaRanking(target, areas) {
  target.innerHTML = '';

  for (const area of areas) {
    const li = document.createElement('li');
    li.textContent = `${area.areaName} · ${area.score}/${area.maxScore}`;
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

function renderAreaBadges(areaScores) {
  for (const area of areaScores) {
    const badge = skillsContainer.querySelector(`[data-area-badge="${area.areaId}"]`);
    if (!badge) continue;
    const pct = area.score / area.maxScore;
    const isChecked = checkedAreas.has(area.areaId);
    const statusClass = pct >= 0.75 ? 'area-status--teaching' : 'area-status--learning';
    badge.textContent = pct >= 0.75 ? 'puedo enseñar ✓' : 'quiero aprender ✓';
    badge.className = `area-status-badge ${statusClass}${isChecked ? '' : ' area-status--inactive'}`;
    badge.setAttribute('aria-pressed', String(isChecked));
  }
}

function renderDashboard() {
  const details = calculateScoreDetails(selections);
  const percentage = Math.round((details.total / details.maxTotal) * 100);

  scoreValue.textContent = String(percentage);
  scoreSubtitle.textContent = `${details.total}/${getMaxScore()} puntos`;

  renderRadarChart(radarContainer, details.areaScores);
  renderAreaSummary(details.areaScores);
  renderAreaBadges(details.areaScores);

  const checkedAreaScores = details.areaScores.filter((a) => checkedAreas.has(a.areaId));
  const teaching = checkedAreaScores.filter((a) => a.score / a.maxScore >= 0.75).sort((a, b) => b.score - a.score);
  const learning = checkedAreaScores.filter((a) => a.score / a.maxScore < 0.75).sort((a, b) => a.score - b.score);
  renderAreaRanking(strengthsList, teaching);
  renderAreaRanking(opportunitiesList, learning);
}

function resetProfile() {
  selections = getDefaultSelections();
  checkedAreas = new Set();
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
    checkedAreas = Array.isArray(parsed.checkedAreas)
      ? new Set(parsed.checkedAreas)
      : new Set();
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
