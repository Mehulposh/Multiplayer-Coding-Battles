import { formatTime } from './battleUtils.js';

export default function BattleTimer({
  battle,
  isTimeWarning,
  timeLeft,
}) {
  return (
    <div
      className={`font-mono font-bold text-2xl ${
        isTimeWarning
          ? 'text-battle-danger animate-pulse'
          : 'text-white'
      }`}
    >
      {battle.status === 'active'
        ? formatTime(timeLeft > 0 ? timeLeft : 0)
        : battle.status === 'countdown'
        ? `${battle.countdown}`
        : battle.status === 'finished'
        ? 'ENDED'
        : '--:--'}
    </div>
  );
}