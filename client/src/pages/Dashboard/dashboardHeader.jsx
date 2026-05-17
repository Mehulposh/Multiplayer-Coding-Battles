import { getRankLabel } from './dashboardUtils.js';

export default function DashboardHeader({ user }) {
  const rank = getRankLabel(user?.eloRating || 1000);

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="font-display font-black text-3xl text-white">
          Welcome back,
          <span className="text-battle-accent">
            {' '}
            {user?.username}
          </span>
        </h1>

        <p className="text-battle-muted mt-1">
          Ready to battle? Your next opponent is waiting.
        </p>
      </div>

      <div className="text-right">
        <div className={`font-display font-bold text-lg ${rank.color}`}>
          {rank.label}
        </div>

        <div className="text-battle-muted text-sm">
          Current rank
        </div>
      </div>
    </div>
  );
}