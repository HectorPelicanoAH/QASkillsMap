import { LEVELS } from './skills-data.js';

let tooltipEl = null;

function getTooltip() {
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'skill-tooltip';
    tooltipEl.setAttribute('role', 'tooltip');
    tooltipEl.setAttribute('aria-live', 'polite');
    document.body.append(tooltipEl);
  }
  return tooltipEl;
}

function positionTooltip(tooltip, target) {
  const rect = target.getBoundingClientRect();
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  let left = rect.left + scrollX;
  let top = rect.bottom + scrollY + 6;

  // Clamp right edge
  const estWidth = 280;
  if (left + estWidth > document.documentElement.clientWidth + scrollX) {
    left = Math.max(4, rect.right + scrollX - estWidth);
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

export function attachTooltip(labelEl, skill, getCurrentLevel) {
  labelEl.classList.add('has-tooltip');

  function showTooltip() {
    const currentLevel = getCurrentLevel();
    const tooltip = getTooltip();

    const rows = LEVELS.map((lvl) => {
      const isCurrent = lvl.value === currentLevel;
      return `<li class="tooltip-level${isCurrent ? ' tooltip-level--current' : ''}">
        <span class="tooltip-badge">${lvl.value}</span>
        <span class="tooltip-desc">${skill.levelDescriptions[lvl.value]}</span>
      </li>`;
    }).join('');

    tooltip.innerHTML = `
      <p class="tooltip-skill-name">${skill.name}</p>
      <ul class="tooltip-levels">${rows}</ul>
    `;

    positionTooltip(tooltip, labelEl);
    tooltip.classList.add('skill-tooltip--visible');
  }

  function hideTooltip() {
    getTooltip().classList.remove('skill-tooltip--visible');
  }

  labelEl.addEventListener('mouseenter', showTooltip);
  labelEl.addEventListener('mouseleave', hideTooltip);
  labelEl.addEventListener('focusin', showTooltip);
  labelEl.addEventListener('focusout', hideTooltip);
}
