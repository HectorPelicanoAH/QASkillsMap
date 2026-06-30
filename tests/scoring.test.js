import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScoreDetails, getDefaultSelections, getMaxScore } from '../src/scoring.js';
import { SKILL_AREAS } from '../src/skills-data.js';

test('maximum aggregated score is 100 per category', () => {
  assert.equal(getMaxScore(), SKILL_AREAS.length * 100);
});

test('default profile gets 0 points', () => {
  const details = calculateScoreDetails(getDefaultSelections());
  assert.equal(details.total, 0);
});

test('maximum level in all skills returns 100 per category', () => {
  const selections = Object.fromEntries(
    Object.keys(getDefaultSelections()).map((skillId) => [skillId, 4])
  );

  const details = calculateScoreDetails(selections);
  assert.equal(details.total, SKILL_AREAS.length * 100);
});
