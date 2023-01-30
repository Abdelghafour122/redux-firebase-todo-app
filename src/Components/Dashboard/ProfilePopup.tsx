import React from "react";
import { FaTimes, FaUserCircle } from "react-icons/fa";

type Props = {
  onClosePopup: () => void;
};

const tempImgUrl = new URL("/assets/images.jpeg", import.meta.url).href;

const ProfilePopup = ({ onClosePopup }: Props) => {
  return (
    <div className="backdrop">
      <div className="rounded-lg w-3/5 min-w-max bg-neutral-800 flex flex-col items-center justify-center overflow-hidden shadow-lg">
        <div className="w-full flex items-center justify-between bg-neutral-900 p-3">
          <h2 className="text-stone-300 font-semibold text-xl flex gap-2 items-center">
            <FaUserCircle color="rgb(214 211 209)" size={"2rem"} />
            Your profile info
          </h2>
          <button
            className="p-2 rounded-full hover:bg-neutral-600 active:bg-neutral-500"
            onClick={onClosePopup}
          >
            <FaTimes color="rgb(231 229 228)" size="1.5rem" />
          </button>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2 p-4">
          <img
            src={tempImgUrl}
            alt="prof-img"
            className="rounded-full h-40 w-40"
          />
          <h2 className="text-stone-300 font-semibold text-lg">
            GEKIPPELT alda
          </h2>
          <p className="link">Change your password</p>
          <div className="flex flex-col items-start justify-center gap-2">
            <p>You have:</p>
            <ul>
              <li>33 Ongoing todos</li>
              <li>33 Finished todos</li>
              <li>33 Archived todos</li>
              <li>33 Todos in trash</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
