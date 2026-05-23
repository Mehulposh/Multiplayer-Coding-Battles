import {
  FiUsers,
} from 'react-icons/fi';

import MiniBarChart
  from '../components/MiniBarChart.jsx';

export default function UsersChart({
  usersPerDay,
}) {
  return (
    <div className="bg-battle-card border border-battle-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-white">
          New Users
        </h3>

        <FiUsers className="w-4 h-4 text-battle-muted" />
      </div>

      <MiniBarChart
        data={usersPerDay}
        color="bg-blue-500"
      />
    </div>
  );
}