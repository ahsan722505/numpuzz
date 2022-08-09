import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBestApi } from "../api/GetBest";
import { setBestApi } from "../api/SetBest";


export const getBest = createAsyncThunk(
  "getBest",
  async (_,{dispatch}) => {
    try {
      dispatch(setLoading(true));
      const data = await getBestApi();
      dispatch(setLoading(false));
      return data;
    } catch (error) {
        dispatch(setLoading(false));
      console.log(error.message);
    }
  }
);
export const setBestThunk = createAsyncThunk(
  "setBestThunk",
  async (payload,{dispatch}) => {
    console.log(payload);
    try {
      dispatch(setBest(payload));
      await setBestApi(payload);
    } catch (error) {
      console.log(error.message);
    }
  }
);


const initialState={
    showGame : false,
    gameDim : 3,
    best : null,
    tile :  typeof window !== "undefined" && new Audio("/touch.wav"),
    other : typeof window !== "undefined" && new Audio("/other.wav"),
    play : typeof window !== "undefined" && ((localStorage.getItem("sound") === null || localStorage.getItem("sound") === "true") ? true : false)
}

const numberRiddleSlice = createSlice({
  name: "numberRiddle",
  initialState,
  reducers: {
      setLoading(state,{payload}){
            state.loading=payload;
      },
      startGame(state,{payload}){
            state.showGame=true;
            state.gameDim=payload;
      },
      endGame(state,{payload}){
          state.showGame=false;
      },
      setBest(state,{payload}){
          state.best=payload;
      },
      toggleSound(state){
          localStorage.setItem("sound",`${!state.play}`)
          state.play=!state.play;
      }
    
  },
  extraReducers: {
    [getBest.fulfilled]: (state, {payload}) =>{
        if(payload){
          console.log(payload.data.best || {});
            state.best=payload.data.best || {};
        }
        
    },
    
  },
});

export const {setLoading,startGame,endGame,setBest,toggleSound} = numberRiddleSlice.actions;

export default numberRiddleSlice;
