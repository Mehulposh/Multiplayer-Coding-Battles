import { motion } from 'framer-motion';
import { FiTarget } from 'react-icons/fi';

import { getTier } from './leaderboardUtils.js';

export default function RankBanner({
  myRank,
  user,
}) {
  if (!myRank || !user) return null;

  const tier = getTier(
    user.eloRating || 1000
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="bg-battle-accent/5 border border-battle-accent/20 rounded-2xl px-6 py-4 flex items-center justify-between"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-battle-accent/10 border border-battle-accent/20 flex items-center justify-center">
          <FiTarget className="w-7 h-7 text-battle-accent" />
        </div>

        <div>
          <div className="text-battle-muted text-sm">
            Your Current Rank
          </div>

          <div className="font-display font-black text-3xl text-white">
            #{myRank}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="text-right">
        <div
          className={`font-bold text-lg ${tier.color}`}
        >
          {tier.label}
        </div>

        <div className="text-battle-muted text-sm">
          {user.eloRating} ELO
        </div>
      </div>
    </motion.div>
  );
}