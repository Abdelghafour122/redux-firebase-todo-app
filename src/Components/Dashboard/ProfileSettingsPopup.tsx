import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../Contexts/AuthContext";
type Props = {};

const ProfileSettingsPopup = (props: Props) => {
  const { currentUser, profilePic, userSignOut } = useAuthentication();
  const navigate = useNavigate();
  return (
    <div className="profile-info w-max flex items-center justify-start p-2 rounded-md absolute top-0 left-[calc(100%+25px)] bg-stone-700 border-2 border-stone-200">
      <img
        className="rounded-full"
        height="70px"
        width="70px"
        src={profilePic}
        alt="profile-img"
      />
      <div className="name-email flex flex-col items-start justify-start m-4">
        <p className="font-semibold text-lg text-ellipsis whitespace-nowrap overflow-hidden w-[170px] text-stone-50">
          {currentUser?.displayName}
        </p>
        <p className="text-stone-50">{currentUser?.email}</p>
      </div>
      <button
        className="button"
        onClick={async () => {
          await userSignOut();
          navigate("/");
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProfileSettingsPopup;
