import React from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { editLabelCountThunk } from "../../../Reducerss/labelSlice";
import { editTodosLabelsThunk } from "../../../Reducerss/todoSlice";
import { Label, Labels } from "../../../Utils/types";

type Props = {
  label: Label;
  currTodoId: string;
  added: boolean;
};

const LabelDropdownItem = ({ label, currTodoId, added }: Props) => {
  const dispatch = useAppDispatch();
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
        // count: label.count,
        // name: label.name,
        todoId: currTodoId,
        labelsList: todoLabelList.concat(label),
      })
    );
  };

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
          onClick={
            // await dispatch(
            //   addLabelToTodoThunk({
            //     id: label.id,
            //     count: label.count,
            //     name: label.name,
            //     todoId: currTodoId,
            //   })
            // );
            // dispatch(
            //   editLabelCountThunk({
            //     id: label.id,
            //     count: label.count + 1,
            //   })
            // );
            handleAddLabel
          }
        >
          {label.name}
        </button>
      )}
    </li>
  );
};

export default LabelDropdownItem;
