import { motion } from 'framer-motion';

import { FiAward } from 'react-icons/fi';

export default function AchievementsSection({
  achievements = [],
}) {
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
      transition={{ delay: 0.1 }}
      className="bg-battle-card border border-battle-border rounded-2xl p-6"
    >
      {/* HEADER */}
      <h2 className="font-display font-bold text-white text-lg mb-4 flex items-center gap-2">
        <FiAward className="w-5 h-5 text-yellow-400" />

        Achievements
      </h2>

      {/* EMPTY */}
      {achievements.length === 0 ? (
        <div className="py-8 text-center">
          <div className="text-4xl mb-3">
            🏆
          </div>

          <p className="text-battle-muted">
            No achievements unlocked yet
          </p>

          <p className="text-xs text-battle-border mt-2">
            Win battles to earn achievements
          </p>
        </div>
      ) : (
        /* LIST */
        <div className="flex flex-wrap gap-2">
          {achievements.map(
            (achievement, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 text-sm font-medium"
              >
                🏆 {achievement}
              </span>
            )
          )}
        </div>
      )}
    </motion.div>
  );
}