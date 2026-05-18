export default function PlayerCard({
  player,
  isOpponent,
  isTyping,
}) {
  if (!player) {
    return (
      <div className="flex items-center gap-2 opacity-50">
        <div className="w-8 h-8 rounded-full border border-dashed border-battle-border flex items-center justify-center text-battle-muted">
          ?
        </div>

        <div className="text-battle-muted text-sm">
          Waiting...
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
          isOpponent
            ? 'bg-red-500/20 border border-red-500/40 text-red-400'
            : 'bg-battle-accent/20 border border-battle-accent/40 text-battle-accent'
        }`}
      >
        {player.username?.[0]?.toUpperCase()}
      </div>

      <div>
        <div className="text-white text-sm font-semibold leading-none flex items-center gap-2">
          {player.username}

          {isTyping && (
            <span className="flex gap-0.5 items-end">
              <span className="typing-dot w-1 h-1 bg-battle-accent rounded-full" />
              <span className="typing-dot w-1 h-1 bg-battle-accent rounded-full" />
              <span className="typing-dot w-1 h-1 bg-battle-accent rounded-full" />
            </span>
          )}
        </div>

        <div className="text-battle-muted text-xs">
          {player.eloRating} ELO
        </div>
      </div>
    </div>
  );
}