import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./components/actionSlices/UI_Slice";
import cartSlice from "./components/actionSlices/CardSlice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});
export default store;
