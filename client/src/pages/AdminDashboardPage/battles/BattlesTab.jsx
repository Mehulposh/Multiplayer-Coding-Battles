import {
  useEffect,
  useState,
} from 'react';

import toast
  from 'react-hot-toast';

import api
  from '../../../client/apiClient.js';

import BattlesTable
  from './BattlesTable.jsx';

import Pagination
  from '../components/Pagination.jsx';

import BattleFilters
  from './BattleFilters.jsx';

export default function BattlesTab() {
  const [battles,
    setBattles] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [status,
    setStatus] =
    useState('all');

  const [page, setPage] =
    useState(1);

  const [totalPages,
    setTotalPages] =
    useState(1);

  const fetchBattles =
    async () => {
      setLoading(true);

      try {
        const params =
          new URLSearchParams({
            page,
            limit: 12,
          });

        if (
          status !== 'all'
        ) {
          params.set(
            'status',
            status
          );
        }

        const { data } =
          await api.get(
            `/admin/battles?${params}`
          );

        setBattles(
          data.battles || []
        );

        setTotalPages(
          data.pages || 1
        );
      } catch {
        toast.error(
          'Failed to fetch battles'
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchBattles();
  }, [page, status]);

  return (
    <div className="space-y-5">
      <BattleFilters
        status={status}
        setStatus={
          setStatus
        }
      />

      <BattlesTable
        battles={battles}
        loading={loading}
      />

      <Pagination
        page={page}
        totalPages={
          totalPages
        }
        setPage={setPage}
      />
    </div>
  );
}