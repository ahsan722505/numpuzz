import { create } from "zustand";
type User = {
  gameId: 1 | 2;
  username: string;
  host: boolean;
  userId: string;
  wins: number;
  photo: string;
} | null;
type State = {
  self: User;
  opponent: User;
  loading: boolean;
  waitingForOpponent: boolean;
  setLoading: (loading: boolean) => void;
  setSelf: (arg: User) => void;
  setOpponent: (arg: User) => void;
  incrementSelfWins: () => void;
  incrementOpponentWins: () => void;
  setWaitingForOpponent: (arg: boolean) => void;
  flushState: () => void;
};

const useConnectFourStore = create<State>((set) => ({
  loading: false,
  waitingForOpponent: true,
  self: null,
  opponent: null,
  setLoading: (loading) => set({ loading }),
  setOpponent: (user) => set({ opponent: user }),
  setSelf: (user) => set({ self: user }),
  incrementSelfWins: () =>
    set((state) => ({ self: { ...state.self, wins: state.self.wins + 1 } })),
  incrementOpponentWins: () =>
    set((state) => ({
      opponent: { ...state.opponent, wins: state.opponent.wins + 1 },
    })),
  setWaitingForOpponent: (waitingForOpponent: boolean) =>
    set({ waitingForOpponent }),
  flushState: () =>
    set({ self: null, opponent: null, waitingForOpponent: true }),
}));

export default useConnectFourStore;
