export default function RankBadge({
  rank,
}) {
  if (!rank) return null;

  return (
    <div className="text-right">
      <div className="text-battle-muted text-xs uppercase tracking-wider">
        Global Rank
      </div>

      <div className="font-display font-black text-3xl text-battle-accent">
        #{rank}
      </div>
    </div>
  );
}