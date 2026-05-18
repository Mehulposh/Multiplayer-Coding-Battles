import ExampleCard from './examplecard.jsx';

export default function ProblemPanel({ problem }) {
  if (!problem) {
    return (
      <div className="p-8 text-center text-battle-muted">
        Loading problem...
      </div>
    );
  }

  return (
    <div className="p-5 space-y-5">
      <h2 className="font-display font-bold text-white text-xl">
        {problem.title}
      </h2>

      <div className="text-battle-muted text-sm leading-relaxed whitespace-pre-wrap">
        {problem.description}
      </div>

      {problem.examples?.map((example, i) => (
        <ExampleCard
          key={i}
          example={example}
          index={i}
        />
      ))}
    </div>
  );
}