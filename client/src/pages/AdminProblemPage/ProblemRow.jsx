import { motion }
  from 'framer-motion';

import {
  FiEdit2,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
} from 'react-icons/fi';

import {
  useState,
} from 'react';

import api from '../../client/apiClient.js';

import toast from 'react-hot-toast';

import {
  DIFFICULTY_COLORS,
} from './problemConstants.js';

export default function ProblemRow({
  problem,
  onEdit,
  onDelete,
  onToggle,
}) {
  const [toggling, setToggling] =
    useState(false);

  const handleToggle =
    async () => {
      setToggling(true);

      try {
        await api.patch(
          `/problems/${problem._id}/toggle`
        );

        onToggle();

        toast.success(
          `${problem.isActive ? 'Deactivated' : 'Activated'} "${problem.title}"`
        );
      } catch {
        toast.error(
          'Failed to toggle problem'
        );
      } finally {
        setToggling(false);
      }
    };

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-battle-border hover:bg-white/2 transition-colors"
    >
      <td className="px-5 py-4">
        <div className="font-medium text-white">
          {problem.title}
        </div>

        <div className="flex flex-wrap gap-1 mt-1">
          {problem.tags
            ?.slice(0, 3)
            .map((tag) => (
              <span
                key={tag}
                className="text-xs px-1.5 py-0.5 rounded bg-battle-border text-battle-muted"
              >
                {tag}
              </span>
            ))}
        </div>
      </td>

      <td className="px-5 py-4">
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-bold border capitalize ${DIFFICULTY_COLORS[problem.difficulty]}`}
        >
          {problem.difficulty}
        </span>
      </td>

      <td className="px-5 py-4 text-battle-muted text-sm font-mono">
        {
          problem.testCases
            ?.length
        }{' '}
        /{' '}
        {
          problem.hiddenTestCases
            ?.length
        }
      </td>

      <td className="px-5 py-4 text-battle-muted text-sm font-mono">
        {problem.timeLimitMs}
        ms
      </td>

      <td className="px-5 py-4">
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`flex items-center gap-1.5 text-sm font-medium transition-all ${
            problem.isActive
              ? 'text-green-400 hover:text-green-300'
              : 'text-battle-muted hover:text-white'
          }`}
        >
          {toggling ? (
            <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
          ) : problem.isActive ? (
            <FiToggleRight className="w-5 h-5" />
          ) : (
            <FiToggleLeft className="w-5 h-5" />
          )}

          {problem.isActive
            ? 'Active'
            : 'Inactive'}
        </button>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              onEdit(problem)
            }
            className="p-2 text-battle-muted hover:text-battle-accent hover:bg-battle-accent/10 rounded-lg transition-all"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>

          <button
            onClick={() =>
              onDelete(problem)
            }
            className="p-2 text-battle-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}