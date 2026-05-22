import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../client/apiClient.js';
import { initSocket, disconnectSocket } from '../client/socketClient.js';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post('/auth/login', { email, password });
          localStorage.setItem('token', data.token);
          initSocket(data.token);
          set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (err) {
          const message = err.response?.data?.message || 'Login failed';
          set({ error: message, isLoading: false });
          return { success: false, message };
        }
      },

      register: async (username, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post('/auth/register', { username, email, password });
          localStorage.setItem('token', data.token);
          initSocket(data.token);
          set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (err) {
          const message = err.response?.data?.message || 'Registration failed';
          set({ error: message, isLoading: false });
          return { success: false, message };
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        disconnectSocket();
        set({ user: null, token: null, isAuthenticated: false });
      },

      fetchMe: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          set({
            authLoading: false
          })
          return 
        };
        try {
          const { data } = await api.get('/auth/me');
          set({ user: data.user, token, isAuthenticated: true , authLoading: false});
          initSocket(token);
        } catch {
          localStorage.removeItem('token');
          set({ user: null, token: null, isAuthenticated: false , authLoading: false});
        }
      },

      updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useAuthStore;