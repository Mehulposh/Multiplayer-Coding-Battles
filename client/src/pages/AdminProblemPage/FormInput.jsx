export default function FormInput({
  label,
  error,
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-battle-muted mb-1">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`w-full bg-battle-surface border rounded-lg px-3 py-2 text-white text-sm placeholder:text-battle-muted focus:outline-none focus:ring-1 transition-all ${
          error
            ? 'border-red-500 focus:ring-red-500/30'
            : 'border-battle-border focus:border-battle-accent/50 focus:ring-battle-accent/30'
        }`}
      />

      {error && (
        <p className="text-red-400 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}