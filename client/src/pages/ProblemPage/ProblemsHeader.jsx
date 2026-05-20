export default function ProblemsHeader({
  total,
}) {
  return (
    <div>
      <h1 className="font-display font-black text-3xl text-white">
        Problems
      </h1>

      <p className="text-battle-muted mt-1">
        Browse all{' '}
        <span className="text-battle-accent font-mono">
          {total}
        </span>{' '}
        problems. These are the
        problems used in battles.
      </p>
    </div>
  );
}