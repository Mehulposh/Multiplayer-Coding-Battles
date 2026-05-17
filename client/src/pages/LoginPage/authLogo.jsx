import { Link } from 'react-router-dom';
import { FiZap } from 'react-icons/fi';

export default function AuthLogo({ title, subtitle }) {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="inline-flex items-center gap-2 mb-6">
        <FiZap className="w-8 h-8 text-battle-accent" />

        <span className="font-display font-bold text-2xl text-white">
          Code<span className="text-battle-accent">Battle</span>
        </span>
      </Link>

      <h1 className="font-display font-black text-3xl text-white">
       {title}
      </h1>

      <p className="text-battle-muted mt-2">
       {subtitle}
      </p>
    </div>
  );
}