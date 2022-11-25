import React from "react";
import { MdLabelOff } from "react-icons/md";

type Props = {};

const NoLabelsMessage = (props: Props) => {
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center p-2 bg-neutral-900 rounded-md min-h-[190px]">
      <MdLabelOff size={"7rem"} color={"rgb(168 162 158)"} />
      <p className="text-2xl font-bold text-stone-400">No labels for now</p>
    </div>
  );
};

export default NoLabelsMessage;
