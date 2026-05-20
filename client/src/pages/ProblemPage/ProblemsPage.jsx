import {
  useState,
  useEffect,
} from 'react';

import api from '../../client/apiClient.js';

import ProblemsHeader from './ProblemsHeader.jsx';
import ProblemsFilters from './/ProblemsFilters.jsx';
import ResultsInfo from './ResultInfo.jsx';
import ProblemList from './ProblemList.jsx';
import Pagination from './Pagination.jsx'
import LoadingProblems from './LoadingProblems.jsx';
import EmptyProblems from './EmptyProblems.jsx';

export default function ProblemsPage() {
  const [problems, setProblems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState('');

  const [selectedDiff, setSelectedDiff] =
    useState('all');

  const [selectedTag, setSelectedTag] =
    useState('');

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [total, setTotal] =
    useState(0);

  const LIMIT = 10;

  useEffect(() => {
    const loadProblems =
      async () => {
        setLoading(true);

        try {
          const params =
            new URLSearchParams({
              page,
              limit: LIMIT,
            });

          if (
            selectedDiff !== 'all'
          ) {
            params.set(
              'difficulty',
              selectedDiff
            );
          }

          if (selectedTag) {
            params.set(
              'tag',
              selectedTag
            );
          }

          const { data } =
            await api.get(
              `/problems?${params}`
            );

          setProblems(
            data.problems || []
          );

          setTotal(
            data.total || 0
          );

          setTotalPages(
            data.pages || 1
          );
        } catch {
          setProblems([]);
        } finally {
          setLoading(false);
        }
      };

    loadProblems();
  }, [
    page,
    selectedDiff,
    selectedTag,
  ]);

  const filtered = search
    ? problems.filter(
        (p) =>
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
          )
      )
    : problems;

  const clearFilters = () => {
    setSelectedDiff('all');
    setSelectedTag('');
    setSearch('');
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <ProblemsHeader total={total} />

        <ProblemsFilters
            search={search}
            setSearch={(value) => {
                setPage(1);
                setSearch(value);
            }}
            selectedDiff={selectedDiff}
            setSelectedDiff={(value) => {
                setPage(1);
                setSelectedDiff(value);
            }}
            selectedTag={selectedTag}
            setSelectedTag={(value) => {
                setPage(1);
                setSelectedTag(value);
            }}
        />

      <ResultsInfo
        filtered={filtered}
        problems={problems}
        search={search}
        selectedDiff={selectedDiff}
        selectedTag={selectedTag}
        clearFilters={clearFilters}
      />

      {loading ? (
        <LoadingProblems />
      ) : filtered.length === 0 ? (
        <EmptyProblems />
      ) : (
        <ProblemList
          filtered={filtered}
          page={page}
          limit={LIMIT}
        />
      )}

      {totalPages > 1 &&
        !search && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={
              totalPages
            }
          />
        )}
    </div>
  );
}