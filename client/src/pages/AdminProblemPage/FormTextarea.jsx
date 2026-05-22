export default function FormTextarea({
  label,
  rows = 3,
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-battle-muted mb-1">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        {...props}
        className="w-full bg-battle-surface border border-battle-border rounded-lg px-3 py-2 text-white text-sm placeholder:text-battle-muted focus:outline-none focus:border-battle-accent/50 focus:ring-1 focus:ring-battle-accent/30 transition-all resize-y font-mono"
      />
    </div>
  );
}