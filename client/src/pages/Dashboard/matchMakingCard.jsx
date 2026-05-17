import { motion } from 'framer-motion';

import MatchFound from './matchFound.jsx';
import SearchingState from './searchingState.jsx';
import IdleState from './idleState.jsx';

export default function MatchmakingCard(props) {
  const {
    isSearching,
    matchFound,
  } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-battle-card border border-battle-border rounded-2xl p-8 text-center relative overflow-hidden"
    >
      {isSearching && (
        <div className="absolute inset-0 bg-battle-accent/5 animate-pulse pointer-events-none" />
      )}

      {matchFound ? (
        <MatchFound {...props} />
      ) : isSearching ? (
        <SearchingState {...props} />
      ) : (
        <IdleState {...props} />
      )}
    </motion.div>
  );
}