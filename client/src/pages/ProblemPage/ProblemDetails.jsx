import ExampleBlock from './ExampleBlock';
import ConstraintsList from './ConstraintsList';
import LanguagesList from './LanguagesList';

export default function ProblemDetails({
  problem,
}) {
  return (
    <div className="mt-5 space-y-6 border-t border-battle-border pt-5">
      {/* DESCRIPTION */}
      <div>
        <h3 className="font-bold text-white mb-3">
          Description
        </h3>

        <div className="text-battle-muted leading-relaxed whitespace-pre-wrap">
          {problem.description}
        </div>
      </div>

      {/* EXAMPLES */}
      {problem.examples?.length >
        0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-white">
            Examples
          </h3>

          {problem.examples.map(
            (example, i) => (
              <ExampleBlock
                key={i}
                example={example}
                index={i}
              />
            )
          )}
        </div>
      )}

      {/* CONSTRAINTS */}
      <ConstraintsList
        constraints={
          problem.constraints
        }
      />

      {/* LANGUAGES */}
      <LanguagesList
        starterCode={
          problem.starterCode
        }
      />
    </div>
  );
}