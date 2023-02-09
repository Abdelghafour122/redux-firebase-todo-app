import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../App/store";
import { ColorThemes } from "../Utils/types";

const storedTheme: string | null = localStorage.getItem("color-theme");

const initialThemeState: string =
  storedTheme !== null
    ? storedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
    ? ColorThemes.dark
    : ColorThemes.light;

if (storedTheme !== null) {
  if (storedTheme === ColorThemes.dark)
    document.documentElement.classList.add(ColorThemes.dark);
  else if (storedTheme === ColorThemes.light)
    document.documentElement.classList.remove(ColorThemes.dark);
}

const themeSlice = createSlice({
  name: "themeSlice",
  initialState: initialThemeState,
  reducers: {
    setColorTheme: (state, action: PayloadAction<string>) => {
      const parsedPayload = JSON.parse(action.payload);
      state = parsedPayload;
      if (state === ColorThemes.dark) {
        document.documentElement.classList.add(ColorThemes.dark);
        localStorage.setItem("color-theme", ColorThemes.dark);
      } else {
        document.documentElement.classList.remove(ColorThemes.dark);
        localStorage.setItem("color-theme", ColorThemes.light);
      }
      return state;
    },
  },
});

export const { setColorTheme } = themeSlice.actions;
export const selectCurrentTheme = (state: RootState) => state.authentication;
export default themeSlice.reducer;
