import { AnimatePresence, motion } from 'framer-motion';

import {
  FiAward,
  FiXCircle,
  FiCheckCircle,
} from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';

export default function ResultOverlay({
  show,
  result,
  setShowResult,
}) {
  const navigate = useNavigate();

  if (!result) return null;

  const {
    isWinner,
    winnerUsername,
    passedCount,
    totalTests,
  } = result;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
              y: 30,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 18,
            }}
            className="w-full max-w-md bg-battle-card border border-battle-border rounded-3xl p-8 text-center shadow-2xl"
          >
            {/* ICON */}
            <div
              className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 ${
                isWinner
                  ? 'bg-yellow-500/10 border border-yellow-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
              }`}
            >
              {isWinner ? (
                <FiAward className="w-12 h-12 text-yellow-400" />
              ) : (
                <FiXCircle className="w-12 h-12 text-red-400" />
              )}
            </div>

            {/* TITLE */}
            <h2
              className={`font-display font-black text-4xl mb-3 ${
                isWinner
                  ? 'text-yellow-400'
                  : 'text-red-400'
              }`}
            >
              {isWinner
                ? 'VICTORY'
                : 'DEFEAT'}
            </h2>

            {/* SUBTITLE */}
            <p className="text-battle-muted text-lg mb-8">
              {isWinner
                ? 'You conquered the arena!'
                : `${winnerUsername} won the battle`}
            </p>

            {/* TEST RESULTS */}
            <div className="bg-battle-surface border border-battle-border rounded-2xl p-5 mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <FiCheckCircle className="w-5 h-5 text-battle-accent" />

                <span className="text-white font-semibold">
                  Test Results
                </span>
              </div>

              <div className="font-display font-black text-4xl text-battle-accent">
                {passedCount}
                <span className="text-battle-muted text-2xl">
                  /{totalTests}
                </span>
              </div>

              <div className="text-battle-muted text-sm mt-2">
                Test cases passed
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setShowResult(false)
                }
                className="flex-1 border border-battle-border text-battle-muted hover:text-white hover:border-white/20 py-3 rounded-xl font-bold transition-all"
              >
                Stay
              </button>

              <button
                onClick={() =>
                  navigate('/dashboard')
                }
                className="flex-1 bg-battle-accent text-battle-bg py-3 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all"
              >
                Dashboard
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}