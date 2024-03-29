import { create } from "zustand";
import { persist } from "zustand/middleware";
import { emit } from "../websocket";
type User = {
  gameId: 1 | 2;
  username: string;
  userId: string;
  wins: number;
  photo: string;
} | null;

type GameMode = "bot" | "friend";
type Timer = {
  circleDashArray: [number, number];
  remainingPathColor: string;
  timePassed: number;
};
export type ConnectFourState = {
  self: User;
  opponent: User;
  loading: boolean;
  waitingForOpponent: boolean;
  persistedRoomId: string;
  currentPlayer: 1 | 2;
  resultStatus: String;
  showLinkModal: boolean;
  timer1: Timer;
  timer2: Timer;
  sound: HTMLAudioElement | null;
  selfMessage: string;
  opponentMessage: string;
  updateTimer: (gameId: 1 | 2, startTime?: string) => void;
  setShowLinkModal: (arg: boolean) => void;
  updateCurrentPlayer: (boardState: number[][], roomId: string) => void;
  setResultStatus: (arg: string) => void;
  endGame: (arg: "won" | "lost" | "tie", gameMode: GameMode) => void;
  startGame: () => void;
  setLoading: (loading: boolean) => void;
  setSelf: (arg: User) => void;
  setOpponent: (arg: User) => void;
  incrementSelfWins: () => void;
  incrementOpponentWins: () => void;
  setWaitingForOpponent: (arg: boolean) => void;
  flushState: () => void;
  setPersistedRoomId: (arg: string) => void;
  setCurrentPlayer: (arg: 1 | 2) => void;
  setMessage(arg: { message: string; type: "self" | "opponent" }): void;
};
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

function changeTurn(
  state: ConnectFourState,
  boardState: number[][],
  roomId: string
): ConnectFourState {
  const updatedCurrentPlayer = state.currentPlayer === 1 ? 2 : 1;
  const startTime = new Date().toISOString();
  emit("saveState", {
    boardState,
    currentPlayer: updatedCurrentPlayer,
    startTime,
    roomId,
  });
  return {
    ...state,
    currentPlayer: updatedCurrentPlayer,
    [`timer${state.currentPlayer}`]: {
      circleDashArray: [283, 283],
      remainingPathColor: COLOR_CODES.info.color,
      timePassed: 0,
      startingTime: new Date(),
    },
  };
}

const useConnectFourStore = create<ConnectFourState>()(
  persist(
    (set) => ({
      sound: typeof window !== "undefined" ? new Audio("/touch.wav") : null,
      persistedRoomId: "",
      showLinkModal: false,
      loading: true,
      waitingForOpponent: true,
      self: null,
      opponent: null,
      currentPlayer: null,
      resultStatus: "",
      selfMessage: "",
      opponentMessage: "",
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
      setShowLinkModal(arg) {
        set({ showLinkModal: arg });
      },
      setMessage: ({ message, type }) => {
        if (type === "self") {
          set({ selfMessage: message });
        } else {
          set({ opponentMessage: message });
        }
      },
      updateTimer: (gameId, startTime) => {
        set((state) => {
          const key = `timer${gameId}`;
          let timePassed;
          if (startTime) {
            timePassed = Math.floor(
              (new Date().getTime() - new Date(startTime).getTime()) / 1000
            );
          } else {
            timePassed = (state[key] as Timer).timePassed + 1;
          }
          const timeLeft = TIME_LIMIT - timePassed;
          if (timeLeft === 0) {
            return changeTurn(state, [], state.persistedRoomId);
          }
          const circleDashArray = [getRemainingProgress(timePassed), 283];
          const remainingPathColor = getRemainingPathColor(timePassed);
          let newState = {
            ...state,
            [key]: {
              circleDashArray,
              remainingPathColor,
              timePassed,
            },
          };
          if (startTime) {
            const key2 = `timer${gameId === 1 ? 2 : 1}`;
            newState = {
              ...state,
              [key]: {
                circleDashArray,
                remainingPathColor,
                timePassed,
              },
              [key2]: {
                circleDashArray: [283, 283],
                remainingPathColor: COLOR_CODES.info.color,
                timePassed: 0,
              },
            };
          }
          return newState;
        });
      },
      updateCurrentPlayer: (boardState: number[][], roomId: string) =>
        set((state) => changeTurn(state, boardState, roomId)),
      setCurrentPlayer: (currentPlayer) => set({ currentPlayer }),
      endGame: (result, gameMode) => {
        const waitingForOpponent = gameMode === "friend";
        if (result === "won") {
          set((state) => ({
            ...state,
            timer1: {
              circleDashArray: [283, 283],
              remainingPathColor: COLOR_CODES.info.color,
              timePassed: 0,
            },
            timer2: {
              circleDashArray: [283, 283],
              remainingPathColor: COLOR_CODES.info.color,
              timePassed: 0,
            },
            resultStatus: "You won!",
            currentPlayer: null,
            waitingForOpponent,
            self: { ...state.self, wins: state.self.wins + 1 },
          }));
        } else if (result === "lost") {
          set((state) => ({
            ...state,
            timer1: {
              circleDashArray: [283, 283],
              remainingPathColor: COLOR_CODES.info.color,
              timePassed: 0,
            },
            timer2: {
              circleDashArray: [283, 283],
              remainingPathColor: COLOR_CODES.info.color,
              timePassed: 0,
            },
            currentPlayer: null,
            waitingForOpponent,
            resultStatus: "You lost!",
            opponent: { ...state.opponent, wins: state.opponent.wins + 1 },
          }));
        } else {
          set((state) => ({
            ...state,
            timer1: {
              circleDashArray: [283, 283],
              remainingPathColor: COLOR_CODES.info.color,
              timePassed: 0,
            },
            timer2: {
              circleDashArray: [283, 283],
              remainingPathColor: COLOR_CODES.info.color,
              timePassed: 0,
            },
            currentPlayer: null,
            waitingForOpponent,
            resultStatus: "Match Tied!",
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
          selfMessage: "",
          opponentMessage: "",
          self: null,
          opponent: null,
          currentPlayer: null,
          resultStatus: "",
          timer1: {
            circleDashArray: [283, 283],
            remainingPathColor: COLOR_CODES.info.color,
            timePassed: 0,
          },
          timer2: {
            circleDashArray: [283, 283],
            remainingPathColor: COLOR_CODES.info.color,
            timePassed: 0,
          },
        }),
    }),
    {
      name: "connectFourState",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => key !== "loading" && key !== "showLinkModal"
          )
        ),
    }
  )
);

export default useConnectFourStore;
