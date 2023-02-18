import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { useAppSelector } from "../../App/hooks";
import { checkIfLoading } from "../../Utils/types";

const Attribution = () => {
  const authSliceStatus = useAppSelector(
    (state) => state.authentication.status
  );
  return (
    <div className="attribution py-2 w-full absolute left-0 bottom-0 flex items-center justify-center gap-2">
      <p className="flex items-center gap-1 text-stone-700 dark:text-stone-200 text-lg font-semibold ">
        Coded with
        <AiFillHeart className="text-red-700 dark:text-red-600 text-[1.2rem]" />
        By
      </p>
      <a
        href="https://github.com/Abdelghafour122"
        target="_blank"
        rel="noreferrer noopener"
        className={`link ${
          checkIfLoading(authSliceStatus)
            ? "pointer-events-none"
            : "pointer-events-auto"
        }`}
      >
        Abdelghafour122
      </a>
    </div>
  );
};

export default Attribution;
