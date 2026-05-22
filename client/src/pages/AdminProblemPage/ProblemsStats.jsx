export default function ProblemsStats({
  stats,
}) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {[
        {
          label: 'Total',
          value: stats.total,
          color: 'text-white',
        },

        {
          label: 'Active',
          value: stats.active,
          color: 'text-green-400',
        },

        {
          label: 'Easy',
          value: stats.easy,
          color: 'text-green-400',
        },

        {
          label: 'Medium',
          value: stats.medium,
          color: 'text-yellow-400',
        },

        {
          label: 'Hard',
          value: stats.hard,
          color: 'text-red-400',
        },
      ].map((s) => (
        <div
          key={s.label}
          className="bg-battle-card border border-battle-border rounded-xl p-4 text-center"
        >
          <div
            className={`font-display font-black text-2xl ${s.color}`}
          >
            {s.value}
          </div>

          <div className="text-battle-muted text-xs mt-1">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}