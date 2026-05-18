import { FiRefreshCw } from 'react-icons/fi';

export default function LeaderboardHeader({
  loading,
  lastUpdated,
  fetchLeaderboard,
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-display font-black text-3xl text-white">
          Leaderboard
        </h1>

        <p className="text-battle-muted mt-1">
          {lastUpdated
            ? `Updated ${lastUpdated.toLocaleTimeString()}`
            : 'Loading rankings...'}
        </p>
      </div>

      <button
        onClick={fetchLeaderboard}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 border border-battle-border rounded-xl text-battle-muted hover:text-white hover:border-battle-accent/50 transition-all disabled:opacity-50"
      >
        <FiRefreshCw
          className={`w-4 h-4 ${
            loading
              ? 'animate-spin'
              : ''
          }`}
        />

        Refresh
      </button>
    </div>
  );
}