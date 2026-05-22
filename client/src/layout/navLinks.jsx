import {
  Link,
  useLocation,
} from 'react-router-dom';

import {
  navLinks,
} from './navConfig.js';

export default function NavLinks() {
  const location =
    useLocation();

  return (
    <div className="hidden md:flex items-center gap-1">
      {navLinks.map(
        ({
          to,
          icon: Icon,
          label,
        }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${
              location.pathname ===
              to
                ? 'bg-battle-accent/10 text-battle-accent'
                : 'text-battle-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon className="w-4 h-4" />

            {label}
          </Link>
        )
      )}
    </div>
  );
}