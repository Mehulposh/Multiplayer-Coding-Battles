import { FiCode } from 'react-icons/fi';

export default function EmptyProblems() {
  return (
    <div className="py-24 text-center">
      <FiCode className="w-14 h-14 text-battle-border mx-auto mb-4" />

      <p className="text-white text-lg font-medium">
        No problems found
      </p>

      <p className="text-battle-muted text-sm mt-1">
        Try adjusting your search or filters
      </p>
    </div>
  );
}