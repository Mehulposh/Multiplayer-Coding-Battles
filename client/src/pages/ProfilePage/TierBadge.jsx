import { FiAward } from 'react-icons/fi';

export default function TierBadge({
  tier,
}) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full text-sm font-bold border ${tier.bg} ${tier.color} ${tier.border}`}
    >
      <FiAward className="w-3.5 h-3.5" />

      {tier.label}
    </div>
  );
}