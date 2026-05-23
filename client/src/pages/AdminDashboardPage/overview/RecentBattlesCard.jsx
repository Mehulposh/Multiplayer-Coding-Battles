import {
  formatDistanceToNow,
} from 'date-fns';

import {
  FiZap,
} from 'react-icons/fi';

export default function RecentBattlesCard({
  battles,
}) {
  console.log('recent battles' , battles);
  
  return (
    <div className="bg-battle-card border border-battle-border rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-battle-border flex items-center gap-2">
        <FiZap className="w-4 h-4 text-battle-accent" />

        <h3 className="font-display font-bold text-white">
          Recent Battles
        </h3>
      </div>

      {battles?.length ===
      0 ? (
        <div className="p-8 text-center text-battle-muted">
          No recent battles
        </div>
      ) : (
        <div className="divide-y divide-battle-border">
          {battles?.map(
            (battle) => (
              <div
                key={
                  battle._id
                }
                className="px-5 py-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="text-white text-sm font-medium">
                    {battle.players
                      ?.map(
                        (
                          p
                        ) =>
                          p
                            .user
                            ?.username
                      )
                      .join(
                        ' vs '
                      )}
                  </div>

                  <span className="text-xs text-battle-muted capitalize">
                    {
                      battle.status
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-battle-accent">
                    {
                      battle
                        .problem
                        ?.title
                    }
                  </span>

                  <span className="text-battle-muted">
                    {formatDistanceToNow(
                      new Date(
                        battle.createdAt
                      ),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}