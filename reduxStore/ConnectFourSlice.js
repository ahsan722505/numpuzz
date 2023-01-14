import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
  socket: null,
  loading: false,
  opponent: null,
  self: null,
  waitingForOpponent: true,
};

const connectFourSlice = createSlice({
  name: "connectFour",
  initialState,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    setSocket(state) {
      state.socket = io("http://localhost:4000/");
    },
    setOpponent(state, { payload }) {
      state.opponent = payload;
    },
    setSelf(state, { payload }) {
      state.self = payload;
    },
    incrementWins(state) {
      console.log(state.self);
      state.self.wins += 1;
    },
    setWaitingForOpponent(state, { payload }) {
      state.waitingForOpponent = payload;
    },
    flushState(state) {
      state.opponent = null;
      state.self = null;
      state.waitingForOpponent = true;
    },
  },
});

export const {
  setSocket,
  setLoading,
  setOpponent,
  setSelf,
  incrementWins,
  setWaitingForOpponent,
  flushState,
} = connectFourSlice.actions;

export default connectFourSlice;
