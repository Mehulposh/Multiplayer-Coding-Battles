import {
  FiSearch,
  FiClock,
  FiUsers,
  FiX,
} from 'react-icons/fi';

import { formatTime } from './dashboardUtils.js';

export default function SearchingState({
  waitTime,
  playersSearching,
  onCancelMatch,
}) {
  return (
    <div className="space-y-6">
      <div className="relative mx-auto w-20 h-20">
        <div className="absolute inset-0 border-4 border-battle-accent/20 rounded-full" />

        <div className="absolute inset-0 border-4 border-battle-accent border-t-transparent rounded-full animate-spin" />

        <div className="absolute inset-3 bg-battle-accent/10 rounded-full flex items-center justify-center">
          <FiSearch className="w-6 h-6 text-battle-accent" />
        </div>
      </div>

      <div>
        <h2 className="font-display font-bold text-xl text-white">
          Searching for opponent...
        </h2>

        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-battle-muted">
          <div className="flex items-center gap-2">
            <FiClock className="w-4 h-4" />

            <span className="font-mono">
              {formatTime(waitTime)}
            </span>
          </div>

          {playersSearching > 0 && (
            <div className="flex items-center gap-2">
              <FiUsers className="w-4 h-4" />
              <span>{playersSearching} searching</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onCancelMatch}
        className="flex items-center gap-2 mx-auto px-6 py-2.5 rounded-xl border border-battle-border text-battle-muted hover:text-battle-danger hover:border-battle-danger/50 transition-all"
      >
        <FiX className="w-4 h-4" />
        Cancel
      </button>
    </div>
  );
}