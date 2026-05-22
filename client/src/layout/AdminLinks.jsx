import {
  Link,
  useLocation,
} from 'react-router-dom';

import {
  adminLinks,
} from './navConfig.js';

export default function AdminLinks() {
  const location =
    useLocation();

  return (
    <>
      <div className="w-px h-5 bg-battle-border mx-1" />

      <div className="flex items-center gap-1">
        {adminLinks.map(
          ({
            to,
            icon: Icon,
            label,
          }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${
                location.pathname ===
                to
                  ? 'bg-purple-400/10 text-purple-400'
                  : 'text-battle-muted hover:text-purple-400 hover:bg-purple-400/5'
              }`}
            >
              <Icon className="w-4 h-4" />

              {label}
            </Link>
          )
        )}
      </div>
    </>
  );
}