import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import snackBarHandlerSlice from "#/redux/features/snackBarHandlerSlice";
import globalSlice from "#/redux/features/globalSlice";
import { errorHandlerMidlewsare } from "./errorHandlerMidlewsare";
import { userApi } from "#/redux/services/UserApi";
import { courseApi } from "#/redux/services/CoursesApi";
import { uploadApi } from "#/redux/services/UploadApi";

import sessionSlice from "#/redux/features/sessionSlice";
import settingSlice from "#/redux/features/settingSlice";

export const store = configureStore({
  reducer: {
    snackBarHandlerSlice,
    sessionSlice,
    settingSlice,
    globalSlice,
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
  },

  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat([userApi.middleware])
      .concat([courseApi.middleware])
      .concat([uploadApi.middleware])
      .concat([errorHandlerMidlewsare]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
