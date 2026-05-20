import {
  FiAward,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi';

import StatCard from '../Dashboard/statsCard.jsx';

export default function StatsGrid({
  profile,
  winRate,
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* ELO */}
      <StatCard
        icon={FiAward}
        label="ELO Rating"
        value={profile.eloRating}
        color="text-yellow-400"
        bg="bg-yellow-400/10"
      />

      {/* WIN RATE */}
      <StatCard
        icon={FiTarget}
        label="Win Rate"
        value={`${winRate}%`}
        color="text-green-400"
        bg="bg-green-400/10"
      />

      {/* TOTAL BATTLES */}
      <StatCard
        icon={FiZap}
        label="Battles"
        value={
          profile.battlesPlayed || 0
        }
        color="text-battle-accent"
        bg="bg-battle-accent/10"
      />

      {/* WINS */}
      <StatCard
        icon={FiTrendingUp}
        label="Wins"
        value={profile.wins || 0}
        color="text-blue-400"
        bg="bg-blue-400/10"
      />
    </div>
  );
}