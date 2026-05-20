import {
  FiSearch,
  FiX,
} from 'react-icons/fi';

export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-battle-muted" />

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search by title or tag..."
        className="w-full bg-battle-surface border border-battle-border rounded-xl pl-10 pr-10 py-2.5 text-white text-sm placeholder:text-battle-muted focus:outline-none focus:border-battle-accent/50 focus:ring-1 focus:ring-battle-accent/30 transition-all"
      />

      {search && (
        <button
          onClick={() =>
            setSearch('')
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-battle-muted hover:text-white transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}