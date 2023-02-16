import React from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { setColorTheme } from "../../Reducerss/themeSlice";
import { ColorThemes } from "../../Utils/types";

const ColorThemeButton = () => {
  const currentColorTheme = useAppSelector((state) => state.colorTheme);
  const dispatch = useAppDispatch();
  return (
    <button
      className="h-9 w-9 rounded-lg bg-neutral-50 dark:bg-neutral-600"
      onClick={() =>
        dispatch(
          setColorTheme(
            JSON.stringify(
              currentColorTheme === ColorThemes.light
                ? ColorThemes.dark
                : ColorThemes.light
            )
          )
        )
      }
    >
      {currentColorTheme === ColorThemes.light ? "🌛" : "🌞"}
    </button>
  );
};

export default ColorThemeButton;
