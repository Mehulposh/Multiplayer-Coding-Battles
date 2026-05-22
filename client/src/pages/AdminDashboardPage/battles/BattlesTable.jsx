import LoadingState
  from '../components/LoadingState.jsx';

import BattleRow
  from './BattleRow.jsx';

export default function BattlesTable({
  battles,
  loading,
}) {
  if (loading) {
    return (
      <LoadingState text="Loading battles..." />
    );
  }

  return (
    <div className="bg-battle-card border border-battle-border rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-battle-border">
            <th className="px-5 py-3 text-left">
              Players
            </th>

            <th className="px-5 py-3 text-left">
              Status
            </th>

            <th className="px-5 py-3 text-left">
              Winner
            </th>
          </tr>
        </thead>

        <tbody>
          {battles.map(
            (battle) => (
              <BattleRow
                key={
                  battle._id
                }
                battle={
                  battle
                }
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}