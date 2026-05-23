import {
  FiTrash2,
  FiEye,
  FiShield,
} from 'react-icons/fi';

import { Link }
  from 'react-router-dom';

export default function UserActions({
  user,
  onDelete,
  onToggleRole,
}) {
  return (
    <div className="flex items-center gap-2">
      <Link
        to={`/profile/${user.username}`}
        className="p-2 rounded-lg hover:bg-battle-accent/10"
      >
        <FiEye className="w-4 h-4" />
      </Link>

      <button
        onClick={() =>
          onToggleRole(
            user
          )
        }
        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
          user.role ===
          'admin'
            ? 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20'
            : 'bg-purple-400/10 text-purple-400 hover:bg-purple-400/20'
        }`}
      >
        <div className="flex items-center gap-1">
          <FiShield className="w-3 h-3" />

          {user.role ===
          'admin'
            ? 'Remove Admin'
            : 'Make Admin'}
        </div>
      </button>

      <button
        onClick={onDelete}
        className="p-2 rounded-lg hover:bg-red-400/10 text-red-400"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>
    </div>
  );
}