import LeaderboardRow from './LeaderboardRow.jsx';

export default function LeaderboardTable({
  data,
  user,
}) {
  return (
    <div className="bg-battle-card border border-battle-border rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-battle-border bg-battle-surface/50">
              <th className="px-5 py-3 text-left text-xs font-bold text-battle-muted uppercase tracking-wider w-16">
                Rank
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold text-battle-muted uppercase tracking-wider">
                Player
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold text-battle-muted uppercase tracking-wider">
                ELO
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold text-battle-muted uppercase tracking-wider">
                W / L
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold text-battle-muted uppercase tracking-wider">
                Win Rate
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold text-battle-muted uppercase tracking-wider">
                Battles
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((entry, i) => (
              <LeaderboardRow
                key={
                  entry.id ||
                  entry._id ||
                  i
                }
                entry={entry}
                currentUsername={
                  user?.username
                }
                index={i}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}