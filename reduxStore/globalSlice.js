import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthStatusApi } from "../api/GetAuthStatus";

export const getAuthStatus = createAsyncThunk(
  "getAuthStatus",
  async (_, { dispatch }) => {
    try {
      setLoading(true);
      const data = await getAuthStatusApi();
      dispatch(setLoading(false));
      data.isLoggedIn = true;
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      let guestName = localStorage.getItem("guestName");
      if (!guestName) {
        guestName = `Guest_${Math.random().toString(36).slice(8)}`;
        localStorage.setItem("guestName", guestName);
      }
      return {
        username: guestName,
        isLoggedIn: false,
        photo: "/photo.jpg",
      };
    }
  }
);

const initialState = {
  username: null,
  isLoggedIn: false,
  loading: true,
  photo: null,
  notication: null,
};
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    setNotification(state, { payload }) {
      state.notification = payload;
    },
  },
  extraReducers: {
    [getAuthStatus.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.username = payload.username;
        state.photo = payload.photo;
        state.isLoggedIn = payload.isLoggedIn;
      }
    },
  },
});

export const { setLoading, setNotification } = globalSlice.actions;

export default globalSlice;
