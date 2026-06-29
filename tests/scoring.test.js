import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScoreDetails, getDefaultSelections, getMaxScore } from '../src/scoring.js';

test('el score máximo agregado es 100', () => {
  assert.equal(getMaxScore(), 100);
});

test('el perfil por defecto obtiene 0 puntos', () => {
  const details = calculateScoreDetails(getDefaultSelections());
  assert.equal(details.total, 0);
});

test('nivel máximo en todas las skills devuelve 100', () => {
  const selections = Object.fromEntries(
    Object.keys(getDefaultSelections()).map((skillId) => [skillId, 4])
  );

  const details = calculateScoreDetails(selections);
  assert.equal(details.total, 100);
});
