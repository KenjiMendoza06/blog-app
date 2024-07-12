import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  currentUser: null,
  error: null,
  loading: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode, signInStart, signInSuccess, signInFailure } =
  globalSlice.actions;

export default globalSlice.reducer;
