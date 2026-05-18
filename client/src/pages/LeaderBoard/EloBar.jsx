import { getTier } from './leaderboardUtils.js';

export default function EloBar({ elo }) {
  const maxElo = 2500;

  const pct = Math.min(
    (elo / maxElo) * 100,
    100
  );

  const tier = getTier(elo);

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-battle-border rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${tier.bg.replace('/10', '/60')}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}