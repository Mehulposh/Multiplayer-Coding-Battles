export default function ConstraintsList({
  constraints,
}) {
  if (
    !constraints ||
    constraints.length === 0
  ) {
    return null;
  }

  return (
    <div>
      <h3 className="font-bold text-white mb-3">
        Constraints
      </h3>

      <ul className="space-y-2">
        {constraints.map(
          (constraint, i) => (
            <li
              key={i}
              className="text-sm text-battle-muted bg-battle-bg border border-battle-border rounded-lg px-3 py-2 font-mono"
            >
              {constraint}
            </li>
          )
        )}
      </ul>
    </div>
  );
}