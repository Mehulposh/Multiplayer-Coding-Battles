import { AnimatePresence, motion } from 'framer-motion';

export default function CountdownOverlay({
  countdown,
  show,
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-battle-bg/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            key={countdown}
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="font-display font-black text-9xl text-battle-accent"
          >
            {countdown}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}