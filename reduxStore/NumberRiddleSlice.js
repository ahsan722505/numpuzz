import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBestApi } from "../api/GetBest";
import { getTopApi } from "../api/GetTop";
import { setBestApi } from "../api/SetBest";

export const getBest = createAsyncThunk("getBest", async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const data = await getBestApi();
    dispatch(setLoading(false));
    return data;
  } catch (error) {
    dispatch(setLoading(false));
    console.log(error.message);
  }
});
export const getTop = createAsyncThunk("getTop", async (size, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    let data = await getTopApi(size);
    data = data.map((each) => ({
      username: each.user_id.username,
      photo: each.user_id.photo,
      time: each.best[size].d,
    }));
    dispatch(setLoading(false));
    console.log(data);
    return { data, size };
  } catch (error) {
    dispatch(setLoading(false));
    console.log(error.message);
  }
});
export const setBestThunk = createAsyncThunk(
  "setBestThunk",
  async (payload, { dispatch, getState }) => {
    const { isLoggedIn } = getState().global;
    console.log(isLoggedIn);
    console.log("-----------------");
    try {
      dispatch(setBest(payload));
      if (isLoggedIn) await setBestApi(payload);
      else localStorage.setItem("best", JSON.stringify(payload));
    } catch (error) {
      console.log(error.message);
    }
  }
);

const initialState = {
  showGame: false,
  gameDim: 3,
  best: null,
  tile: typeof window !== "undefined" && new Audio("/touch.wav"),
  other: typeof window !== "undefined" && new Audio("/other.wav"),
  play:
    typeof window !== "undefined" &&
    (localStorage.getItem("sound") === null ||
    localStorage.getItem("sound") === "true"
      ? true
      : false),
  leaderBoardData: {},
  leaderBoardSize: 3,
};

const numberRiddleSlice = createSlice({
  name: "numberRiddle",
  initialState,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    startGame(state, { payload }) {
      state.showGame = true;
      state.gameDim = payload;
    },
    endGame(state, { payload }) {
      state.showGame = false;
    },
    setBest(state, { payload }) {
      state.best = payload;
    },
    toggleSound(state) {
      localStorage.setItem("sound", `${!state.play}`);
      state.play = !state.play;
    },
    setLeaderBoardSize(state, { payload }) {
      state.leaderBoardSize = payload;
    },
  },
  extraReducers: {
    [getBest.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.best = payload.data.best || {};
      } else {
        state.best = JSON.parse(localStorage.getItem("best")) || {};
      }
    },
    [getTop.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.leaderBoardData[payload.size] = payload.data;
      }
    },
  },
});

export const {
  setLeaderBoardSize,
  setLoading,
  startGame,
  endGame,
  setBest,
  toggleSound,
} = numberRiddleSlice.actions;

export default numberRiddleSlice;
