import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";
import numberRiddleSlice from "./NumberRiddleSlice";
const store = configureStore({
  reducer: { global : globalSlice.reducer,numberRiddle : numberRiddleSlice.reducer },
});
export default store;