import { motion } from 'framer-motion';
import { features } from './data.js';
import FeatureCard from './featureCard.jsx';

export default function FeaturesSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="font-display font-black text-4xl text-white mb-4">
          Built for serious coders
        </h2>

        <p className="text-battle-muted text-lg">
          Everything you need to compete at the highest level
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}