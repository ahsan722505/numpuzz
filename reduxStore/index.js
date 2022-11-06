import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";
import numberRiddleSlice from "./NumberRiddleSlice";
import connectFourSlice from "./ConnectFourSlice";
const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    numberRiddle: numberRiddleSlice.reducer,
    connectFour: connectFourSlice.reducer,
  },
});
export default store;
