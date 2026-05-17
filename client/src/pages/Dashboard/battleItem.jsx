import { formatDistanceToNow } from 'date-fns';

export default function BattleItem({ battle, user }) {
  const isWinner =
    battle.winner?._id === user?.id ||
    battle.winner?.username === user?.username;

  const opponent = battle.players?.find((p) => {
    const pId = p.user?._id || p.user;

    return pId?.toString() !== user?.id?.toString();
  });

  return (
    <div className="px-6 py-4 flex items-center justify-between hover:bg-white/2 transition-colors">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
            isWinner
              ? 'bg-green-400/10 text-green-400'
              : 'bg-red-400/10 text-red-400'
          }`}
        >
          {isWinner ? 'W' : 'L'}
        </div>

        <div>
          <div className="font-medium text-white">
            vs{' '}
            <span className="text-battle-accent">
              {opponent?.username || 'Unknown'}
            </span>
          </div>

          <div className="text-xs text-battle-muted mt-0.5">
            {battle.problem?.title} · {battle.problem?.difficulty}
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-xs text-battle-muted">
          {battle.createdAt
            ? formatDistanceToNow(
                new Date(battle.createdAt),
                { addSuffix: true }
              )
            : ''}
        </div>
      </div>
    </div>
  );
}