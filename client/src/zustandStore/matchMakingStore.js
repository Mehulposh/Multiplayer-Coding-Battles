import { create } from 'zustand';

const useMatchmakingStore = create((set) => ({
  isSearching: false,
  waitTime: 0,
  playersSearching: 0,
  matchFound: null,
  waitInterval: null,

  startSearching: () => {
    const interval = setInterval(() => {
      set((state) => ({ waitTime: state.waitTime + 1 }));
    }, 1000);
    set({ isSearching: true, waitTime: 0, waitInterval: interval, matchFound: null });
  },

  stopSearching: () => {
    set((state) => {
      if (state.waitInterval) clearInterval(state.waitInterval);
      return { isSearching: false, waitTime: 0, waitInterval: null };
    });
  },

  setPlayersSearching: (count) => set({ playersSearching: count }),

  setMatchFound: (match) => {
    set((state) => {
      if (state.waitInterval) clearInterval(state.waitInterval);
      return { matchFound: match, isSearching: false, waitInterval: null };
    });
  },

  reset: () => {
    set((state) => {
      if (state.waitInterval) clearInterval(state.waitInterval);
      return { isSearching: false, waitTime: 0, playersSearching: 0, matchFound: null, waitInterval: null };
    });
  },
}));

export default useMatchmakingStore;