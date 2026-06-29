import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScoreDetails, getDefaultSelections, getMaxScore } from '../src/scoring.js';

test('maximum aggregated score is 100', () => {
  assert.equal(getMaxScore(), 100);
});

test('default profile gets 0 points', () => {
  const details = calculateScoreDetails(getDefaultSelections());
  assert.equal(details.total, 0);
});

test('maximum level in all skills returns 100', () => {
  const selections = Object.fromEntries(
    Object.keys(getDefaultSelections()).map((skillId) => [skillId, 4])
  );

  const details = calculateScoreDetails(selections);
  assert.equal(details.total, 100);
});
