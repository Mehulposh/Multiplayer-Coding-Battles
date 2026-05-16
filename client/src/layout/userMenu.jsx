import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut } from 'react-icons/fi';
import useAuthStore from '../zustandStore/authStore.js';

export default function UserMenu() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="text-right hidden sm:block">
        <div className="text-sm font-semibold text-white font-display">
          {user.username}
        </div>

        <div className="text-xs text-battle-accent font-mono">
          {user.eloRating} ELO
        </div>
      </div>

      <Link
        to={`/profile/${user.username}`}
        className="w-9 h-9 rounded-full bg-gradient-to-br from-battle-accent/30 to-battle-accent2/30 flex items-center justify-center border border-battle-border hover:border-battle-accent transition-colors"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <FiUser className="w-4 h-4 text-battle-accent" />
        )}
      </Link>

      <button
        onClick={handleLogout}
        className="p-2 rounded-lg text-battle-muted hover:text-battle-danger hover:bg-battle-danger/10 transition-all"
        title="Logout"
      >
        <FiLogOut className="w-4 h-4" />
      </button>
    </div>
  );
}