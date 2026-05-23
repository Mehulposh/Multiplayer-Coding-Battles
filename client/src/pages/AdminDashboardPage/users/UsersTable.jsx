import LoadingState
  from '../components/LoadingState.jsx';

import UserRow
  from './UserRow.jsx';

export  function UsersTable({
  users,
  loading,
  refreshUsers,
}) {
  if (loading) {
    return (
      <LoadingState text="Loading users..." />
    );
  }

  return (
    <div className="bg-battle-card border border-battle-border rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-battle-border">
            <th className="px-5 py-3 text-left">
              User
            </th>

            <th className="px-5 py-3 text-left">
              Email
            </th>

            <th className="px-5 py-3 text-left">
              Role
            </th>

            <th className="px-5 py-3 text-left">
                Last Active
            </th>
            
            <th className="px-5 py-3 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              refreshUsers={
                refreshUsers
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}