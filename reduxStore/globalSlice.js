import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthStatusApi } from "../api/GetAuthStatus";

export const getAuthStatus = createAsyncThunk(
  "getAuthStatus",
  async (_, { dispatch }) => {
    try {
      setLoading(true);
      const data = await getAuthStatusApi();
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  }
);

const initialState = {
  username: null,
  isLoggedIn: false,
  loading: true,
  photo: null,
};
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
  extraReducers: {
    [getAuthStatus.fulfilled]: (state, { payload }) => {
      console.log(payload);
      if (payload) {
        state.username = payload.username;
        state.photo = payload.photo;
        state.isLoggedIn = true;
      }
    },
  },
});

export const { setLoading } = globalSlice.actions;

export default globalSlice;
