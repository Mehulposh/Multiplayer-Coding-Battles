import {
  FiBarChart2,
} from 'react-icons/fi';

import MiniBarChart
  from '../components/MiniBarChart.jsx';

export default function BattlesChart({
  battlesPerDay,
}) {

  console.log('battlesPerDay',battlesPerDay);
  
  return (
    <div className="bg-battle-card border border-battle-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-white">
          Battles — Last 7 Days
        </h3>

        <FiBarChart2 className="w-4 h-4 text-battle-muted" />
      </div>

      <MiniBarChart
        data={
          battlesPerDay
        }
      />
    </div>
  );
}