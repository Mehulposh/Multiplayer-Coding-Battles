import {
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';

export default function SortIcon({
  field,
  sortField,
  sortDir,
}) {
  if (sortField !== field) {
    return (
      <FiChevronDown className="w-3 h-3 opacity-30" />
    );
  }

  return sortDir === 'asc' ? (
    <FiChevronUp className="w-3 h-3 text-battle-accent" />
  ) : (
    <FiChevronDown className="w-3 h-3 text-battle-accent" />
  );
}