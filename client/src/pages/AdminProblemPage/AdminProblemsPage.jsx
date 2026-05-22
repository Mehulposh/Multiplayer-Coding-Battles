import {
  useEffect,
  useState,
  useCallback
} from 'react';

import {
  AnimatePresence,
} from 'framer-motion';

import {
  FiPlus,
} from 'react-icons/fi';

import api from '../../client/apiClient.js';

import toast from 'react-hot-toast';

import ProblemFilters
  from './ProblemFilters.jsx';

import ProblemsTable
  from './ProblemsTable.jsx';

import ProblemStats
  from './ProblemsStats.jsx';

import ProblemFormModal
  from './ProblemFormModal.jsx';

import DeleteConfirmModal
  from './DeleteConfirmModal.jsx';

export default function AdminProblemsPage() {
  const [problems, setProblems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState('');

  const [filterDiff, setFilterDiff] =
    useState('all');

  const [
    filterActive,
    setFilterActive,
  ] = useState('all');

  const [showForm, setShowForm] =
    useState(false);

  const [
    editingProblem,
    setEditingProblem,
  ] = useState(null);

  const [
    deletingProblem,
    setDeletingProblem,
  ] = useState(null);

  const [sortField, setSortField] =
    useState('title');

  const [sortDir, setSortDir] =
    useState('asc');

  const fetchProblems = useCallback(
    async () => {
      setLoading(true);

      try {
        const { data } =
          await api.get(
            '/problems?limit=200'
          );

        setProblems(
          data.problems || []
        );
      } catch {
        toast.error(
          'Failed to load problems'
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  const handleSort = (
    field
  ) => {
    if (sortField === field) {
      setSortDir((d) =>
        d === 'asc'
          ? 'desc'
          : 'asc'
      );
    } else {
      setSortField(field);

      setSortDir('asc');
    }
  };

  const filtered = problems
    .filter((p) => {
      const matchSearch =
        p.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        p.tags?.some((t) =>
          t
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
        );

      const matchDiff =
        filterDiff === 'all' ||
        p.difficulty ===
          filterDiff;

      const matchActive =
        filterActive === 'all' ||
        (filterActive ===
        'active'
          ? p.isActive
          : !p.isActive);

      return (
        matchSearch &&
        matchDiff &&
        matchActive
      );
    })
    .sort((a, b) => {
      let va = a[sortField];

      let vb = b[sortField];

      if (
        typeof va ===
        'string'
      ) {
        va = va.toLowerCase();
      }

      if (
        typeof vb ===
        'string'
      ) {
        vb = vb.toLowerCase();
      }

      if (va < vb) {
        return sortDir ===
          'asc'
          ? -1
          : 1;
      }

      if (va > vb) {
        return sortDir ===
          'asc'
          ? 1
          : -1;
      }

      return 0;
    });

  const stats = {
    total: problems.length,

    active:
      problems.filter(
        (p) => p.isActive
      ).length,

    easy: problems.filter(
      (p) =>
        p.difficulty ===
        'easy'
    ).length,

    medium:
      problems.filter(
        (p) =>
          p.difficulty ===
          'medium'
      ).length,

    hard: problems.filter(
      (p) =>
        p.difficulty ===
        'hard'
    ).length,
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-3xl text-white">
            Problem Management
          </h1>

          <p className="text-battle-muted mt-1">
            Create, edit and
            manage all coding
            problems
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProblem(
              null
            );

            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-battle-accent text-battle-bg px-5 py-2.5 rounded-xl font-bold hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] transition-all"
        >
          <FiPlus className="w-5 h-5" />

          New Problem
        </button>
      </div>

      <ProblemStats
        stats={stats}
      />

      <ProblemFilters
        search={search}
        setSearch={setSearch}
        filterDiff={
          filterDiff
        }
        setFilterDiff={
          setFilterDiff
        }
        filterActive={
          filterActive
        }
        setFilterActive={
          setFilterActive
        }
        filteredCount={
          filtered.length
        }
      />

      <ProblemsTable
        loading={loading}
        filtered={filtered}
        sortField={
          sortField
        }
        sortDir={sortDir}
        handleSort={
          handleSort
        }
        onEdit={(prob) => {
          setEditingProblem(
            prob
          );

          setShowForm(true);
        }}
        onDelete={
          setDeletingProblem
        }
        fetchProblems={
          fetchProblems
        }
      />

      <AnimatePresence>
        {showForm && (
          <ProblemFormModal
            problem={
              editingProblem
            }
            onClose={() => {
              setShowForm(
                false
              );

              setEditingProblem(
                null
              );
            }}
            onSaved={
              fetchProblems
            }
          />
        )}

        {deletingProblem && (
          <DeleteConfirmModal
            problem={
              deletingProblem
            }
            onClose={() =>
              setDeletingProblem(
                null
              )
            }
            onDeleted={
              fetchProblems
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}