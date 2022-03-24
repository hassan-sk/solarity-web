import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import chatReducer from "./slices/chatSlice";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      chat: chatReducer,
      auth: authReducer,
      profile: profileReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
