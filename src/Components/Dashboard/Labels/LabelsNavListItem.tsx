import React from "react";
import { FaTag } from "react-icons/fa";
import { HiTag } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import LabelTooltip from "./LabelTooltip";

type Props = {
  id: string;
  count: number;
  name: string;
};

const LabelsNavListItem = ({ count, name, id }: Props) => {
  let navigate = useNavigate();
  return (
    <li className="relative group">
      <button
        className="p-2 bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] hover:bg-stone-600 active:bg-stone-500 focus:bg-stone-400 focus:rounded-[10px]"
        onClick={() => navigate(`filtered/${id}`)}
      >
        {/* <HiTag size={"1.3rem"} color="rgb(253 186 116)" /> */}
        <FaTag size={"1.3rem"} color="rgb(253 186 116)" />
        {count > 0 ? (
          <div className="inline-flex absolute -top-1.5 -right-1.5 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-amber-600 rounded-lg ">
            {count}
          </div>
        ) : null}
      </button>
      <LabelTooltip tooltipContent={name} />
    </li>
  );
};

export default LabelsNavListItem;
