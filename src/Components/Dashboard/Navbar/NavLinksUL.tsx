import React, { useState } from "react";
import {
  FaArchive,
  FaCheck,
  FaLightbulb,
  FaSignOutAlt,
  FaSpinner,
  FaTrashAlt,
} from "react-icons/fa";
import { MdLabel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { userSignOutThunk } from "../../../Reducerss/authSlice";
import { checkIfLoading } from "../../../Utils/types";
import LabelFormBackdrop from "../Labels/LabelFormBackdrop";
import LabelsNavList from "../Labels/LabelsNavList";
import NavLinkButton from "./NavLinkButton";
import Tooltip from "./Tooltip";

type LinkType = {
  index: number;
  selected: boolean;
};

const NAV_LINK_SELECTED_STATE = [
  { index: 0, selected: true },
  { index: 1, selected: false },
  { index: 2, selected: false },
  { index: 3, selected: false },
];

const linkList = sessionStorage.getItem("link-list");
linkList === null &&
  sessionStorage.setItem("link-list", JSON.stringify(NAV_LINK_SELECTED_STATE));

const NavLinksUL = () => {
  const fetchLabelsThunkStatus = useAppSelector(
    (state) => state.labels.status.fetchLabelStatus
  );

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
      linkName: "Archive",
      icon: FaArchive,
      execute: () => navigate("archived"),
    },
    {
      linkName: "Trash",
      icon: FaTrashAlt,
      execute: () => navigate("trash"),
    },
  ];
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const logoutThunkStatus = useAppSelector(
    (state) => state.authentication.status
  );

  const [openLabelsBackdrop, setOpenLabelsBackdrop] = useState(false);
  const [buttonSelected, setButtonSelected] = useState<LinkType[]>(
    JSON.parse(linkList as string)
  );

  const handleOpenLabelsBackdrop = () => {
    return setOpenLabelsBackdrop(true);
  };

  const handleCloseLabelsBackdrop = () => {
    return setOpenLabelsBackdrop(false);
  };

  const handleUserLogOut = async () => {
    await dispatch(userSignOutThunk());
    navigate("/");
  };

  const handleSelectNavButtons = (index: number) => {
    const result: LinkType[] = [
      ...NAV_LINK_SELECTED_STATE.map((link) =>
        link.index === index
          ? { ...link, selected: true }
          : { ...link, selected: false }
      ),
    ];
    setButtonSelected(result);
    sessionStorage.setItem("link-list", JSON.stringify(result));
  };

  return (
    // h-max
    <ul className="flex flex-col items-center justify-start gap-3 h-full">
      {/* NAV LINKS */}
      {NAV_LINKS.map((link, ind) => {
        return (
          <li key={ind} className="relative group">
            <NavLinkButton
              Icon={link.icon}
              handleSelectNavButtons={handleSelectNavButtons}
              index={ind}
              selected={buttonSelected[ind].selected}
              onNavigate={link.execute}
            />
            <Tooltip tooltipContent={link.linkName} />
          </li>
        );
      })}
      {/* LABEL MENU BUTTON */}
      <li className="relative group">
        <button
          className="p-3 bg-stone-300 dark:bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] dark:hover:bg-stone-600 active:bg-stone-200 dark:active:bg-stone-500 focus:bg-stone-50 dark:focus:bg-stone-400 focus:rounded-[10px]"
          onClick={handleOpenLabelsBackdrop}
        >
          {checkIfLoading(fetchLabelsThunkStatus) ? (
            <FaSpinner
              className="text-orange-600 dark:text-orange-300 animate-spin"
              size={"1.7rem"}
            />
          ) : (
            <MdLabel
              className="text-orange-600 dark:text-orange-300"
              size={"1.7rem"}
            />
          )}
        </button>
        {checkIfLoading(fetchLabelsThunkStatus) ? (
          <Tooltip tooltipContent={"Please wait"} />
        ) : (
          <Tooltip tooltipContent={"Labels"} />
        )}
      </li>
      <LabelsNavList />

      {/* LOGOUT BUTTON */}
      <li className="relative group mt-6 bottom-2">
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
      {openLabelsBackdrop === true ? (
        <LabelFormBackdrop
          handleCloseLabelsBackdrop={handleCloseLabelsBackdrop}
        />
      ) : null}
    </ul>
  );
};

export default NavLinksUL;
