import React, { useState, useEffect } from "react";
import { HiOutlineLightBulb, HiTag } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { BiPowerOff, BiLogOut } from "react-icons/bi";
import { MdLabel, MdLabelOutline } from "react-icons/md";
import { BsArchive, BsTrash } from "react-icons/bs";
import { MdOutlineDoneOutline } from "react-icons/md";
import ProfileSettingsPopup from "../../Components/Dashboard/ProfileSettingsPopup";

import { useNavigate } from "react-router-dom";

import { useAuthentication } from "../../Contexts/AuthContext";
import Tooltip from "./Navbar/Tooltip";
import LabelFormBackdrop from "./Labels/LabelFormBackdrop";
import { useTodoContext } from "../../Contexts/TodoContext";
import LabelsNavList from "./Labels/LabelsNavList";
import {
  FaArchive,
  FaCheck,
  FaLightbulb,
  FaSignOutAlt,
  FaTrashAlt,
} from "react-icons/fa";

type Props = {};

const Navbar = (props: Props) => {
  const { currentUser, userSignOut } = useAuthentication();
  const { fetchLabels } = useTodoContext();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState<string | undefined>();
  const [openProfilePopup, setOpenProfilePopup] = useState(false);

  const [openLabelsBackdrop, setOpenLabelsBackdrop] = useState(false);

  const handleOpenLabelsBackdrop = () => {
    return setOpenLabelsBackdrop(true);
  };

  const handleCloseLabelsBackdrop = () => {
    return setOpenLabelsBackdrop(false);
  };

  useEffect(() => {
    // console.log("labels list changed", labelsArray);
    fetchLabels();
  }, [fetchLabels]);

  useEffect(() => {
    if (currentUser?.photoURL !== null) setProfilePic(currentUser?.photoURL);
    else
      setProfilePic(process.env.PUBLIC_URL + "/Assets/defaultProfilePic.webp");
  }, [currentUser]);

  const NAV_LINKS = [
    {
      linkName: "Todos",
      // icon: HiOutlineLightBulb,
      icon: FaLightbulb,
      execute: () => navigate(""),
    },
    {
      linkName: "Finished",
      // icon: MdOutlineDoneOutline,
      icon: FaCheck,
      execute: () => navigate("finished"),
    },
    {
      linkName: "Archived",
      // icon: BsArchive,
      icon: FaArchive,
      execute: () => navigate("archived"),
    },
    {
      linkName: "Trash",
      //  icon: BsTrash,
      icon: FaTrashAlt,

      execute: () => navigate("trash"),
    },
  ];

  return (
    <nav className="py-2 px-2 h-full bg-neutral-900">
      <div className="flex flex-col items-center justify-start gap-2 h-full w-max overflow-y-scroll scrollbar-hide">
        <p className="text-2xl text-orange-300 font-sans font-extrabold border-b-2 border-b-stone-500">
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
                    className="p-3 bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] hover:bg-stone-600 active:bg-stone-500 focus:bg-stone-400 focus:rounded-[10px]"
                    onClick={link.execute}
                  >
                    <link.icon color="rgb(253 186 116)" size={"1.7rem"} />
                  </button>
                  <Tooltip tooltipContent={link.linkName} />
                </li>
              );
            })}
            <li className="relative group">
              <button
                className="p-3 bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] hover:bg-stone-600 active:bg-stone-500 focus:bg-stone-400 focus:rounded-[10px]"
                onClick={handleOpenLabelsBackdrop}
              >
                {/* <MdLabelOutline color="rgb(253 186 116)" size={"1.7rem"} /> */}
                <MdLabel color="rgb(253 186 116)" size={"1.7rem"} />
              </button>
              <Tooltip tooltipContent={"Labels"} />
            </li>
            <LabelsNavList />
            {/* LOGOUT BUTTON */}
            <li className="relative group mt-6">
              <button
                className="p-3 bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] hover:bg-stone-600 active:bg-stone-500 bottom-2 group"
                onClick={userSignOut}
              >
                {/* <BiLogOut size={"1.7rem"} color={"#ff3535"} /> */}
                <FaSignOutAlt size={"1.7rem"} color={"#ff3535"} />
                <Tooltip tooltipContent={"Sign out"} />
              </button>
            </li>
          </ul>
        </div>
        {/* JUST REMOVED THE PROFILE POPUP, MAY RECONSIDER UNDOING */}
        {/* <div className="profile relative mt-2">
          <button
            className="transition-all rounded-[50%] duration-200 ease-linear hover:rounded-[10px] overflow-hidden"
            onClick={() => setOpenProfilePopup(!openProfilePopup)}
          >
            <img className="h-12 " src={profilePic} alt="profile-img" />
          </button>
          {openProfilePopup === true && <ProfileSettingsPopup />}
        </div> */}

        {/* MOVING THE LOGOUT BUTTON TO THE NAV LINKS UL */}
        {/* <button
          className="p-3 bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] hover:bg-stone-600 active:bg-stone-500 absolute bottom-2 group"
          onClick={userSignOut}
        >
          <BiLogOut size={"1.7rem"} color={"#ff3535"} />
          <Tooltip tooltipContent={"Sign out"} />
        </button> */}
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
