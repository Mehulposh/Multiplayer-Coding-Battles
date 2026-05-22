import { FiPlus } from 'react-icons/fi';

export default function SectionHeader({
  title,
  onAdd,
  addLabel,
}) {
  return (
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-semibold text-battle-muted uppercase tracking-wider">
        {title}
      </span>

      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-xs text-battle-accent hover:underline"
        >
          <FiPlus className="w-3 h-3" />

          {addLabel}
        </button>
      )}
    </div>
  );
}