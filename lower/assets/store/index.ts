import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import systemSlice from "./reducers/systemSlice";
import dictsSlice from "./reducers/dictsSlice";
import layoutSlice from "./reducers/layoutSlice";
import debtorSlice from "./reducers/debtorSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    dicts: dictsSlice,
    debtor: debtorSlice,
    layout: layoutSlice,
    system: systemSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;