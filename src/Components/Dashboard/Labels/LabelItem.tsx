import React, { useState, useRef, useEffect } from "react";
import { FaCheck, FaPen, FaTrashAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import {
  deleteLabelThunk,
  editLabelNameThunk,
} from "../../../Reducerss/labelSlice";
import { editTodosLabelsThunk } from "../../../Reducerss/todoSlice";
import { Label, checkIfLoading } from "../../../Utils/types";

const LabelItem = ({ id, name, count }: Label) => {
  const dispatch = useAppDispatch();
  const handleLabelThunkStatus = useAppSelector(
    (state) => state.labels.status.handleLabelStatus
  );

  const todosList = useAppSelector((state) => state.todos.todosList);

  const [editable, setEditable] = useState(false);
  const labelNameRef = useRef<HTMLInputElement | null>(null);

  //  make a validation for the edited label

  useEffect(() => {
    editable && labelNameRef.current?.focus();
  }, [editable]);

  const handleEditLabelName = async () => {
    console.log(labelNameRef.current?.value);
    labelNameRef.current?.value !== undefined &&
    labelNameRef.current?.value.length !== 0 &&
    labelNameRef.current?.value.length <= 20
      ? await dispatch(
          editLabelNameThunk({
            id: id,
            name: labelNameRef.current?.value,
          })
        )
      : // REPLACE WITH A SNACKBAR
        console.log("cannot update label");
  };

  const handleDeleteLabel = async () => {
    if (count > 0) {
      todosList.forEach(async (todo) => {
        if (todo.labels.some((label) => label.id === id))
          await dispatch(
            editTodosLabelsThunk({
              todoId: todo.id,
              labelsList: todo.labels.filter((label) => label.id !== id),
            })
          );
      });
    }
    return await dispatch(deleteLabelThunk({ labelId: id, labelCount: count }));
  };

  return (
    <li className="label-item flex flex-col items-center justify-between">
      <div className="flex items-center justify-between gap-3 w-full">
        {editable ? (
          <input
            className="form-input"
            type="text"
            placeholder={name}
            ref={labelNameRef}
          />
        ) : (
          <p className="label-text">{name}</p>
        )}
        <div className="label-buttons flex gap-2 items-center">
          {count === 0 ? (
            <p className="font-semibold text-base text-yellow-600 p-1 bg-yellow-200 rounded-lg w-max">
              Unused
            </p>
          ) : (
            <p className="font-semibold text-base text-stone-300 p-1 bg-stone-600 rounded-lg w-max">{`Count: ${count}`}</p>
          )}
          {editable ? (
            <button
              className="label-button"
              onClick={() => {
                setEditable(false);
                handleEditLabelName();
              }}
            >
              <FaCheck size={"1.2rem"} color={"rgb(214 211 209)"} />
            </button>
          ) : (
            <button
              className="label-button"
              disabled={
                checkIfLoading(handleLabelThunkStatus.labelStatus) &&
                id === handleLabelThunkStatus.labelId
              }
              onClick={() => setEditable(true)}
            >
              <FaPen size={"1.2rem"} color={"rgb(214 211 209)"} />
            </button>
          )}
          <button
            className="label-button"
            disabled={
              checkIfLoading(handleLabelThunkStatus.labelStatus) &&
              id === handleLabelThunkStatus.labelId
            }
            onClick={handleDeleteLabel}
          >
            <FaTrashAlt size={"1.2rem"} color={"rgb(214 211 209)"} />
          </button>
        </div>
      </div>
      {editable ? (
        <p className="text-stone-400 font-medium text-xs w-full">
          Keep label length below 20
        </p>
      ) : null}
    </li>
  );
};

export default LabelItem;
