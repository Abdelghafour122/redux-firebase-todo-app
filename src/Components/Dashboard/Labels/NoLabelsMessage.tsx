import React from "react";
import { MdLabelOff } from "react-icons/md";

const NoLabelsMessage = () => {
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center p-2 bg-neutral-400 dark:bg-neutral-900 rounded-md min-h-[190px]">
      <MdLabelOff
        size={"7rem"}
        className="text-stone-600 dark:text-stone-400"
      />
      <p className="text-2xl font-bold text-stone-700 dark:text-stone-400">
        No labels for now
      </p>
    </div>
  );
};

export default NoLabelsMessage;
