import { motion } from 'framer-motion';

import { FiZap } from 'react-icons/fi';

import BattleItem from './battleItem.jsx';

export default function RecentBattles({
  battles,
  loading,
  user,

  title = 'Recent Battles',

  emptyMessage = 'No battles yet.',
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
      transition={{
        delay: 0.3,
      }}
      className="bg-battle-card border border-battle-border rounded-2xl overflow-hidden"
    >
      {/* HEADER */}
      <div className="px-6 py-4 border-b border-battle-border">
        <h3 className="font-display font-bold text-white text-lg">
          {title}
        </h3>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="p-8 text-center text-battle-muted">
          Loading...
        </div>
      ) : battles.length === 0 ? (
        /* EMPTY */
        <div className="p-12 text-center">
          <FiZap className="w-12 h-12 text-battle-border mx-auto mb-3" />

          <p className="text-battle-muted">
            {emptyMessage}
          </p>
        </div>
      ) : (
        /* LIST */
        <div className="divide-y divide-battle-border">
          {battles.map((battle) => (
            <BattleItem
              key={battle._id}
              battle={battle}
              user={user}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}