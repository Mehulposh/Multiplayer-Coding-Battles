import {
  useEffect,
  useState,
} from 'react';

import toast
  from 'react-hot-toast';

import api
  from '../../../client/apiClient.js';

import UserFilters
  from './UserFilters.jsx';

import {UsersTable}
  from './UsersTable.jsx';

import Pagination
  from '../components/Pagination.jsx';

export default function UsersTab() {
  const [users, setUsers] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [search,
    setSearch] =
    useState('');

  const [roleFilter,
    setRoleFilter] =
    useState('all');

  const [page, setPage] =
    useState(1);

  const [totalPages,
    setTotalPages] =
    useState(1);

  const fetchUsers =
    async () => {
      setLoading(true);

      try {
        const params =
          new URLSearchParams({
            page,
            limit: 12,
          });

        if (search) {
          params.set(
            'search',
            search
          );
        }

        if (
          roleFilter !== 'all'
        ) {
          params.set(
            'role',
            roleFilter
          );
        }

        const { data } =
          await api.get(
            `/admin/users?${params}`
          );

        setUsers(
          data.users || []
        );

        setTotalPages(
          data.pages || 1
        );
      } catch {
        toast.error(
          'Failed to fetch users'
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, [page, roleFilter]);

  return (
    <div className="space-y-5">
      <UserFilters
        search={search}
        setSearch={setSearch}
        roleFilter={
          roleFilter
        }
        setRoleFilter={
          setRoleFilter
        }
        onSearch={
          fetchUsers
        }
      />

      <UsersTable
        users={users}
        loading={loading}
        refreshUsers={
          fetchUsers
        }
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