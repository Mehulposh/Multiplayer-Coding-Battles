import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import CodePreview from './codePreview.jsx';

export default function HeroSection() {
  return (
    <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-battle-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="absolute top-20 right-10 w-64 h-64 bg-battle-accent2/10 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 bg-battle-accent/10 border border-battle-accent/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-battle-accent rounded-full animate-pulse" />
          <span className="text-battle-accent text-sm font-mono">
            Live battles running now
          </span>
        </div>

        <h1 className="font-display text-6xl md:text-8xl font-black text-white leading-none mb-6">
          CODE.<br />
          <span className="text-battle-accent">COMPETE.</span><br />
          CONQUER.
        </h1>

        <p className="text-battle-muted text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Real-time 1v1 coding battles where the fastest, most elegant solution wins.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/register"
            className="group flex items-center gap-2 bg-battle-accent text-battle-bg px-8 py-4 rounded-xl font-bold text-lg"
          >
            Start Battling
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>

      <CodePreview />
    </div>
  );
}