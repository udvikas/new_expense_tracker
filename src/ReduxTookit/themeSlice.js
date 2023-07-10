import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: "light",  toggle: false };

const themeSlice = createSlice({
  name: "Theme",
  initialState: initialState,
  reducers: {
    dark(state) {
      state.theme = "dark";
    },
    light(state) {
      state.theme = "light";
    },
    activateToggle(state) {
      state.toggle = !state.toggle
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },    
  },
});
export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
