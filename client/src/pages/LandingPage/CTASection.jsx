import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function CTASection() {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-24 text-center">
      <div className="bg-gradient-to-br from-battle-accent/10 to-battle-accent2/10 border border-battle-border rounded-3xl p-16">
        <h2 className="font-display font-black text-5xl text-white mb-4">
          Ready to fight?
        </h2>

        <p className="text-battle-muted text-lg mb-8">
          Join thousands of developers in the arena
        </p>

        <Link
          to="/register"
          className="inline-flex items-center gap-2 bg-battle-accent text-battle-bg px-10 py-4 rounded-xl font-bold text-lg"
        >
          Create Free Account
          <FiArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}