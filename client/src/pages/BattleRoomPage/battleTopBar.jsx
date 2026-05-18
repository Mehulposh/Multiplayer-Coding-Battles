import { FiUsers } from 'react-icons/fi';

import PlayerCard from './playerCard.jsx'
import BattleTimer from './battleTimmer.jsx';

export default function BattleTopBar({
  
  me,
  opponent,
  battle,
  isTimeWarning,
  timeLeft,
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-battle-surface border-b border-battle-border shrink-0">
      <div className="flex items-center gap-3">
        <PlayerCard player={me} />

        <div className="text-battle-muted font-bold text-sm px-2">
          VS
        </div>

        <PlayerCard
          player={opponent}
          isOpponent
          isTyping={battle.opponentTyping}
        />
      </div>

      <BattleTimer
        battle={battle}
        isTimeWarning={isTimeWarning}
        timeLeft={timeLeft}
      />

      <div className="flex items-center gap-3">
        {battle.spectatorCount > 0 && (
          <div className="flex items-center gap-1.5 text-battle-muted text-sm">
            <FiUsers className="w-4 h-4" />
            {battle.spectatorCount}
          </div>
        )}
      </div>
    </div>
  );
}