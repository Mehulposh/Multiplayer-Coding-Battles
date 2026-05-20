import { ELO_TIERS } from './profileConstants.js';

export function getTier(elo = 0) {
  return (
    ELO_TIERS.find(
      (t) => elo >= t.min
    ) ||
    ELO_TIERS[
      ELO_TIERS.length - 1
    ]
  );
}

export function getWinRate(
  wins,
  battlesPlayed
) {
  if (!battlesPlayed) return 0;

  return Math.round(
    (wins / battlesPlayed) * 100
  );
}