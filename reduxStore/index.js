import { configureStore } from "@reduxjs/toolkit";
import numberRiddleSlice from "./NumberRiddleSlice";
const store = configureStore({
  reducer: {
    numberRiddle: numberRiddleSlice.reducer,
  },
});
export default store;
