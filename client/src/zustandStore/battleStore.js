import { create } from 'zustand';

const useBattleStore = create((set, get) => ({
  battle: null,
  problem: null,
  status: 'idle', // idle | waiting | countdown | active | finished
  countdown: 0,
  timer: 0,
  timerInterval: null,
  players: [],
  winner: null,
  submissions: [],
  isSpectator: false,
  spectatorCount: 0,
  opponentTyping: false,

  setBattle: (battle) => set({
    battle,
    problem: battle?.problem,
    status: battle?.status || 'idle',
    players: battle?.players || [],
    submissions: battle?.submissions || [],
    spectatorCount: battle?.spectatorCount || 0,
  }),

  setStatus: (status) => set({ status }),

  startTimer: () => {
    const { timerInterval } = get();
    if (timerInterval) clearInterval(timerInterval);

    const interval = setInterval(() => {
      set((state) => ({ timer: state.timer + 1 }));
    }, 1000);

    set({ timerInterval: interval, timer: 0 });
  },

  stopTimer: () => {
    const { timerInterval } = get();
    if (timerInterval) clearInterval(timerInterval);
    set({ timerInterval: null });
  },

  setCountdown: (count) => set({ countdown: count }),

  updatePlayer: (userId, updates) => set((state) => ({
    players: state.players.map((p) =>
      (p.user?._id || p.user) === userId ? { ...p, ...updates } : p
    ),
  })),

  addPlayer: (player) => set((state) => ({
    players: [...state.players, player],
  })),

  removePlayer: (userId) => set((state) => ({
    players: state.players.filter((p) => (p.user?._id || p.user) !== userId),
  })),

  addSubmission: (submission) => set((state) => ({
    submissions: [...state.submissions, submission],
  })),

  setWinner: (winner) => set({ winner, status: 'finished' }),

  setSpectator: (isSpectator) => set({ isSpectator }),

  setSpectatorCount: (count) => set({ spectatorCount: count }),

  setOpponentTyping: (isTyping) => set({ opponentTyping: isTyping }),

  reset: () => {
    const { timerInterval } = get();
    if (timerInterval) clearInterval(timerInterval);
    set({
      battle: null,
      problem: null,
      status: 'idle',
      countdown: 0,
      timer: 0,
      timerInterval: null,
      players: [],
      winner: null,
      submissions: [],
      isSpectator: false,
      spectatorCount: 0,
      opponentTyping: false,
    });
  },
}));

export default useBattleStore;