export default function ExampleBlock({
  example,
  index,
}) {
  return (
    <div className="bg-battle-bg border border-battle-border rounded-xl p-4">
      <div className="text-sm font-bold text-white mb-3">
        Example {index + 1}
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <div className="text-battle-muted mb-1">
            Input
          </div>

          <pre className="bg-black/30 rounded-lg p-3 overflow-x-auto text-battle-accent font-mono">
            {example.input}
          </pre>
        </div>

        <div>
          <div className="text-battle-muted mb-1">
            Output
          </div>

          <pre className="bg-black/30 rounded-lg p-3 overflow-x-auto text-green-400 font-mono">
            {example.output}
          </pre>
        </div>

        {example.explanation && (
          <div>
            <div className="text-battle-muted mb-1">
              Explanation
            </div>

            <p className="text-white leading-relaxed">
              {example.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}