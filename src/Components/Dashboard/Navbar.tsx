import React, { useState, useEffect } from "react";
import { MdLabel } from "react-icons/md";

import { useNavigate } from "react-router-dom";

import Tooltip from "./Navbar/Tooltip";
import LabelFormBackdrop from "./Labels/LabelFormBackdrop";
import LabelsNavList from "./Labels/LabelsNavList";
import {
  FaArchive,
  FaCheck,
  FaLightbulb,
  FaSignOutAlt,
  FaSpinner,
  FaTrashAlt,
} from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { userSignOutThunk } from "../../Reducerss/authSlice";
import { checkIfLoading } from "../../Utils/types";

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.authentication.user);

  const dispatch = useAppDispatch();

  const logoutThunkStatus = useAppSelector(
    (state) => state.authentication.status
  );

  const [openLabelsBackdrop, setOpenLabelsBackdrop] = useState(false);

  const handleOpenLabelsBackdrop = () => {
    return setOpenLabelsBackdrop(true);
  };

  const handleCloseLabelsBackdrop = () => {
    return setOpenLabelsBackdrop(false);
  };

  const NAV_LINKS = [
    {
      linkName: "Todos",
      icon: FaLightbulb,
      execute: () => navigate(""),
    },
    {
      linkName: "Finished",
      icon: FaCheck,
      execute: () => navigate("finished"),
    },
    {
      linkName: "Archived",
      icon: FaArchive,
      execute: () => navigate("archived"),
    },
    {
      linkName: "Trash",
      icon: FaTrashAlt,

      execute: () => navigate("trash"),
    },
  ];

  const handleUserLogOut = async () => {
    await dispatch(userSignOutThunk()).then((res) =>
      res.meta.requestStatus === "fulfilled"
        ? // ? console.log("uoouououuooouuooouo")
          navigate("/")
        : res.meta.requestStatus === "rejected" && console.log("logout failed")
    );
  };

  return (
    <nav className="py-2 px-2 min-h-full bg-neutral-400 dark:bg-neutral-900 shadow-sm">
      {/* overflow-y-scroll scrollbar-hide */}
      <div className="flex flex-col items-center justify-start gap-2 h-full w-max">
        <p className="text-2xl text-orange-600  dark:text-orange-300 font-sans font-extrabold border-b-2 border-b-stone-200 dark:border-b-stone-500">
          Dooit
        </p>
        <div className="funcs h-full ">
          {" "}
          {/* overflow-y-scroll scrollbar-hide*/}
          <ul className="flex flex-col items-center justify-start gap-3 h-max left-2 ">
            {/*absolute*/}
            {NAV_LINKS.map((link, ind) => {
              return (
                <li key={ind} className="relative group">
                  <button
                    className="p-3 bg-stone-300 dark:bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] dark:hover:bg-stone-600 active:bg-stone-200 dark:active:bg-stone-500 focus:bg-stone-50 dark:focus:bg-stone-400 focus:rounded-[10px]"
                    onClick={link.execute}
                  >
                    <link.icon
                      className="text-orange-600 dark:text-orange-300"
                      size={"1.7rem"}
                    />
                  </button>
                  <Tooltip tooltipContent={link.linkName} />
                </li>
              );
            })}
            <li className="relative group">
              <button
                className="p-3 bg-stone-300 dark:bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] dark:hover:bg-stone-600 active:bg-stone-200 dark:active:bg-stone-500 focus:bg-stone-50 dark:focus:bg-stone-400 focus:rounded-[10px]"
                onClick={handleOpenLabelsBackdrop}
              >
                <MdLabel
                  className="text-orange-600 dark:text-orange-300"
                  size={"1.7rem"}
                />
              </button>
              <Tooltip tooltipContent={"Labels"} />
            </li>
            <LabelsNavList />
            {/* LOGOUT BUTTON */}
            <li className="relative group mt-6">
              <button
                className="p-3 bg-stone-300 dark:bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] dark:hover:bg-stone-600 active:bg-stone-200 dark:active:bg-stone-500 bottom-2 group"
                disabled={checkIfLoading(logoutThunkStatus)}
                onClick={handleUserLogOut}
              >
                {checkIfLoading(logoutThunkStatus) ? (
                  <FaSpinner
                    size={"1.7rem"}
                    className="animate-spin"
                    color={"#ff3535"}
                  />
                ) : (
                  <>
                    <FaSignOutAlt size={"1.7rem"} color={"#ff3535"} />
                    <Tooltip tooltipContent={"Sign out"} />
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
      {openLabelsBackdrop === true ? (
        <LabelFormBackdrop
          handleCloseLabelsBackdrop={handleCloseLabelsBackdrop}
        />
      ) : null}
    </nav>
  );
};

export default Navbar;
