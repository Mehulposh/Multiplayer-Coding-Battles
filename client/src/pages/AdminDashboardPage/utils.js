import { ELO_TIERS } from './constants.js';

export function getTier(
  elo = 0
) {
  return (
    ELO_TIERS.find(
      (t) => elo >= t.min
    ) ||
    ELO_TIERS[
      ELO_TIERS.length - 1
    ]
  );
}