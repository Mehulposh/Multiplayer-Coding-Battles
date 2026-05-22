import {
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

export default function Pagination({
  page,
  totalPages,
  setPage,
}) {
  if (totalPages <= 1)
    return null;

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={() =>
          setPage((p) =>
            Math.max(
              p - 1,
              1
            )
          )
        }
        disabled={page === 1}
        className="flex items-center gap-2 px-4 py-2 border border-battle-border rounded-xl text-battle-muted hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
      >
        <FiChevronLeft className="w-4 h-4" />

        Prev
      </button>

      <span className="text-battle-muted text-sm">
        Page {page} of{' '}
        {totalPages}
      </span>

      <button
        onClick={() =>
          setPage((p) =>
            Math.min(
              p + 1,
              totalPages
            )
          )
        }
        disabled={
          page === totalPages
        }
        className="flex items-center gap-2 px-4 py-2 border border-battle-border rounded-xl text-battle-muted hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
      >
        Next

        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}