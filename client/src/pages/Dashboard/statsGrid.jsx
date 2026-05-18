import {
  FiTrendingUp,
  FiZap,
  FiAward,
  FiTarget,
} from 'react-icons/fi';

import StatCard from './statsCard.jsx';

export default function StatsGrid({ user }) {
  const stats = [
    {
      label: 'ELO Rating',
      value: user?.eloRating || 0,
      icon: FiTrendingUp,
      color: 'text-battle-accent',
      bg: 'bg-battle-accent/10',
    },
    {
      label: 'Battles',
      value: user?.battlesPlayed || 0,
      icon: FiZap,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      label: 'Wins',
      value: user?.wins || 0,
      icon: FiAward,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
    },
    {
      label: 'Win Rate',
      value: `${
        user?.battlesPlayed
          ? Math.round(
              (user.wins / user.battlesPlayed) * 100
            )
          : 0
      }%`,
      icon: FiTarget,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <StatCard
          key={stat.label}
          {...stat}
          delay={i * 0.05}
        />
      ))}
    </div>
  );
}