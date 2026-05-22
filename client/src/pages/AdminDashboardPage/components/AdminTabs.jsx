

export default function AdminTabs({
  tabs,
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="flex gap-2 border-b border-battle-border">
      {tabs.map(
        ({
          key,
          icon: Icon,
          label,
        }) => (
          <button
            key={key}
            onClick={() =>
              setActiveTab(
                key
              )
            }
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold transition-all border-b-2 -mb-px ${
              activeTab ===
              key
                ? 'text-battle-accent border-battle-accent'
                : 'text-battle-muted border-transparent hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />

            {label}
          </button>
        )
      )}
    </div>
  );
}