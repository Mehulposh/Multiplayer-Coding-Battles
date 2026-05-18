export const RANK_STYLES = {
  1: {
    bg: 'bg-yellow-400/10 border-yellow-400/30',
    text: 'text-yellow-400',
    label: '🥇',
  },
  2: {
    bg: 'bg-slate-400/10 border-slate-400/30',
    text: 'text-slate-300',
    label: '🥈',
  },
  3: {
    bg: 'bg-orange-400/10 border-orange-400/30',
    text: 'text-orange-400',
    label: '🥉',
  },
};

export const ELO_TIERS = [
  {
    min: 2000,
    label: 'Grandmaster',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    min: 1600,
    label: 'Master',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    min: 1400,
    label: 'Diamond',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    min: 1200,
    label: 'Platinum',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
  {
    min: 1000,
    label: 'Gold',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  {
    min: 0,
    label: 'Silver',
    color: 'text-slate-400',
    bg: 'bg-slate-400/10',
  },
];

export function getTier(elo) {
  return (
    ELO_TIERS.find((t) => elo >= t.min) ||
    ELO_TIERS[ELO_TIERS.length - 1]
  );
}