export default function BattleRow({
  battle,
}) {
  return (
    <tr className="border-b border-battle-border">
      <td className="px-5 py-3">
        {battle.players
          ?.map(
            (p) =>
              p.username ||
              p.user
                ?.username
          )
          .join(' vs ')}
      </td>

      <td className="px-5 py-3 capitalize">
        {battle.status}
      </td>

      <td className="px-5 py-3">
        {battle.winner
          ?.username ||
          '—'}
      </td>
    </tr>
  );
}