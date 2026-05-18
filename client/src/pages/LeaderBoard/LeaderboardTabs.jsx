import {
  FiGlobe,
  FiCalendar,
} from 'react-icons/fi';

export default function LeaderboardTabs({
  tab,
  setTab,
}) {
  const tabs = [
    {
      key: 'global',
      icon: FiGlobe,
      label: 'All Time',
    },
    {
      key: 'weekly',
      icon: FiCalendar,
      label: 'This Week',
    },
  ];

  return (
    <div className="flex gap-2">
      {tabs.map(
        ({
          key,
          icon: Icon,
          label,
        }) => {
          const active =
            tab === key;

          return (
            <button
              key={key}
              onClick={() =>
                setTab(key)
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all font-medium text-sm ${
                active
                  ? 'bg-battle-accent text-battle-bg border-battle-accent'
                  : 'border-battle-border text-battle-muted hover:text-white hover:border-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />

              {label}
            </button>
          );
        }
      )}
    </div>
  );
}