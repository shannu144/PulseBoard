import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./slices/preferencesSlice";
import feedReducer from "./slices/feedSlice";
import favoritesReducer from "./slices/favoritesSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    feed: feedReducer,
    favorites: favoritesReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
