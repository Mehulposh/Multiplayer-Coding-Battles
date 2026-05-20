import {
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

export default function Pagination({
  page,
  setPage,
  totalPages,
}) {
  return (
    <div className="flex items-center justify-center gap-3 pt-2">
      {/* PREV */}
      <button
        onClick={() =>
          setPage((p) =>
            Math.max(p - 1, 1)
          )
        }
        disabled={page === 1}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-battle-border text-battle-muted hover:text-white hover:border-battle-accent/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FiChevronLeft className="w-4 h-4" />
        Prev
      </button>

      {/* PAGE */}
      <div className="px-5 py-2 rounded-xl bg-battle-card border border-battle-border text-white font-semibold">
        {page} / {totalPages}
      </div>

      {/* NEXT */}
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
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-battle-border text-battle-muted hover:text-white hover:border-battle-accent/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}