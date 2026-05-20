import {
  FiFilter,
} from 'react-icons/fi';

import {
  DIFFICULTIES,
  DIFFICULTY_STYLES,
} from './problemConstants.js';

export default function DifficultyFilter({
  selectedDiff,
  setSelectedDiff,
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 text-battle-muted text-sm mr-1">
        <FiFilter className="w-4 h-4" />
        Difficulty:
      </div>

      {[
        'all',
        ...DIFFICULTIES,
      ].map((d) => {
        const style =
          d !== 'all'
            ? DIFFICULTY_STYLES[d]
            : null;

        return (
          <button
            key={d}
            onClick={() =>
              setSelectedDiff(d)
            }
            className={`px-4 py-1.5 rounded-xl text-sm font-bold capitalize transition-all border ${
              selectedDiff === d
                ? d === 'all'
                  ? 'bg-battle-accent/10 text-battle-accent border-battle-accent/30'
                  : `${style.bg} ${style.text} ${style.border}`
                : 'border-battle-border text-battle-muted hover:text-white hover:border-battle-accent/20'
            }`}
          >
            {d}
          </button>
        );
      })}
    </div>
  );
}