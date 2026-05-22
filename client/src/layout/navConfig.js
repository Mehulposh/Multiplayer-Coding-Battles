import {
  FiHome,
  FiBarChart2,
  FiCode,
  FiShield,
} from 'react-icons/fi';

export const navLinks = [
  {
    to: '/dashboard',
    icon: FiHome,
    label: 'Dashboard',
  },

  {
    to: '/leaderboard',
    icon: FiBarChart2,
    label: 'Leaderboard',
  },

  {
    to: '/problems',
    icon: FiCode,
    label: 'Problems',
  },
];

export const adminLinks = [
  {
    to: '/admin',
    icon: FiShield,
    label: 'Admin',
  },

  {
    to: '/admin/problems',
    icon: FiCode,
    label: 'Problems',
  },
];