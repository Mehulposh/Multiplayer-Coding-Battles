import { motion } from 'framer-motion';

export default function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
  delay,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-battle-card border border-battle-border rounded-2xl p-5"
    >
      <div
        className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}
      >
        <Icon className={`w-5 h-5 ${color}`} />
      </div>

      <div className={`font-display font-black text-2xl ${color}`}>
        {value}
      </div>

      <div className="text-battle-muted text-sm mt-1">
        {label}
      </div>
    </motion.div>
  );
}