import FormInput
  from './FormInput.jsx';

import FormTextarea
  from './FormTextarea.jsx';

import {
  DIFFICULTIES,
} from './problemConstants.js';

export default function BasicTab({
  form,
  errors,
  updateField,
}) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <FormInput
          label="Problem Title"
          value={form.title}
          onChange={(e) =>
            updateField(
              'title',
              e.target.value
            )
          }
          placeholder="Two Sum"
          error={errors.title}
        />

        <div>
          <label className="block text-sm font-medium text-battle-muted mb-1">
            Difficulty
          </label>

          <select
            value={
              form.difficulty
            }
            onChange={(e) =>
              updateField(
                'difficulty',
                e.target.value
              )
            }
            className="w-full bg-battle-surface border border-battle-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-battle-accent/50"
          >
            {DIFFICULTIES.map(
              (d) => (
                <option
                  key={d}
                  value={d}
                >
                  {d}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <FormTextarea
        label="Description"
        rows={8}
        value={form.description}
        onChange={(e) =>
          updateField(
            'description',
            e.target.value
          )
        }
        placeholder="Write the full problem description..."
      />

      <div className="grid md:grid-cols-2 gap-4">
        <FormInput
          label="Tags"
          value={form.tags}
          onChange={(e) =>
            updateField(
              'tags',
              e.target.value
            )
          }
          placeholder="array, hash-map"
        />

        <FormInput
          label="Time Limit (ms)"
          type="number"
          value={
            form.timeLimitMs
          }
          onChange={(e) =>
            updateField(
              'timeLimitMs',
              Number(
                e.target.value
              )
            )
          }
        />
      </div>

      <FormInput
        label="Memory Limit (MB)"
        type="number"
        value={
          form.memoryLimitMb
        }
        onChange={(e) =>
          updateField(
            'memoryLimitMb',
            Number(
              e.target.value
            )
          )
        }
      />

      <div>
        <label className="block text-sm font-medium text-battle-muted mb-2">
          Constraints
        </label>

        <div className="space-y-2">
          {form.constraints.map(
            (
              constraint,
              index
            ) => (
              <input
                key={index}
                value={
                  constraint
                }
                onChange={(
                  e
                ) => {
                  const next =
                    [
                      ...form.constraints,
                    ];

                  next[
                    index
                  ] =
                    e.target.value;

                  updateField(
                    'constraints',
                    next
                  );
                }}
                placeholder="1 <= nums.length <= 1000"
                className="w-full bg-battle-surface border border-battle-border rounded-lg px-3 py-2 text-white text-sm"
              />
            )
          )}

          <button
            type="button"
            onClick={() =>
              updateField(
                'constraints',
                [
                  ...form.constraints,
                  '',
                ]
              )
            }
            className="text-sm text-battle-accent hover:underline"
          >
            + Add Constraint
          </button>
        </div>
      </div>
    </div>
  );
}