import React from "react";
import { FaSpinner } from "react-icons/fa";

type Props = {
  loadingText?: string;
};

const LoadingPage = ({ loadingText }: Props) => {
  return (
    <div className="h-full w-full flex items-start justify-center">
      <div className="flex flex-col items-center justify-center gap-6 ">
        <FaSpinner className="duration-1000 animate-spin text-stone-600 dark:text-stone-300 text-[7rem]" />
        <p className="font-semibold text-2xl text-stone-600 dark:text-stone-300 mt-10">
          {loadingText !== "" ? loadingText : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
