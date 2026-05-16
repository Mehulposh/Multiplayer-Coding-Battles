import { motion } from 'framer-motion';
import { stats } from './data.js';

export default function StatsSection() {
  return (
    <div className="border-y border-battle-border bg-battle-surface/50 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="text-center"
          >
            <div className="font-display font-black text-4xl text-battle-accent">
              {stat.value}
            </div>

            <div className="text-battle-muted text-sm mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}