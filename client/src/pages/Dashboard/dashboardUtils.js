export const formatTime = (secs) => {
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, '0');

  const s = (secs % 60)
    .toString()
    .padStart(2, '0');

  return `${m}:${s}`;
};

export const getRankLabel = (elo) => {
  if (elo >= 2000)
    return {
      label: 'Grandmaster',
      color: 'text-yellow-400',
    };

  if (elo >= 1600)
    return {
      label: 'Master',
      color: 'text-purple-400',
    };

  if (elo >= 1400)
    return {
      label: 'Diamond',
      color: 'text-blue-400',
    };

  if (elo >= 1200)
    return {
      label: 'Platinum',
      color: 'text-cyan-400',
    };

  if (elo >= 1000)
    return {
      label: 'Gold',
      color: 'text-yellow-500',
    };

  return {
    label: 'Silver',
    color: 'text-gray-400',
  };
};