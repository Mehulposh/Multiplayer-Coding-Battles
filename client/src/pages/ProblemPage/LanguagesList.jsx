export default function LanguagesList({
  starterCode,
}) {
  if (!starterCode) return null;

  const languages =
    Object.keys(starterCode);

  return (
    <div>
      <h3 className="font-bold text-white mb-3">
        Supported Languages
      </h3>

      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <div
            key={lang}
            className="px-3 py-1.5 rounded-lg bg-battle-accent/10 border border-battle-accent/20 text-battle-accent text-sm font-medium capitalize"
          >
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
}