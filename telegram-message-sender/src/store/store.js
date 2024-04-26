import { configureStore } from "@reduxjs/toolkit";
import { telegramApi } from "../api/telegramApi";

export const store = configureStore({
  reducer: {
    [telegramApi.reducerPath]: telegramApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(telegramApi.middleware),
});
