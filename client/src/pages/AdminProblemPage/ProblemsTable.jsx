import {
  FiChevronDown,
  FiChevronUp,
  FiCode,
} from 'react-icons/fi';

import ProblemRow
  from './ProblemRow.jsx';

export default function ProblemsTable({
  loading,
  filtered,
  sortField,
  sortDir,
  handleSort,
  onEdit,
  onDelete,
  fetchProblems,
}) {
  console.log('filtered problems', filtered);
  
  const SortIcon = ({
    field,
  }) => {
    if (
      sortField !== field
    ) {
      return (
        <FiChevronDown className="w-3 h-3 opacity-30" />
      );
    }

    return sortDir === 'asc' ? (
      <FiChevronUp className="w-3 h-3 text-battle-accent" />
    ) : (
      <FiChevronDown className="w-3 h-3 text-battle-accent" />
    );
  };

  return (
    <div className="bg-battle-card border border-battle-border rounded-2xl overflow-hidden">
      {loading ? (
        <div className="p-16 text-center">
          <div className="w-8 h-8 border-2 border-battle-border border-t-battle-accent rounded-full animate-spin mx-auto mb-3" />

          <p className="text-battle-muted">
            Loading problems...
          </p>
        </div>
      ) : filtered.length ===
        0 ? (
        <div className="p-16 text-center">
          <FiCode className="w-12 h-12 text-battle-border mx-auto mb-3" />

          <p className="text-battle-muted text-lg font-medium">
            No problems found
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-battle-border bg-battle-surface/50">
                {[
                  {
                    key: 'title',
                    label: 'Title',
                  },
                  {
                    key: 'difficulty',
                    label:
                      'Difficulty',
                  },
                  {
                    key: null,
                    label:
                      'Tests (V/H)',
                  },
                  {
                    key:
                      'timeLimitMs',
                    label:
                      'Time Limit',
                  },
                  {
                    key: 'isActive',
                    label: 'Status',
                  },
                  {
                    key: null,
                    label:
                      'Actions',
                  },
                ].map(
                  ({
                    key,
                    label,
                  }) => (
                    <th
                      key={label}
                      onClick={
                        key
                          ? () =>
                              handleSort(
                                key
                              )
                          : undefined
                      }
                      className={`px-5 py-3 text-left text-xs font-bold text-battle-muted uppercase tracking-wider ${
                        key
                          ? 'cursor-pointer hover:text-white select-none'
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {label}

                        {key && (
                          <SortIcon
                            field={
                              key
                            }
                          />
                        )}
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <ProblemRow
                  key={p._id}
                  problem={p}
                  onEdit={onEdit}
                  onDelete={
                    onDelete
                  }
                  onToggle={
                    fetchProblems
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}