import {
  useState,
} from 'react';

import {
  motion,
} from 'framer-motion';

import {
  FiAlertTriangle,
} from 'react-icons/fi';

import toast
  from 'react-hot-toast';

import api
  from '../../../client/apiClient.js';

export default function DeleteUserModal({
  user,
  onClose,
  onDeleted,
}) {
  const [loading, setLoading] =
    useState(false);

  const handleDelete =
    async () => {
      setLoading(true);

      try {
        await api.delete(
          `/admin/users/${user._id}`
        );

        toast.success(
          `"${user.username}" deleted`
        );

        onDeleted();
        onClose();
      } catch (err) {
        toast.error(
          err.response?.data
            ?.message ||
            'Failed to delete user'
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="bg-battle-card border border-battle-border rounded-2xl p-8 max-w-md w-full"
      >
        <div className="w-14 h-14 bg-red-400/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-400/30">
          <FiAlertTriangle className="w-7 h-7 text-red-400" />
        </div>

        <h3 className="font-display font-bold text-xl text-white mb-2 text-center">
          Delete User?
        </h3>

        <p className="text-center text-battle-muted mb-6">
          @{user.username}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-battle-border py-2.5 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={
              handleDelete
            }
            disabled={loading}
            className="flex-1 bg-red-500 text-white py-2.5 rounded-xl"
          >
            {loading
              ? 'Deleting...'
              : 'Delete'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}