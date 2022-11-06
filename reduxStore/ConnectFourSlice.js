import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
  socket: null,
  loading: false,
  opponent: null,
  self: null,
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
  },
});

export const { setSocket, setLoading, setOpponent, setSelf } =
  connectFourSlice.actions;

export default connectFourSlice;
