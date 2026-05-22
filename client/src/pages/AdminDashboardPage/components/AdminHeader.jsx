import {
  FiShield,
  FiCode,
  FiRefreshCw,
} from 'react-icons/fi';

import { Link }
  from 'react-router-dom';

import {
  formatDistanceToNow,
} from 'date-fns';

export default function AdminHeader({
  user,
  lastRefresh,
  loading,
  onRefresh,
}) {
  return (
    <div className="flex items-start justify-between flex-wrap gap-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 bg-purple-400/10 rounded-lg flex items-center justify-center border border-purple-400/30">
            <FiShield className="w-4 h-4 text-purple-400" />
          </div>

          <h1 className="font-display font-black text-3xl text-white">
            Admin Dashboard
          </h1>
        </div>

        <p className="text-battle-muted">
          Welcome,

          <span className="text-purple-400 font-medium ml-1">
            {user?.username}
          </span>

          {lastRefresh && (
            <span className="ml-2">
              · Last updated{' '}
              {formatDistanceToNow(
                lastRefresh,
                {
                  addSuffix: true,
                }
              )}
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/admin/problems"
          className="flex items-center gap-2 px-4 py-2.5 border border-battle-border rounded-xl text-battle-muted hover:text-white hover:border-battle-accent/30 transition-all text-sm font-medium"
        >
          <FiCode className="w-4 h-4" />

          Manage Problems
        </Link>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-battle-accent text-battle-bg rounded-xl font-bold text-sm disabled:opacity-50 transition-all"
        >
          <FiRefreshCw
            className={`w-4 h-4 ${
              loading
                ? 'animate-spin'
                : ''
            }`}
          />

          Refresh
        </button>
      </div>
    </div>
  );
}