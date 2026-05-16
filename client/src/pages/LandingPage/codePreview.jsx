import { motion } from 'framer-motion';
import { FiTerminal } from 'react-icons/fi';

export default function CodePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mt-20 max-w-3xl mx-auto"
    >
      <div className="bg-battle-card rounded-2xl border border-battle-border overflow-hidden">
        <div className="bg-battle-surface px-4 py-3 flex items-center gap-3 border-b border-battle-border">
          <FiTerminal className="w-4 h-4 text-battle-muted" />
          <span className="text-battle-muted text-sm font-mono">
            battle_room.js
          </span>
        </div>

        <pre className="p-6 font-mono text-sm overflow-x-auto text-white">
{`function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];

    if (seen.has(comp)) {
      return [seen.get(comp), i];
    }

    seen.set(nums[i], i);
  }
}`}
        </pre>
      </div>
    </motion.div>
  );
}