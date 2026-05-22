import {
  FiTrash2,
  FiPlus,
} from 'react-icons/fi';

import SectionHeader
  from './SectionHeader.jsx';

import FormTextarea
  from './FormTextarea.jsx';

export default function ExamplesTab({
  form,
  updateField,
}) {
  const updateExample = (
    index,
    key,
    value
  ) => {
    const next = [
      ...form.examples,
    ];

    next[index][key] =
      value;

    updateField(
      'examples',
      next
    );
  };

  const removeExample = (
    index
  ) => {
    updateField(
      'examples',
      form.examples.filter(
        (_, i) =>
          i !== index
      )
    );
  };

  const addExample = () => {
    updateField(
      'examples',
      [
        ...form.examples,
        {
          input: '',
          output: '',
          explanation:
            '',
        },
      ]
    );
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Examples"
        onAdd={addExample}
        addLabel="Add Example"
      />

      {form.examples.map(
        (example, index) => (
          <div
            key={index}
            className="border border-battle-border rounded-xl p-4 space-y-4 bg-battle-surface/40"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">
                Example{' '}
                {index + 1}
              </h3>

              {form.examples
                .length >
                1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeExample(
                      index
                    )
                  }
                  className="text-red-400 hover:text-red-300"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <FormTextarea
              label="Input"
              rows={3}
              value={
                example.input
              }
              onChange={(e) =>
                updateExample(
                  index,
                  'input',
                  e.target
                    .value
                )
              }
            />

            <FormTextarea
              label="Output"
              rows={3}
              value={
                example.output
              }
              onChange={(e) =>
                updateExample(
                  index,
                  'output',
                  e.target
                    .value
                )
              }
            />

            <FormTextarea
              label="Explanation"
              rows={3}
              value={
                example.explanation
              }
              onChange={(e) =>
                updateExample(
                  index,
                  'explanation',
                  e.target
                    .value
                )
              }
            />
          </div>
        )
      )}

      <button
        type="button"
        onClick={addExample}
        className="flex items-center gap-2 text-sm text-battle-accent hover:underline"
      >
        <FiPlus className="w-4 h-4" />

        Add Another Example
      </button>
    </div>
  );
}