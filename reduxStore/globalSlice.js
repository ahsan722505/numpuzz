import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthStatusApi } from "../api/GetAuthStatus";

export const getAuthStatus = createAsyncThunk(
  "getAuthStatus",
  async (_,{dispatch}) => {
    try {
        setLoading(true);
      const data = await getAuthStatusApi();
      dispatch(setLoading(false));
      return data.username;
    } catch (error) {
        dispatch(setLoading(false));
      console.log(error.message);
    }
  }
);

const initialState={
    username : null,
    isLoggedIn : false,
    loading : true,
}
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
      setLoading(state,{payload}){
            state.loading=payload;
      }
    
  },
  extraReducers: {
    [getAuthStatus.fulfilled]: (state, action) =>{
        if(action.payload){
            state.username=action.payload;
            state.isLoggedIn=true;
        }
        
    },
    
  },
});

export const {setLoading} = globalSlice.actions;

export default globalSlice;
