import {
  useState,
} from 'react';

import { motion } from 'framer-motion';

import {
  FiChevronDown,
  FiChevronUp,
  FiTag,
} from 'react-icons/fi';

import ProblemDetails from './ProblemDetails.jsx';

import {
  DIFFICULTY_STYLES,
} from './problemConstants.js';

export default function ProblemCard({
  problem,
  index,
}) {
  const [expanded, setExpanded] =
    useState(false);

  const difficulty =
    problem.difficulty?.toLowerCase();

  const style =
    DIFFICULTY_STYLES[
      difficulty
    ] ||
    DIFFICULTY_STYLES.easy;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: Math.min(
          index * 0.03,
          0.3
        ),
      }}
      className="bg-battle-card border border-battle-border rounded-2xl overflow-hidden"
    >
      {/* HEADER */}
      <button
        onClick={() =>
          setExpanded(!expanded)
        }
        className="w-full px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <div
                className={`px-3 py-1 rounded-xl text-xs font-bold border capitalize ${style.bg} ${style.text} ${style.border}`}
              >
                {problem.difficulty}
              </div>

              <div className="text-battle-muted text-sm font-mono">
                #{index + 1}
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl text-white">
                {problem.title}
              </h2>

              <p className="text-battle-muted text-sm mt-2 line-clamp-2">
                {problem.description}
              </p>
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2">
              {problem.tags?.map(
                (tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-battle-surface border border-battle-border text-xs text-battle-muted"
                  >
                    <FiTag className="w-3 h-3" />
                    {tag}
                  </div>
                )
              )}
            </div>
          </div>

          {/* TOGGLE */}
          <div className="shrink-0 pt-1">
            {expanded ? (
              <FiChevronUp className="w-5 h-5 text-battle-muted" />
            ) : (
              <FiChevronDown className="w-5 h-5 text-battle-muted" />
            )}
          </div>
        </div>
      </button>

      {/* DETAILS */}
      {expanded && (
        <div className="px-6 pb-6">
          <ProblemDetails
            problem={problem}
          />
        </div>
      )}
    </motion.div>
  );
}