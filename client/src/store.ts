import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import errorReducer from "./reducers/errorReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
