import React from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { editLabelCountThunk } from "../../Reducerss/labelSlice";
import { editTodosLabelsThunk } from "../../Reducerss/todoSlice";
import { getSpecificLabelCount } from "../../Utils/firestore";
import { checkIfLoading, Label, Labels } from "../../Utils/types";

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
  const editTodosLabelsThunkStatus = useAppSelector(
    (state) => state.todos.status.editTodosLabelListStatus
  );
  const editLabelCountThunkStatus = useAppSelector(
    (state) => state.labels.status.handleLabelStatus.labelStatus
  );

  const handleRemoveLabel = async () => {
    const labelCount = await getSpecificLabelCount(label.id);
    await dispatch(
      editLabelCountThunk({
        id: label.id,
        count: (labelCount?.count - 1) as number,
      })
    );
    await dispatch(
      editTodosLabelsThunk({
        todoId: todoId,
        labelsList: todosLabelList.filter(
          (localLabel) => localLabel.id !== label.id
        ),
      })
    );
  };

  return (
    <li className="px-2 py-1 bg-neutral-400 dark:bg-neutral-700 font-semibold rounded-xl flex items-center justify-between gap-1">
      <p className="text-stone-800 dark:text-stone-300 font-semibold">
        {label.name}
      </p>
      <button
        className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600 active:bg-neutral-300 dark:active:bg-neutral-500 disabled:hover:cursor-not-allowed"
        onClick={handleRemoveLabel}
        disabled={
          checkIfLoading(editTodosLabelsThunkStatus) ||
          checkIfLoading(editLabelCountThunkStatus)
        }
      >
        <VscChromeClose
          className="text-stone-800 dark:text-stone-300"
          size="1rem"
        />
      </button>
    </li>
  );
};

export default LabelChip;
