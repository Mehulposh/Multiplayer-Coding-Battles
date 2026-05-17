import { FiZap } from 'react-icons/fi';

export default function MatchFound({ matchFound }) {
  return (
    <div className="space-y-4">
      <div className="w-16 h-16 bg-battle-accent/20 rounded-full flex items-center justify-center mx-auto border border-battle-accent/40">
        <FiZap className="w-8 h-8 text-battle-accent animate-glow" />
      </div>

      <h2 className="font-display font-black text-2xl text-battle-accent">
        Match Found!
      </h2>

      <p className="text-white">
        vs{' '}
        <span className="font-bold">
          {matchFound.opponent?.username}
        </span>
      </p>
    </div>
  );
}