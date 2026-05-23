import {
  useState,
  useEffect,
} from 'react';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import {
  FiBarChart2,
  FiUsers,
  FiZap,
} from 'react-icons/fi';

import api
  from '../../client/apiClient.js';

import OverviewTab
  from './overview/OverviewTab.jsx';

import UsersTab
  from './users/UsersTab.jsx';

import BattlesTab
  from './battles/BattlesTab.jsx';

export default function AdminDashboardPage() {
  const [activeTab,
    setActiveTab] =
    useState('overview');

  const [statsData,
    setStatsData] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    const fetchStats =
      async () => {
        try {
          const { data } =
            await api.get(
              '/admin/stats'
            );

          setStatsData(
            data
          );
        } finally {
          setLoading(false);
        }
      };

    fetchStats();
  }, []);

  const tabs = [
    {
      key: 'overview',
      icon: FiBarChart2,
      label: 'Overview',
    },

    {
      key: 'users',
      icon: FiUsers,
      label: 'Users',
    },

    {
      key: 'battles',
      icon: FiZap,
      label: 'Battles',
    },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
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
                  : 'text-battle-muted border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />

              {label}
            </button>
          )
        )}
      </div>

      <AnimatePresence
        mode="wait"
      >
        <motion.div
          key={activeTab}
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -8,
          }}
        >
          {activeTab ===
            'overview' &&
            statsData && (
              <OverviewTab
                statsData={
                  statsData
                }
              />
            )}

          {activeTab ===
            'users' && (
            <UsersTab />
          )}

          {activeTab ===
            'battles' && (
            <BattlesTab />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}