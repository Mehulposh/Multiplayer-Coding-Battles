import { Link } from 'react-router-dom';
import { FiZap } from 'react-icons/fi';

export default function Logo() {
  return (
    <Link to="/dashboard" className="flex items-center gap-2 group">
      <div className="relative">
        <FiZap className="w-7 h-7 text-battle-accent animate-glow" />
        <div className="absolute inset-0 blur-md bg-battle-accent/30 rounded-full" />
      </div>

      <span className="font-display font-bold text-xl text-white tracking-tight">
        Code<span className="text-battle-accent">Battle</span>
      </span>
    </Link>
  );
}