import React from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { editLabelCountThunk } from "../../Reducerss/labelSlice";
import { editTodosLabelsThunk } from "../../Reducerss/todoSlice";
import { getSpecificLabelCount } from "../../Utils/firestore";
import { Label, Labels } from "../../Utils/types";

type Props = {
  label: Label;
  todoId: string;
};

const LabelChip = ({ label, todoId }: Props) => {
  const dispatch = useAppDispatch();
  const todosLabelList = useAppSelector(
    (state) =>
      state.todos.todosList.find((todo) => todo.id === todoId)?.labels as Labels
  );

  const handleRemoveLabel = async () => {
    const labelCount = await getSpecificLabelCount(label.id);
    await dispatch(
      editLabelCountThunk({
        id: label.id,
        count: (labelCount?.count - 1) as number,
      })
    );

    dispatch(
      editTodosLabelsThunk({
        todoId: todoId,
        labelsList: todosLabelList.filter(
          (localLabel) => localLabel.id !== label.id
        ),
      })
    );
  };

  return (
    <li className="px-2 py-1 bg-neutral-700 text-stone-300 font-semibold rounded-xl flex items-center justify-between gap-1">
      <p className="text-stone-300 font-semibold">{label.name}</p>
      <button
        className="p-1 rounded-full hover:bg-neutral-600 active:bg-neutral-500"
        onClick={handleRemoveLabel}
      >
        <VscChromeClose color="rgb(231 229 228)" size="1rem" />
      </button>
    </li>
  );
};

export default LabelChip;
