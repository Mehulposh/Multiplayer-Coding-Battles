import {
  useState,
} from 'react';

import {
  Link,
} from 'react-router-dom';

import toast from 'react-hot-toast';
import api from '../../../client/apiClient.js'
import {
  formatDistanceToNow,
} from 'date-fns';

import UserActions
  from './UserActions.jsx';

import DeleteUserModal
  from '../components/DeleteUserModal.jsx';

export default function UserRow({
  user,
  refreshUsers,
}) {
  const [showDelete,setShowDelete] = useState(false);
  
  const handleToggleRole =
  async () => {
    try {
      await api.patch(
        `/admin/users/${user._id}/role`
      );

      toast.success(
        'User role updated'
      );

      refreshUsers();
    } catch (err) {
      toast.error(
        err.response?.data
          ?.message ||
          'Failed to update role'
      );
    }
  };
  return (
    <>
      <tr className="border-b border-battle-border hover:bg-battle-surface/30 transition-colors">
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-battle-accent/10 border border-battle-border flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img
                  src={
                    user.avatar
                  }
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-battle-accent font-bold">
                  {user.username?.[0]?.toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <Link
                to={`/profile/${user.username}`}
                className="text-white font-medium hover:text-battle-accent"
              >
                {
                  user.username
                }
              </Link>

              <div className="text-xs text-battle-muted">
                {
                  user.eloRating
                }{' '}
                ELO
              </div>
            </div>
          </div>
        </td>

        <td className="px-5 py-4 text-battle-muted text-sm">
          {user.email}
        </td>

        <td className="px-5 py-4">
          <span
            className={`px-2 py-1 rounded-lg text-xs font-bold ${
              user.role ===
              'admin'
                ? 'bg-purple-400/10 text-purple-400'
                : 'bg-battle-surface text-battle-muted'
            }`}
          >
            {user.role}
          </span>
        </td>

        <td className="px-5 py-4 text-sm text-battle-muted">
          {user.lastSeen
            ? formatDistanceToNow(
                new Date(
                  user.lastSeen
                ),
                {
                  addSuffix: true,
                }
              )
            : 'Never'}
        </td>

        <td className="px-5 py-4">
          <UserActions
            user={user}
            onDelete={() =>
              setShowDelete(true )
            }
            onToggleRole={handleToggleRole}
          />
        </td>
      </tr>

      {showDelete && (
        <DeleteUserModal
          user={user}
          onClose={() =>
            setShowDelete(
              false
            )
          }
          onDeleted={
            refreshUsers
          }
        />
      )}
    </>
  );
}