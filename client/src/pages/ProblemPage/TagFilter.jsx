import {
  FiTag,
  FiX,
} from 'react-icons/fi';

import {
  POPULAR_TAGS,
} from './problemConstants.js';

export default function TagFilter({
  selectedTag,
  setSelectedTag,
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 text-battle-muted text-sm mr-1">
        <FiTag className="w-4 h-4" />
        Tag:
      </div>

      {POPULAR_TAGS.map((tag) => (
        <button
          key={tag}
          onClick={() =>
            setSelectedTag(
              selectedTag === tag
                ? ''
                : tag
            )
          }
          className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
            selectedTag === tag
              ? 'bg-battle-accent/10 text-battle-accent border border-battle-accent/30'
              : 'bg-battle-surface text-battle-muted border border-battle-border hover:text-white hover:border-battle-accent/20'
          }`}
        >
          {tag}
        </button>
      ))}

      {selectedTag && (
        <button
          onClick={() =>
            setSelectedTag('')
          }
          className="flex items-center gap-1 text-xs text-battle-muted hover:text-red-400 transition-colors ml-1"
        >
          <FiX className="w-3 h-3" />
          Clear
        </button>
      )}
    </div>
  );
}