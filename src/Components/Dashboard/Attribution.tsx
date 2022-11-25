import React from "react";
import { AiFillHeart } from "react-icons/ai";

const Attribution = () => {
  return (
    <div className="attribution py-2 w-full absolute left-0 bottom-0 flex items-center justify-center gap-2">
      <p className="flex items-center gap-1 text-stone-200 text-lg font-semibold ">
        Coded with
        <AiFillHeart color="rgb(240 36 36)" size={"1.2rem"} />
        By
      </p>
      <a
        href="https://github.com/Abdelghafour122"
        rel="noreferrer noopener"
        className="link"
      >
        Abdelghafour122
      </a>
    </div>
  );
};

export default Attribution;
