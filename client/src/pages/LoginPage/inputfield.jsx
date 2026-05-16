export default function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-battle-muted mb-2">
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-battle-muted" />

        <input
          type={type}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
          className="w-full bg-battle-surface border border-battle-border rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-battle-muted focus:outline-none focus:border-battle-accent/50 focus:ring-1 focus:ring-battle-accent/30 transition-all"
        />
      </div>
    </div>
  );
}