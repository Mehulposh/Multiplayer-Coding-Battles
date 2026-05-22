import {
  FiSearch,
  FiX,
} from 'react-icons/fi';

import {
  DIFFICULTIES,
} from './problemConstants.js';

export default function ProblemFilters({
  search,
  setSearch,
  filterDiff,
  setFilterDiff,
  filterActive,
  setFilterActive,
  filteredCount,
}) {
  return (
    <div className="bg-battle-card border border-battle-border rounded-2xl p-4 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-48">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-battle-muted" />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search by title or tag..."
          className="w-full bg-battle-surface border border-battle-border rounded-lg pl-9 pr-4 py-2 text-white text-sm placeholder:text-battle-muted focus:outline-none focus:border-battle-accent/50 transition-all"
        />

        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-battle-muted hover:text-white"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex gap-1">
        {['all', ...DIFFICULTIES].map(
          (d) => (
            <button
              key={d}
              onClick={() =>
                setFilterDiff(d)
              }
              className={`px-3 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                filterDiff === d
                  ? 'bg-battle-accent/10 text-battle-accent border border-battle-accent/30'
                  : 'text-battle-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {d}
            </button>
          )
        )}
      </div>

      <div className="flex gap-1">
        {[
          'all',
          'active',
          'inactive',
        ].map((s) => (
          <button
            key={s}
            onClick={() =>
              setFilterActive(s)
            }
            className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
              filterActive === s
                ? 'bg-battle-accent/10 text-battle-accent border border-battle-accent/30'
                : 'text-battle-muted hover:text-white hover:bg-white/5'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <span className="text-battle-muted text-sm ml-auto">
        {filteredCount} problem
        {filteredCount !== 1
          ? 's'
          : ''}
      </span>
    </div>
  );
}