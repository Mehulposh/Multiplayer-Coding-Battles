import { Link }
  from 'react-router-dom';

import {
  FiAward,
} from 'react-icons/fi';

import {
  getTier,
} from '../utils.js';

export default function TopPlayersCard({
  topPlayers,
}) {
  return (
    <div className="bg-battle-card border border-battle-border rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-battle-border flex items-center gap-2">
        <FiAward className="w-4 h-4 text-yellow-400" />

        <h3 className="font-display font-bold text-white">
          Top Players
        </h3>
      </div>

      <div className="divide-y divide-battle-border">
        {topPlayers?.map(
          (player, i) => {
            const tier =
              getTier(
                player.eloRating
              );

            return (
              <div
                key={
                  player._id
                }
                className="flex items-center justify-between px-5 py-3"
              >
                <div>
                  <Link
                    to={`/profile/${player.username}`}
                    className="text-white"
                  >
                    #{i + 1}{' '}
                    {
                      player.username
                    }
                  </Link>

                  <div
                    className={`text-xs ${tier.color}`}
                  >
                    {
                      tier.label
                    }
                  </div>
                </div>

                <div className="text-battle-accent font-bold">
                  {
                    player.eloRating
                  }
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}