import React from "react";
import { useTodoContext } from "../../../Contexts/TodoContext";
import LabelsNavListItem from "./LabelsNavListItem";

type Props = {};

const LabelsNavList = (props: Props) => {
  const { labelsArray } = useTodoContext();
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
