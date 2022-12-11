import React from "react";
import { useAppSelector } from "../../../App/hooks";
import LabelItem from "./LabelItem";
import NoLabelsMessage from "./NoLabelsMessage";

const LabelContentHolder = () => {
  const labelsArray = useAppSelector((state) => state.labels.labelsList);

  return (
    <>
      {labelsArray.length !== 0 ? (
        <ul className="w-full flex flex-col gap-1 items-center justify-start p-2 bg-neutral-900 rounded-md h-[290px] overflow-y-scroll scrollbar-none">
          {labelsArray.map((label) => {
            return (
              <LabelItem
                key={label.id}
                id={label.id}
                name={label.name}
                count={label.count}
              />
            );
          })}
        </ul>
      ) : (
        <NoLabelsMessage />
      )}
    </>
  );
};

export default LabelContentHolder;
