import { Link } from 'react-router-dom';
import { FiZap } from 'react-icons/fi';

export default function LandingNavbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <FiZap className="w-7 h-7 text-battle-accent animate-glow" />

        <span className="font-display font-bold text-xl text-white">
          Code<span className="text-battle-accent">Battle</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="text-battle-muted hover:text-white transition-colors text-sm font-medium"
        >
          Sign In
        </Link>

        <Link
          to="/register"
          className="bg-battle-accent text-battle-bg px-4 py-2 rounded-lg text-sm font-bold hover:bg-battle-accent/90 transition-all"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}