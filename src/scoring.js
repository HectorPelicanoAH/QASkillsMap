import { LEVELS, SKILL_AREAS } from './skills-data.js';

const levelFactorByValue = new Map(LEVELS.map((level) => [level.value, level.factor]));

function getSkillWeight(area, skill) {
  return skill.weight ?? area.weight / area.skills.length;
}

function getAreaTotalWeight(area) {
  return area.skills.reduce((sum, skill) => sum + getSkillWeight(area, skill), 0);
}

export function getMaxScore() {
  return SKILL_AREAS.length * 100;
}

export function getDefaultSelections() {
  return Object.fromEntries(
    SKILL_AREAS.flatMap((area) => area.skills.map((skill) => [skill.id, 0]))
  );
}

export function calculateScoreDetails(selections) {
  let total = 0;
  const areaScores = [];
  const skillScores = [];

  for (const area of SKILL_AREAS) {
    let areaTotal = 0;
    const areaTotalWeight = getAreaTotalWeight(area);

    for (const skill of area.skills) {
      const skillWeight = getSkillWeight(area, skill);
      const normalizedSkillMax = (skillWeight / areaTotalWeight) * 100;
      const selectedLevel = Number(selections[skill.id] ?? 0);
      const factor = levelFactorByValue.get(selectedLevel) ?? 0;
      const weightedScore = normalizedSkillMax * factor;

      areaTotal += weightedScore;
      skillScores.push({
        areaId: area.id,
        areaName: area.name,
        skillId: skill.id,
        skillName: skill.name,
        level: selectedLevel,
        score: Number(weightedScore.toFixed(2)),
        maxScore: Number(normalizedSkillMax.toFixed(2))
      });
    }

    areaScores.push({
      areaId: area.id,
      areaName: area.name,
      score: Number(areaTotal.toFixed(2)),
      maxScore: 100
    });

    total += areaTotal;
  }

  const sortedByScore = [...skillScores].sort((a, b) => b.score - a.score);

  return {
    total: Number(total.toFixed(2)),
    maxTotal: getMaxScore(),
    areaScores,
    skillScores,
    strengths: sortedByScore.slice(0, 3),
    opportunities: sortedByScore.slice(-3).reverse()
  };
}
