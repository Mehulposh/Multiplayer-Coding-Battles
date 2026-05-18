import { FiAward } from 'react-icons/fi';

export default function EmptyLeaderboard() {
  return (
    <div className="py-24 text-center">
      <FiAward className="w-14 h-14 text-battle-border mx-auto mb-4" />

      <p className="text-battle-muted text-lg">
        No rankings yet
      </p>

      <p className="text-battle-muted text-sm mt-1">
        Complete some battles to appear here
      </p>
    </div>
  );
}