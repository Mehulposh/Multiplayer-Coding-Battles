export default function MiniBarChart({
  data,
  color =
    'bg-red-300',
}) {
  if (!data?.length) {
    return (
      <div className="text-battle-muted text-xs">
        No data
      </div>
    );
  }

  const max = Math.max(
    ...data.map(
      (d) => d.count
    ),
    1
  );

  return (
    <div className="flex items-end gap-2 h-20">
      {data.map((d, i) => {
        const label =
          new Date(
            d._id
          ).toLocaleDateString(
            'en-IN',
            {
              day: 'numeric',
            }
          );

        return (
          <div
            key={i}
            className="flex-1 flex flex-col items-center justify-end gap-1 group relative h-full"
          >
            <div
              className={`w-full rounded-sm ${color} opacity-70 group-hover:opacity-100 transition-opacity`}
              style={{
                height: `${
                  (d.count /
                    max) *
                  100
                }%`,
                minHeight:
                  d.count
                    ? 4
                    : 0,
              }}
            />

            {/* Tooltip */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-battle-card border border-battle-border text-xs text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {
                new Date(
                  d._id
                ).toLocaleDateString(
                  'en-IN',
                  {
                    month:
                      'short',
                    day:
                      'numeric',
                  }
                )
              }
              : {d.count}
            </div>

            {/* Bottom label */}
            <span className="text-[10px] text-battle-muted">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}