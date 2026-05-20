import { FiX } from 'react-icons/fi';

export default function ResultsInfo({
  filtered,
  problems,
  search,
  selectedDiff,
  selectedTag,
  clearFilters,
}) {
  const hasFilters =
    search ||
    selectedDiff !== 'all' ||
    selectedTag;

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="text-sm text-battle-muted">
        Showing{' '}
        <span className="text-white font-semibold">
          {filtered.length}
        </span>{' '}
        of{' '}
        <span className="text-white font-semibold">
          {problems.length}
        </span>{' '}
        problems
      </div>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-battle-border text-battle-muted hover:text-white hover:border-red-400/30 transition-all text-sm"
        >
          <FiX className="w-4 h-4" />
          Clear Filters
        </button>
      )}
    </div>
  );
}