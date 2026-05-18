import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import EloBar from './EloBar.jsx';

import {
  RANK_STYLES,
  getTier,
} from './leaderboardUtils.js';

export default function LeaderboardRow({
  entry,
  currentUsername,
  index,
}) {
  const rankStyle =
    RANK_STYLES[entry.rank];

  const tier = getTier(
    entry.eloRating
  );

  const isMe =
    entry.username ===
    currentUsername;

  const winRate =
    entry.battlesPlayed > 0
      ? Math.round(
          (entry.wins /
            entry.battlesPlayed) *
            100
        )
      : 0;

  return (
    <motion.tr
      initial={{
        opacity: 0,
        x: -10,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: Math.min(
          index * 0.03,
          0.5
        ),
      }}
      className={`border-b border-battle-border transition-colors ${
        isMe
          ? 'bg-battle-accent/5'
          : 'hover:bg-white/2'
      }`}
    >
      {/* RANK */}
      <td className="px-5 py-4">
        <div
          className={`w-10 h-10 rounded-xl border flex items-center justify-center font-black text-sm ${
            rankStyle
              ? `${rankStyle.bg} ${rankStyle.text}`
              : 'bg-battle-surface border-battle-border text-battle-muted'
          }`}
        >
          {rankStyle
            ? rankStyle.label
            : entry.rank}
        </div>
      </td>

      {/* PLAYER */}
      <td className="px-5 py-4">
        <Link
          to={`/profile/${entry.username}`}
          className="flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-battle-accent/30 to-battle-accent2/30 border border-battle-border flex items-center justify-center text-white font-bold">
            {entry.username?.[0]?.toUpperCase()}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white group-hover:text-battle-accent transition-colors">
                {entry.username}
              </span>

              {isMe && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-battle-accent/20 text-battle-accent">
                  YOU
                </span>
              )}
            </div>

            <div
              className={`text-xs font-bold ${tier.color}`}
            >
              {tier.label}
            </div>
          </div>
        </Link>
      </td>

      {/* ELO */}
      <td className="px-5 py-4 min-w-[180px]">
        <div className="space-y-2">
          <div className="font-display font-black text-white">
            {entry.eloRating}
          </div>

          <EloBar
            elo={entry.eloRating}
          />
        </div>
      </td>

      {/* W/L */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-green-400 font-bold">
            {entry.wins}
          </span>

          <span className="text-battle-muted">
            /
          </span>

          <span className="text-red-400 font-bold">
            {entry.losses}
          </span>
        </div>
      </td>

      {/* WIN RATE */}
      <td className="px-5 py-4">
        <div className="font-bold text-white">
          {winRate}%
        </div>
      </td>

      {/* BATTLES */}
      <td className="px-5 py-4">
        <div className="text-battle-muted font-medium">
          {entry.battlesPlayed}
        </div>
      </td>
    </motion.tr>
  );
}