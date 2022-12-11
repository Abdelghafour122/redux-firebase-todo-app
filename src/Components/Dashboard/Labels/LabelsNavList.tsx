import React from "react";
import { useAppSelector } from "../../../App/hooks";
import LabelsNavListItem from "./LabelsNavListItem";

const LabelsNavList = () => {
  const labelsArray = useAppSelector((state) => state.labels.labelsList);
  return (
    <ul className="label-nav-list flex flex-col w-full items-end justify-start gap-2">
      {labelsArray.length !== 0
        ? labelsArray.map((label) => {
            return (
              <LabelsNavListItem
                key={label.id}
                id={label.id}
                count={label.count}
                name={label.name}
              />
            );
          })
        : null}
    </ul>
  );
};

export default LabelsNavList;
