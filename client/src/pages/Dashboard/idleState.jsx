import { FiZap } from 'react-icons/fi';

export default function IdleState({
  user,
  onFindMatch,
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-3xl text-white mb-2">
          Ready to Battle?
        </h2>

        <p className="text-battle-muted">
          Find an opponent matched to your skill level
        </p>
      </div>

      <button
        onClick={onFindMatch}
        className="group inline-flex items-center gap-3 bg-battle-accent text-battle-bg px-10 py-4 rounded-2xl font-black text-lg hover:shadow-[0_0_50px_rgba(0,255,136,0.5)] transition-all duration-300 animate-pulse-green"
      >
        <FiZap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        FIND MATCH
      </button>

      <p className="text-battle-muted text-sm">
        Your ELO:
        <span className="text-battle-accent font-mono font-bold">
          {' '}
          {user?.eloRating || 0}
        </span>
      </p>
    </div>
  );
}