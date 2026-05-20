import {
  FiCalendar,
} from 'react-icons/fi';

import { format } from 'date-fns';

export default function MemberSince({
  createdAt,
}) {
  if (!createdAt) return null;

  return (
    <div className="flex items-center gap-1.5 mt-3 text-xs text-battle-muted">
      <FiCalendar className="w-3.5 h-3.5" />

      Member since{' '}
      {format(
        new Date(createdAt),
        'MMMM yyyy'
      )}
    </div>
  );
}