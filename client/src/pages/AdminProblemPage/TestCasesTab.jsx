import {
  FiTrash2,
} from 'react-icons/fi';

import SectionHeader
  from './SectionHeader.jsx';

import FormTextarea
  from './FormTextarea.jsx';

export default function TestCasesTab({
  form,
  errors,
  updateField,
}) {
  const updateCase = (
    type,
    index,
    key,
    value
  ) => {
    const next = [
      ...form[type],
    ];

    next[index][key] =
      value;

    updateField(type, next);
  };

  const addCase = (
    type
  ) => {
    updateField(type, [
      ...form[type],
      {
        input: '',
        expected: '',
      },
    ]);
  };

  const removeCase = (
    type,
    index
  ) => {
    updateField(
      type,
      form[type].filter(
        (_, i) =>
          i !== index
      )
    );
  };

  const renderCases = (
    type,
    title
  ) => (
    <div className="space-y-4">
      <SectionHeader
        title={title}
        onAdd={() =>
          addCase(type)
        }
        addLabel="Add Test"
      />

      {form[type].map(
        (tc, index) => (
          <div
            key={index}
            className="border border-battle-border rounded-xl p-4 space-y-4 bg-battle-surface/40"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">
                Test{' '}
                {index + 1}
              </h3>

              {form[type]
                .length >
                1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeCase(
                      type,
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
              value={tc.input}
              onChange={(e) =>
                updateCase(
                  type,
                  index,
                  'input',
                  e.target
                    .value
                )
              }
            />

            <FormTextarea
              label="Expected Output"
              rows={3}
              value={
                tc.expected
              }
              onChange={(e) =>
                updateCase(
                  type,
                  index,
                  'expected',
                  e.target
                    .value
                )
              }
            />
          </div>
        )
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {errors.testCases && (
        <div className="text-red-400 text-sm">
          {
            errors.testCases
          }
        </div>
      )}

      {renderCases(
        'testCases',
        'Visible Test Cases'
      )}

      {renderCases(
        'hiddenTestCases',
        'Hidden Test Cases'
      )}
    </div>
  );
}