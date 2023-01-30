import React, { useEffect, useState } from "react";
import { ColorThemes } from "../../Utils/types";
import ProfilePopup from "./ProfilePopup";
import TodoForm from "./Todos/TodoForm";

type Props = {};

const ToolBar = (props: Props) => {
  const [openTodoForm, setOpenTodoForm] = useState(false);
  const [colorTheme, setColorTheme] = useState<ColorThemes>(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? ColorThemes.dark
      : ColorThemes.light
  );

  const [openProfilePopup, setOpenProfilePopup] = useState(false);

  useEffect(() => {
    const storedTheme: String | null = localStorage.getItem("color-theme");
    if (storedTheme === null) {
      localStorage.setItem("color-theme", colorTheme);
    } else if (storedTheme === ColorThemes.light) {
      document.documentElement.classList.remove(ColorThemes.dark);
      setColorTheme(ColorThemes.light);
    } else if (storedTheme === ColorThemes.dark) {
      document.documentElement.classList.add(ColorThemes.dark);
      setColorTheme(ColorThemes.dark);
    }
  }, []);

  const handleCloseTodoFormBackdrop = () => {
    return setOpenTodoForm(false);
  };

  const handleOpenTodoFormBackdrop = () => {
    return setOpenTodoForm(true);
  };

  const handleChangeColorTheme = () => {
    if (colorTheme === ColorThemes.dark) {
      setColorTheme(ColorThemes.light);
      document.documentElement.classList.remove(ColorThemes.dark);
      localStorage.setItem("color-theme", ColorThemes.light);
    } else {
      setColorTheme(ColorThemes.dark);
      document.documentElement.classList.add(ColorThemes.dark);
      localStorage.setItem("color-theme", ColorThemes.dark);
    }
  };

  const handleCloseProfilePopup = () => {
    return setOpenProfilePopup(false);
  };

  const handleOpenProfilePopup = () => {
    return setOpenProfilePopup(true);
  };

  const tempImgUrl = new URL("/assets/images.jpeg", import.meta.url).href;
  return (
    <div className="toolbar">
      <div className="left flex items-center justify-between gap-3">
        <p className="text-stone-300 text-lg font-semibold">Welcome, friend!</p>
        <button
          className="button"
          onClick={handleOpenTodoFormBackdrop}
          disabled={openTodoForm}
        >
          Add todo
        </button>
      </div>
      <div className="right flex items-center justify-between gap-3">
        <button
          className="h-9 w-9 rounded-xl bg-neutral-600"
          onClick={handleChangeColorTheme}
        >
          {colorTheme === ColorThemes.dark ? "🌛" : "🌞"}
        </button>
        <button
          className="rounded-lg overflow-hidden h-9"
          onClick={handleOpenProfilePopup}
        >
          <img src={tempImgUrl} alt="pic" className="h-full" />
        </button>
      </div>
      {openTodoForm ? (
        <TodoForm handleCloseTodoFormBackdrop={handleCloseTodoFormBackdrop} />
      ) : null}
      {openProfilePopup ? (
        <ProfilePopup onClosePopup={handleCloseProfilePopup} />
      ) : null}
      {/* <ProfilePopup onClosePopup={handleCloseProfilePopup} /> */}
    </div>
  );
};

export default ToolBar;
