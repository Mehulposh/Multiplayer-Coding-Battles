import { Link, useLocation } from 'react-router-dom';
import {
  FiBarChart2,
  FiCode,
  FiHome,
  FiShield,
} from 'react-icons/fi';

export default function NavLinks() {
  const location = useLocation();

  const navLinks = [
    { to: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/leaderboard', icon: FiBarChart2, label: 'Leaderboard' },
    { to: '/problems', icon: FiCode, label: 'Problems' },
    { to: '/admin/problems', icon: FiShield, label: 'Admin', adminOnly: true, },
  ];

  return (
    <div className="hidden md:flex items-center gap-1">
      {navLinks.map(({ to, icon: Icon, label, adminOnly }) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            location.pathname === to
              ? adminOnly
                ? 'bg-purple-500/10 text-purple-400'
                : 'bg-battle-accent/10 text-battle-accent'
              : adminOnly
              ? 'text-battle-muted hover:text-purple-400 hover:bg-purple-500/5'
              : 'text-battle-muted hover:text-white hover:bg-white/5'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Link>
      ))}
    </div>
  );
}