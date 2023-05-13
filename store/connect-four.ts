import { create } from "zustand";
import { persist } from "zustand/middleware";
type User = {
  gameId: 1 | 2;
  username: string;
  host: boolean;
  userId: string;
  wins: number;
  photo: string;
} | null;
export type ConnectFourState = {
  self: User;
  opponent: User;
  loading: boolean;
  waitingForOpponent: boolean;
  persistedRoomId: string;
  currentPlayer: 1 | 2;
  resultStatus: String;
  updateCurrentPlayer: () => void;
  setResultStatus: (arg: string) => void;
  endGame: (arg: "won" | "lost") => void;
  startGame: () => void;
  setLoading: (loading: boolean) => void;
  setSelf: (arg: User) => void;
  setOpponent: (arg: User) => void;
  incrementSelfWins: () => void;
  incrementOpponentWins: () => void;
  setWaitingForOpponent: (arg: boolean) => void;
  flushState: () => void;
  setPersistedRoomId: (arg: string) => void;
};

const useConnectFourStore = create<ConnectFourState>()(
  persist(
    (set) => ({
      persistedRoomId: "",
      loading: true,
      waitingForOpponent: true,
      self: null,
      opponent: null,
      currentPlayer: null,
      resultStatus: "",
      updateCurrentPlayer: () =>
        set((state) => ({
          ...state,
          currentPlayer: state.currentPlayer === 1 ? 2 : 1,
        })),
      endGame: (result) => {
        if (result === "won") {
          set((state) => ({
            ...state,
            resultStatus: "You won!",
            currentPlayer: null,
            waitingForOpponent: true,
            self: { ...state.self, wins: state.self.wins + 1 },
          }));
        } else {
          set((state) => ({
            ...state,
            currentPlayer: null,
            waitingForOpponent: true,
            resultStatus: "You lost!",
            opponent: { ...state.opponent, wins: state.opponent.wins + 1 },
          }));
        }
      },
      startGame: () => set({ waitingForOpponent: false, currentPlayer: 1 }),
      setPersistedRoomId: (persistedRoomId) => set({ persistedRoomId }),
      setLoading: (loading) => set({ loading }),
      setResultStatus: (resultStatus) => set({ resultStatus }),
      setOpponent: (user) => set({ opponent: user }),
      setSelf: (user) => set({ self: user }),
      incrementSelfWins: () =>
        set((state) => ({
          self: { ...state.self, wins: state.self.wins + 1 },
        })),
      incrementOpponentWins: () =>
        set((state) => ({
          opponent: { ...state.opponent, wins: state.opponent.wins + 1 },
        })),
      setWaitingForOpponent: (waitingForOpponent: boolean) =>
        set({ waitingForOpponent }),
      flushState: () =>
        set({
          waitingForOpponent: true,
          self: null,
          opponent: null,
          currentPlayer: null,
          resultStatus: "",
        }),
    }),
    {
      name: "connectFourState",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => key !== "loading")
        ),
    }
  )
);

export default useConnectFourStore;
