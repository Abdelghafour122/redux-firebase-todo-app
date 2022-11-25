import React from "react";
import { Labels } from "../../Utils/types";
import LabelChip from "./LabelChip";

type Props = {
  labelsList: Labels;
  todoId: string;
};

const TodoLabelsList = ({ labelsList, todoId }: Props) => {
  return (
    <>
      {labelsList !== undefined ? (
        <ul className="labels-list flex gap-1 items-center justify-start flex-wrap w-full">
          {labelsList.map((label) => (
            <LabelChip key={label.id} label={label} todoId={todoId} />
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default TodoLabelsList;
