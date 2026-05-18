export default function ExampleCard({
  example,
  index,
}) {
  return (
    <div className="bg-battle-card border border-battle-border rounded-xl p-4">
      <div className="text-battle-muted text-xs font-bold mb-2">
        EXAMPLE {index + 1}
      </div>

      <div className="space-y-1 font-mono text-xs">
        <div>
          <span className="text-battle-muted">
            Input:
          </span>{' '}
          <span className="text-white">
            {example.input}
          </span>
        </div>

        <div>
          <span className="text-battle-muted">
            Output:
          </span>{' '}
          <span className="text-battle-accent">
            {example.output}
          </span>
        </div>
      </div>
    </div>
  );
}