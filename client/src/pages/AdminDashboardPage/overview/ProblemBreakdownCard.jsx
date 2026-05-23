import {
  FiCode,
} from 'react-icons/fi';

const COLORS = {
  easy:
    'bg-green-400 text-green-400',

  medium:
    'bg-yellow-400 text-yellow-400',

  hard:
    'bg-red-400 text-red-400',
};

export default function ProblemBreakdownCard({
  breakdown = [],
}) {

  const mapped =
    breakdown.reduce(
      (acc, item) => {
        acc[item._id] =
          item.count;

        return acc;
      },
      {}
    );
  
  const total =
    (mapped?.easy || 0) +
    (mapped?.medium || 0) +
    (mapped?.hard || 0);

  const items = [
    {
      key: 'easy',
      label: 'Easy',
      value:
        mapped?.easy || 0,
    },

    {
      key: 'medium',
      label: 'Medium',
      value:
        mapped?.medium ||
        0,
    },

    {
      key: 'hard',
      label: 'Hard',
      value:
        mapped?.hard || 0,
    },
  ];

  return (
    <div className="bg-battle-card border border-battle-border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <FiCode className="w-5 h-5 text-purple-400" />

        <h3 className="font-display font-bold text-white">
          Problem Breakdown
        </h3>
        
      </div>

      <div className="space-y-4">
        {items.map(
          (item) => {
            const percent = total > 0
                ? Math.round(
                    (item.value /total) * 100
                  )
                : 0;

            return (
              <div
                key={item.key}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-medium ${
                      COLORS[
                        item.key
                      ].split( ' ' )[1]
                    }`}
                  >
                    {
                      item.label
                    }
                  </span>

                  <span className="text-sm text-battle-muted">
                    {
                      item.value
                    }
                  </span>
                </div>

                <div className="h-2 bg-battle-surface rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      COLORS[
                        item
                          .key
                      ].split(
                        ' '
                      )[0]
                    }`}
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