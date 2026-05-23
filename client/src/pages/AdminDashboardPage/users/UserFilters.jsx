import {
  FiSearch,
  FiX,
} from 'react-icons/fi';

export default function UserFilters({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  onSearch,
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
        className="relative flex-1 min-w-56"
      >
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-battle-muted" />

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search users..."
          className="w-full bg-battle-surface border border-battle-border rounded-xl pl-9 pr-4 py-2.5 text-white"
        />

        {search && (
          <button
            type="button"
            onClick={() =>
              setSearch('')
            }
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <FiX className="w-4 h-4 text-battle-muted" />
          </button>
        )}
      </form>

      {[
        'all',
        'user',
        'admin',
      ].map((role) => (
        <button
          key={role}
          onClick={() =>
            setRoleFilter(
              role
            )
          }
          className={`px-4 py-2 rounded-xl ${
            roleFilter ===
            role
              ? 'bg-battle-accent/10 text-battle-accent'
              : 'border border-battle-border text-battle-muted'
          }`}
        >
          {role}
        </button>
      ))}
    </div>
  );
}