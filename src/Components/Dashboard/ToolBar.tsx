import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { setUserProfileImage } from "../../Reducerss/authSlice";
// import { changeUserImage, getUserImage } from "../../Utils/firestore";
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

  const tempImgUrl = new URL("/assets/defaultProfilePic.webp", import.meta.url)
    .href;

  const [openProfilePopup, setOpenProfilePopup] = useState(false);
  const userData = useAppSelector((state) => state.authentication.user);

  const dispatch = useAppDispatch();
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

  console.log(tempImgUrl);

  //   EVERY TIME CHECK IF THE PHOTO URL ISNT EQUAL TO THE ONE STORED IN LS
  //   UPDATE THE USER OBJECT IN LOCAL STORAGE WHEN CHANGING THE PROFILE PICTURE

  //   THIS CODE CHECKS OF THE PROFILE IMG IS NULL
  // IF SO GET THE DEFAULT IMG & SET IT
  // IF NOT GET THE CURRENT ONE AND SET IT

  //   useEffect(() => {
  //      if (userData?.photoURL === null) dispatch(setUserProfileImage(tempImgUrl));
  //     else {
  //       dispatch(setUserProfileImage(userData?.photoURL as string));
  //       changeUserImage(userData?.photoURL as string);
  //     }
  //   }, []);

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
          className="h-9 w-9 rounded-lg bg-neutral-600"
          onClick={handleChangeColorTheme}
        >
          {colorTheme === ColorThemes.dark ? "🌛" : "🌞"}
        </button>
        <button
          className="rounded-lg overflow-hidden h-9"
          onClick={handleOpenProfilePopup}
        >
          {/* <img src={tempImgUrl} alt="pic" className="h-full" /> */}
          <img
            src={userData?.photoURL as string}
            alt="pic"
            className="h-full"
          />
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
