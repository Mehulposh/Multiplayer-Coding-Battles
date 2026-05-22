export const DIFFICULTY_COLORS = {
  easy:
    'text-green-400 bg-green-400/10 border-green-400/30',

  medium:
    'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',

  hard:
    'text-red-400 bg-red-400/10 border-red-400/30',
};

export const STATUS_COLORS = {
  waiting:
    'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',

  countdown:
    'text-blue-400 bg-blue-400/10 border-blue-400/30',

  active:
    'text-green-400 bg-green-400/10 border-green-400/30',

  finished:
    'text-battle-muted bg-battle-border/30 border-battle-border',
};

export const ELO_TIERS = [
  {
    min: 2000,
    label: 'Grandmaster',
    color: 'text-yellow-400',
  },

  {
    min: 1600,
    label: 'Master',
    color: 'text-purple-400',
  },

  {
    min: 1400,
    label: 'Diamond',
    color: 'text-blue-400',
  },

  {
    min: 1200,
    label: 'Platinum',
    color: 'text-cyan-400',
  },

  {
    min: 1000,
    label: 'Gold',
    color: 'text-yellow-500',
  },

  {
    min: 0,
    label: 'Silver',
    color: 'text-slate-400',
  },
];