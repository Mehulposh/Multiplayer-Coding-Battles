export default function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="gradient-border p-6 rounded-2xl">
      <div className="w-12 h-12 rounded-xl bg-battle-accent/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-battle-accent" />
      </div>

      <h3 className="font-display font-bold text-white text-lg mb-2">
        {title}
      </h3>

      <p className="text-battle-muted text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}