import {
  FiBarChart2,
} from 'react-icons/fi';

export default function EloDistributionCard({
  distribution,
}) {
  if (!distribution) {
    return null;
  }

  const max = Math.max(
    ...distribution.map(
      (d) => d.count
    ),
    1
  );

  return (
    <div className="bg-battle-card border border-battle-border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <FiBarChart2 className="w-5 h-5 text-blue-400" />

        <h3 className="font-display font-bold text-white">
          ELO Distribution
        </h3>
      </div>

      <div className="space-y-4">
        {distribution.map(
          (item, i) => {
            const percent =
              (item.count /
                max) *
              100;

            return (
              <div
                key={i}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white">
                    {
                      item.label
                    }
                  </span>

                  <span className="text-sm text-battle-muted">
                    {
                      item.count
                    }
                  </span>
                </div>

                <div className="h-2 bg-battle-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400"
                    style={{
                      width: `${percent}%`,
                    }}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}