import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTimes, FaUserCircle } from "react-icons/fa";
import { useAppSelector } from "../../App/hooks";
// import { getUserImage, uploadUserImageFile } from "../../Utils/firestore";

type Props = {
  onClosePopup: () => void;
};

const tempImgUrl = new URL("/assets/images.jpeg", import.meta.url).href;

const ProfilePopup = ({ onClosePopup }: Props) => {
  const [image, setImage] = useState<string | null>(null);

  const userData = useAppSelector((state) => state.authentication.user);

  // useEffect(() => {
  //   setImage(userData?.photoURL as string);
  // }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      setImage(e.target?.result as string);

      // uploadUserImageFile(file);
    };
    reader.readAsDataURL(file);
  };

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
          <div className="img-container relative">
            <img
              // src={
              //   !userData?.photoURL
              //     ? tempImgUrl
              //     : (userData?.photoURL as string)
              // }
              // src={image || tempImgUrl}
              // src={userData?.photoURL as string}
              src={image as string}
              alt="prof-img"
              className="rounded-full h-40 w-40"
            />
            <div className="change-img p-2 rounded-xl bg-neutral-600  hover:bg-neutral-500 absolute bottom-2 right-2">
              <FaEdit size={"1.5rem"} color={"rgb(231 229 228)"} />
              <input
                type="file"
                className="absolute opacity-0 text-[0px] top-0 left-0 w-full h-full z-50 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <h2 className="text-stone-300 font-semibold text-lg">
            GEKIPPELT alda
          </h2>
          <p className="link">Change your password</p>
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="text-stone-300 text-lg font-semibold">Your stats:</p>
            <ul className="">
              <li className="text-stone-300">33 Ongoing todos</li>
              <li className="text-stone-300">33 Finished todos</li>
              <li className="text-stone-300">33 Archived todos</li>
              <li className="text-stone-300">33 Todos in trash</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
