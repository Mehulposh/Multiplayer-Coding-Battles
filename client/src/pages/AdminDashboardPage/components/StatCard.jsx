import { motion }
  from 'framer-motion';

export default function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color =
    'text-battle-accent',
  iconBg =
    'bg-battle-accent/10',
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="bg-battle-card border border-battle-border rounded-2xl p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}
        >
          <Icon
            className={`w-5 h-5 ${color}`}
          />
        </div>

        {sub !==
          undefined && (
          <span className="text-xs text-battle-muted bg-battle-surface px-2 py-0.5 rounded-full">
            {sub}
          </span>
        )}
      </div>

      <div
        className={`font-display font-black text-3xl ${color}`}
      >
        {value}
      </div>

      <div className="text-battle-muted text-sm mt-1">
        {label}
      </div>
    </motion.div>
  );
}