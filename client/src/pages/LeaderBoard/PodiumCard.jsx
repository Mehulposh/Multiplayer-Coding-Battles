import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import {
  RANK_STYLES,
  getTier,
} from './leaderboardUtils.js';

export default function PodiumCard({
  player,
  place,
  delay = 0,
}) {
  if (!player) return null;

  const style =
    RANK_STYLES[place];

  const tier = getTier(
    player.eloRating
  );

  const heights = {
    1: 'h-72',
    2: 'h-60',
    3: 'h-52',
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ delay }}
      className={`rounded-3xl border flex mb-4 items-center justify-between p-6 ${heights[place]} ${style.bg}`}
    >
      {/* TOP */}
      <div className="text-center">
        <div className="text-4xl mb-3">
          {style.label}
        </div>

        <Link
          to={`/profile/${player.username}`}
          className="group"
        >
          <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-br from-battle-accent/30 to-battle-accent2/30 border border-battle-border flex items-center justify-center text-2xl font-black text-white mb-4 group-hover:scale-105 transition-transform">
            {player.username?.[0]?.toUpperCase()}
          </div>

          <div className="font-display font-black text-xl text-white group-hover:text-battle-accent transition-colors">
            {player.username}
          </div>
        </Link>

        <div
          className={`text-sm font-bold mt-2 ${tier.color}`}
        >
          {tier.label}
        </div>
      </div>

      {/* ELO */}
      <div className="text-center">
        <div
          className={`font-display font-black text-4xl ${style.text}`}
        >
          {player.eloRating}
        </div>

        <div className="text-battle-muted text-sm mt-1">
          ELO Rating
        </div>
      </div>

      {/* STATS */}
      <div className="flex items-center gap-5 text-sm">
        <div className="text-center">
          <div className="font-bold text-green-400">
            {player.wins}
          </div>

          <div className="text-battle-muted text-xs">
            Wins
          </div>
        </div>

        <div className="text-center">
          <div className="font-bold text-red-400">
            {player.losses}
          </div>

          <div className="text-battle-muted text-xs">
            Losses
          </div>
        </div>
      </div>
    </motion.div>
  );
}