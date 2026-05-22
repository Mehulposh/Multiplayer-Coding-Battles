import {
  useEffect,
  useState,
} from 'react';

import {
  motion,
} from 'framer-motion';

import {
  FiX,
  FiSave,
} from 'react-icons/fi';

import toast from 'react-hot-toast';

import api from '../../client/apiClient.js';

import {
  EMPTY_FORM,
} from './problemConstants.js';

import BasicTab
  from './BasicTab.jsx';

import ExamplesTab
  from './ExamplesTab.jsx';

import TestCasesTab
  from './TestCasesTab.jsx';

import StarterCodeTab
  from './StarterCodeTab.jsx';

export default function ProblemFormModal({
  problem,
  onClose,
  onSaved,
}) {
  const [tab, setTab] =
    useState('basic');

  const [saving, setSaving] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [form, setForm] =
    useState(EMPTY_FORM);

  useEffect(() => {
    if (!problem) {
      setForm(EMPTY_FORM);

      return;
    }

    setForm({
      ...problem,

      tags:
        problem.tags?.join(
          ', '
        ) || '',

      constraints:
        problem.constraints
          ?.length
          ? problem.constraints
          : [''],

      examples:
        problem.examples
          ?.length
          ? problem.examples
          : [
              {
                input: '',
                output: '',
                explanation:
                  '',
              },
            ],

      testCases:
        problem.testCases
          ?.length
          ? problem.testCases
          : [
              {
                input: '',
                expected:
                  '',
              },
            ],

      hiddenTestCases:
        problem
          .hiddenTestCases
          ?.length
          ? problem.hiddenTestCases
          : [
              {
                input: '',
                expected:
                  '',
              },
            ],
    });
  }, [problem]);

  const updateField = (
    key,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate =
    () => {
      const nextErrors = {};

      if (
        !form.title.trim()
      ) {
        nextErrors.title =
          'Title is required';
      }

      if (
        !form.description.trim()
      ) {
        nextErrors.description =
          'Description is required';
      }

      if (
        form.testCases
          .length === 0
      ) {
        nextErrors.testCases =
          'At least one test case required';
      }

      setErrors(nextErrors);

      return (
        Object.keys(
          nextErrors
        ).length === 0
      );
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (!validate()) {
        toast.error(
          'Please fix form errors'
        );

        return;
      }

      setSaving(true);

      try {
        const payload = {
          ...form,

          tags: form.tags
            .split(',')
            .map((t) =>
              t.trim()
            )
            .filter(Boolean),
        };

        if (problem) {
          await api.put(
            `/problems/${problem._id}`,
            payload
          );

          toast.success(
            'Problem updated'
          );
        } else {
          await api.post(
            '/problems',
            payload
          );

          toast.success(
            'Problem created'
          );
        }

        onSaved();

        onClose();
      } catch (err) {
        toast.error(
          err.response?.data
            ?.message ||
            'Failed to save problem'
        );
      } finally {
        setSaving(false);
      }
    };

  const tabs = [
    {
      id: 'basic',
      label: 'Basic',
    },
    {
      id: 'examples',
      label: 'Examples',
    },
    {
      id: 'tests',
      label: 'Tests',
    },
    {
      id: 'starter',
      label: 'Starter Code',
    },
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
        }}
        className="w-full max-w-6xl max-h-[95vh] overflow-hidden bg-battle-card border border-battle-border rounded-2xl flex flex-col"
      >
        {/* HEADER */}

        <div className="flex items-center justify-between p-5 border-b border-battle-border">
          <div>
            <h2 className="font-display font-black text-2xl text-white">
              {problem
                ? 'Edit Problem'
                : 'Create Problem'}
            </h2>

            <p className="text-battle-muted text-sm mt-1">
              Configure coding
              challenge details
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-battle-muted hover:text-white hover:bg-white/5 transition-all"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* TABS */}

        <div className="flex gap-1 px-5 pt-4 border-b border-battle-border overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() =>
                setTab(t.id)
              }
              className={`px-4 py-2 rounded-t-xl text-sm font-semibold transition-all whitespace-nowrap ${
                tab === t.id
                  ? 'bg-battle-accent/10 text-battle-accent border border-battle-accent/30 border-b-transparent'
                  : 'text-battle-muted hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* BODY */}

        <form
          onSubmit={
            handleSubmit
          }
          className="flex-1 overflow-y-auto p-5"
        >
          {tab === 'basic' && (
            <BasicTab
              form={form}
              errors={errors}
              updateField={
                updateField
              }
            />
          )}

          {tab ===
            'examples' && (
            <ExamplesTab
              form={form}
              updateField={
                updateField
              }
            />
          )}

          {tab === 'tests' && (
            <TestCasesTab
              form={form}
              errors={errors}
              updateField={
                updateField
              }
            />
          )}

          {tab ===
            'starter' && (
            <StarterCodeTab
              form={form}
              updateField={
                updateField
              }
            />
          )}
        </form>

        {/* FOOTER */}

        <div className="p-5 border-t border-battle-border flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-battle-border text-battle-muted hover:text-white hover:bg-white/5 transition-all"
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={
              handleSubmit
            }
            disabled={saving}
            className="flex items-center gap-2 bg-battle-accent text-battle-bg px-5 py-2.5 rounded-xl font-bold hover:shadow-[0_0_25px_rgba(0,255,136,0.35)] transition-all disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <FiSave className="w-4 h-4" />
            )}

            {saving
              ? 'Saving...'
              : problem
              ? 'Update Problem'
              : 'Create Problem'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}