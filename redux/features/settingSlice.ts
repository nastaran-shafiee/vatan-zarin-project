import { createSlice } from '@reduxjs/toolkit';

type AppSetting = {
  darkTheme: string;
};

const initialState = {
  darkTheme: window.localStorage.getItem('pmlm-dark-theme')
    ? window.localStorage.getItem('pmlm-dark-theme')
    : '',
} as AppSetting;

export const appSetting = createSlice({
  name: 'appSetting',
  initialState,
  reducers: {
    reset: () => initialState,

    changeTheme: (state) => {
      state.darkTheme === 'ok'
        ? window.localStorage.setItem('pmlm-dark-theme', '')
        : window.localStorage.setItem('pmlm-dark-theme', 'ok');

      state.darkTheme === 'ok'
        ? (state.darkTheme = '')
        : (state.darkTheme = 'ok');
    },
    setTheme: (state, action) => {
      state.darkTheme = action.payload;
    },
  },
});

export const { reset, changeTheme, setTheme } = appSetting.actions;
export default appSetting.reducer;
