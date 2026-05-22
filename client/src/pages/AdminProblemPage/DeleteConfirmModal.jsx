import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import {
  FiAlertTriangle,
  FiTrash2,
  FiX,
} from 'react-icons/fi';

import {
  useState,
} from 'react';

import toast from 'react-hot-toast';

import api from '../../client/apiClient.js';

export default function DeleteConfirmModal({
  problem,
  onClose,
  onDeleted,
}) {
  const [deleting, setDeleting] =
    useState(false);

  const handleDelete =
    async () => {
      setDeleting(true);

      try {
        await api.delete(
          `/problems/${problem._id}`
        );

        toast.success(
          `"${problem.title}" deleted`
        );

        onDeleted();

        onClose();
      } catch (err) {
        toast.error(
          err.response?.data
            ?.message ||
            'Failed to delete problem'
        );
      } finally {
        setDeleting(false);
      }
    };

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
          }}
          className="w-full max-w-md bg-battle-card border border-battle-border rounded-2xl overflow-hidden"
        >
          {/* HEADER */}

          <div className="flex items-center justify-between px-5 py-4 border-b border-battle-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FiAlertTriangle className="w-5 h-5 text-red-400" />
              </div>

              <div>
                <h2 className="font-display font-bold text-white text-lg">
                  Delete Problem
                </h2>

                <p className="text-battle-muted text-sm">
                  This action cannot
                  be undone
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-battle-muted hover:text-white hover:bg-white/5 transition-all"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* BODY */}

          <div className="p-5">
            <p className="text-battle-muted leading-relaxed">
              Are you sure you want
              to permanently delete{' '}
              <span className="text-white font-semibold">
                "{problem.title}"
              </span>
              ?
            </p>

            <div className="mt-4 p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-sm text-red-300">
              All test cases,
              starter code and
              related battle history
              references may be
              affected.
            </div>
          </div>

          {/* FOOTER */}

          <div className="px-5 py-4 border-t border-battle-border flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              disabled={deleting}
              className="px-5 py-2.5 rounded-xl border border-battle-border text-battle-muted hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={
                handleDelete
              }
              disabled={deleting}
              className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-400 transition-all disabled:opacity-50"
            >
              {deleting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <FiTrash2 className="w-4 h-4" />
              )}

              {deleting
                ? 'Deleting...'
                : 'Delete Problem'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}