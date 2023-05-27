import { create } from "zustand";
import { persist } from "zustand/middleware";
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const TIME_LIMIT = 20;
const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};
function calculateTimeFraction(timeLeft: number) {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}
function getRemainingProgress(timePassed) {
  return calculateTimeFraction(TIME_LIMIT - timePassed) * FULL_DASH_ARRAY;
}
function getRemainingPathColor(timePassed) {
  const timeLeft = TIME_LIMIT - timePassed;
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) return alert.color;
  else if (timeLeft <= warning.threshold) return warning.color;
  else return info.color;
}
type User = {
  gameId: 1 | 2;
  username: string;
  host: boolean;
  userId: string;
  wins: number;
  photo: string;
} | null;

type Timer = {
  circleDashArray: [number, number];
  remainingPathColor: string;
  timePassed: number;
  startingTime: Date;
};
export type ConnectFourState = {
  self: User;
  opponent: User;
  loading: boolean;
  waitingForOpponent: boolean;
  persistedRoomId: string;
  currentPlayer: 1 | 2;
  resultStatus: String;
  timer1: Timer;
  timer2: Timer;
  updateTimer: (gameId: 1 | 2) => void;
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
      timer1: {
        circleDashArray: [283, 283],
        remainingPathColor: COLOR_CODES.info.color,
        timePassed: 0,
        startingTime: new Date(),
      },
      timer2: {
        circleDashArray: [283, 283],
        remainingPathColor: COLOR_CODES.info.color,
        timePassed: 0,
        startingTime: new Date(),
      },
      updateTimer: (gameId) => {
        set((state) => {
          const key = `timer${gameId}`;
          const prevTimePassed = (state[key] as Timer).timePassed;
          let startingTime = (state[key] as Timer).startingTime;
          // let timePassed = Math.floor(
          //   (new Date().getTime() - new Date(startingTime).getTime()) / 1000
          // );
          if (prevTimePassed === 0) {
            startingTime = new Date();
            // timePassed = 1;
          }
          const timePassed = (state[key] as Timer).timePassed + 1;

          const timeLeft = TIME_LIMIT - timePassed;
          if (timeLeft === 0) {
            const newState: ConnectFourState = {
              ...state,
              [key]: {
                circleDashArray: [283, 283],
                remainingPathColor: COLOR_CODES.info.color,
                timePassed: 0,
                startingTime: new Date(),
              },
              currentPlayer: state.currentPlayer === 1 ? 2 : 1,
            };
            return newState;
          }
          const circleDashArray = [getRemainingProgress(timePassed), 283];
          const remainingPathColor = getRemainingPathColor(timePassed);
          const newState = {
            ...state,
            [key]: {
              circleDashArray,
              remainingPathColor,
              timePassed,
              startingTime,
            },
          };
          return newState;
        });
      },
      updateCurrentPlayer: () =>
        set((state) => ({
          ...state,
          currentPlayer: state.currentPlayer === 1 ? 2 : 1,
          [`timer${state.currentPlayer}`]: {
            circleDashArray: [283, 283],
            remainingPathColor: COLOR_CODES.info.color,
            timePassed: 0,
            startingTime: new Date(),
          },
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
          timer1: {
            circleDashArray: [283, 283],
            remainingPathColor: COLOR_CODES.info.color,
            timePassed: 0,
            startingTime: new Date(),
          },
          timer2: {
            circleDashArray: [283, 283],
            remainingPathColor: COLOR_CODES.info.color,
            timePassed: 0,
            startingTime: new Date(),
          },
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
