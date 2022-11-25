import React from "react";
import { Labels } from "../../../Utils/types";
import LabelDropdownItem from "./LabelDropdownItem";
import NoLabelsDropdownMessage from "./NoLabelsDropdownMessage";

type Props = {
  currTodoId: string;
  labelsList: Labels;
  currTodoLabelsList: Labels;
};

const LabelListDropdown = ({
  currTodoLabelsList,
  labelsList,
  currTodoId,
}: Props) => {
  return (
    <div className="label-list-drop absolute bg-zinc-800 left-[110%] top-0 p-1 w-max min-h-[6rem] max-h-[8rem] rounded-sm flex flex-col items-start justify-start gap-2 overflow-y-scroll scrollbar-none cursor-default shadow-xl">
      <p className="text-stone-300 text-lg font-bold">Labels:</p>
      {labelsList.length === 0 ? (
        <NoLabelsDropdownMessage />
      ) : (
        <ul className="small-labels flex flex-col items-start justify-start min-w-[10rem] gap-1">
          {labelsList.map((label) =>
            currTodoLabelsList.every(
              (todoLabel) => todoLabel.id !== label.id
            ) ? (
              <LabelDropdownItem
                key={label.id}
                label={label}
                currTodoId={currTodoId}
                added={false}
              />
            ) : (
              <LabelDropdownItem
                key={label.id}
                label={label}
                currTodoId={currTodoId}
                added={true}
              />
            )
          )}
          {}
        </ul>
      )}
    </div>
  );
};

export default LabelListDropdown;
