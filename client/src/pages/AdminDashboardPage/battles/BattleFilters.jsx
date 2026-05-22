const STATUSES = [
  'all',
  'waiting',
  'countdown',
  'active',
  'finished',
];

export default function BattleFilters({
  status,
  setStatus,
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {STATUSES.map(
        (item) => (
          <button
            key={item}
            onClick={() =>
              setStatus(item)
            }
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              status === item
                ? 'bg-battle-accent/10 text-battle-accent border border-battle-accent/20'
                : 'border border-battle-border text-battle-muted hover:text-white'
            }`}
          >
            {item}
          </button>
        )
      )}
    </div>
  );
}