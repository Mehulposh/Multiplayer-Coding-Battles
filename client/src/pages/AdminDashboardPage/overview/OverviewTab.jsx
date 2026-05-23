import {
  FiUsers,
  FiZap,
  FiCode,
  FiActivity,
} from 'react-icons/fi';

import StatCard from '../components/StatCard.jsx';
import BattlesChart from './BattlesChart.jsx'
import UsersChart from './UsersChart.jsx';
import TopPlayersCard from './TopPlayersCard.jsx';

import ProblemBreakdownCard from './ProblemBreakdownCard.jsx';
import EloDistributionCard from './EloDistributionCard.jsx';
import RecentBattlesCard from './RecentBattlesCard.jsx';


export default function OverviewTab({
  statsData,
}) {
  const {
    stats = {},
    topPlayers = [],
    recentBattles = [],
    battlesPerDay = [],
    usersPerDay = [],
    problemsByDifficulty = {},
    eloDistribution = [],
  } = statsData || {};
  
  console.log('recentBattles', statsData);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={FiUsers}
          label="Total Users"
          value={
            stats.totalUsers
          }
          sub={`${stats.onlineUsers} online`}
          color="text-blue-400"
          iconBg="bg-blue-400/10"
        />

        <StatCard
          icon={FiZap}
          label="Total Battles"
          value={
            stats.totalBattles
          }
          sub={`${stats.activeBattles} live`}
        />

        <StatCard
          icon={FiCode}
          label="Problems"
          value={
            stats.totalProblems
          }
          sub={`${stats.activeProblems} active`}
          color="text-purple-400"
          iconBg="bg-purple-400/10"
        />

        <StatCard
          icon={FiActivity}
          label="Finished Battles"
          value={
            stats.finishedBattles
          }
          color="text-green-400"
          iconBg="bg-green-400/10"
        />
      </div>

      {/* Add charts/cards here */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <BattlesChart 
            battlesPerDay={battlesPerDay}
          />

          <UsersChart 
            usersPerDay={usersPerDay}
          />
      </div>
      
     {/* Analytics */}
     <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <TopPlayersCard 
            topPlayers={topPlayers}
          />

          <ProblemBreakdownCard 
            breakdown={problemsByDifficulty}
          />

          <EloDistributionCard 
            distribution={eloDistribution}
          />

      </div>
        {/* Recent Battles */}
        <RecentBattlesCard 
          battles={recentBattles}
        />
    </div>
  );
}