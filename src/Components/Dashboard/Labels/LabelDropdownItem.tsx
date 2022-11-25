import React from "react";
import { useTodoContext } from "../../../Contexts/TodoContext";
import { Label } from "../../../Utils/types";

type Props = {
  label: Label;
  currTodoId: string;
  added: boolean;
};

const LabelDropdownItem = ({ label, currTodoId, added }: Props) => {
  const { addLabelToTodoItem } = useTodoContext();
  return (
    <li className="w-full">
      {added ? (
        <p className="p-1 font-semibold rounded-sm w-full flex items-center justify-between text-stone-300 bg-amber-900">
          <span>{label.name}</span>
          <span className="italic font-bold">*Added</span>
        </p>
      ) : (
        <button
          className="p-1 font-semibold rounded-sm w-full text-left text-stone-300 hover:bg-zinc-700 active:bg-zinc-800"
          onClick={() =>
            addLabelToTodoItem({
              id: label.id,
              name: label.name,
              todoId: currTodoId,
            })
          }
        >
          {label.name}
        </button>
      )}
    </li>
  );
};

export default LabelDropdownItem;
