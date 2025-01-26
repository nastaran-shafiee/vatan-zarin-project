import { createSlice } from "@reduxjs/toolkit";

type SessionType = {
  tokenPmlm: string;
  redirectedPath: string;
};

const initialState = {
  tokenPmlm:
    typeof window !== "undefined" ? window.localStorage.getItem("x-token") : "",
  redirectedPath:
    typeof window !== "undefined"
      ? window.localStorage.getItem("redirected-path")
      : "",
} as SessionType;

export const Session = createSlice({
  name: "session",
  initialState,
  reducers: {
    reset: () => initialState,
    setToken: (state, action) => {
      state.tokenPmlm = action.payload;
      window.localStorage.setItem("x-token", action.payload);
    },
    removeToken: (state, action) => {
      state.tokenPmlm = "";
      window.localStorage.removeItem("x-token");
    },
    setRedirectedPath: (state, action) => {
      state.redirectedPath = action.payload;
      window.localStorage.setItem("redirected-path", action.payload);
    },
    removeRedirectedPath: (state, action) => {
      state.redirectedPath = "";
      window.localStorage.removeItem("redirected-path");
    },
  },
});

export const {
  reset,
  removeRedirectedPath,
  setRedirectedPath,
  setToken,
  removeToken,
} = Session.actions;
export default Session.reducer;
