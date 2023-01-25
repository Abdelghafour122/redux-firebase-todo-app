import React from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { editLabelCountThunk } from "../../../Reducerss/labelSlice";
import { editTodosLabelsThunk } from "../../../Reducerss/todoSlice";
import { checkIfLoading, Label, Labels } from "../../../Utils/types";

type Props = {
  label: Label;
  currTodoId: string;
  added: boolean;
};

const LabelDropdownItem = ({ label, currTodoId, added }: Props) => {
  const dispatch = useAppDispatch();
  const addLabelThunkStatus = useAppSelector(
    (state) => state.todos.status.editTodosLabelListStatus
  );
  const todoLabelList = useAppSelector(
    (state) =>
      state.todos.todosList.find((todo) => todo.id === currTodoId)
        ?.labels as Labels
  );

  const handleAddLabel = async () => {
    await dispatch(
      editLabelCountThunk({
        id: label.id,
        count: label.count + 1,
      })
    );
    dispatch(
      editTodosLabelsThunk({
        todoId: currTodoId,
        labelsList: todoLabelList.concat(label),
      })
    );
  };

  console.log(checkIfLoading(addLabelThunkStatus));

  return (
    <li className="w-full">
      {added ? (
        <p className="p-1 font-semibold rounded-sm w-full flex items-center justify-between gap-3 text-stone-300 bg-amber-900">
          <span className="text-stone-400">{label.name}</span>
          <span className="italic font-black">*Added</span>
        </p>
      ) : (
        <button
          className="p-1 font-semibold rounded-sm w-full text-left text-stone-300 hover:bg-zinc-700 active:bg-zinc-800 disabled:hover:cursor-not-allowed"
          disabled={checkIfLoading(addLabelThunkStatus)}
          onClick={handleAddLabel}
        >
          {label.name}
        </button>
      )}
    </li>
  );
};

export default LabelDropdownItem;
