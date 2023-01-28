import React, { useState, useRef, useEffect } from "react";
import { FaCheck, FaPen, FaTrashAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import {
  deleteLabelThunk,
  editLabelNameThunk,
} from "../../../Reducerss/labelSlice";
import { editTodosLabelsThunk } from "../../../Reducerss/todoSlice";
import { Label, checkIfLoading } from "../../../Utils/types";
import LabelHelperText from "./LabelHelperText";

const LabelItem = ({ id, name, count }: Label) => {
  const dispatch = useAppDispatch();
  const handleLabelThunkStatus = useAppSelector(
    (state) => state.labels.status.handleLabelStatus
  );

  const todosList = useAppSelector((state) => state.todos.todosList);

  const [editable, setEditable] = useState(false);
  const [labelName, setLabelName] = useState(name);
  const [labelNameTooShort, setLabelNameTooShort] = useState(false);
  const [labelNameTooLong, setLabelNameTooLong] = useState(false);

  const labelNameRef = useRef<HTMLInputElement | null>(null);

  //  make a validation for the edited label

  useEffect(() => {
    editable && labelNameRef.current?.focus();
  }, [editable]);

  const handleEditLabelName = async () => {
    labelName.length !== 0 && labelName.length <= 20 && labelName !== name
      ? await dispatch(
          editLabelNameThunk({
            id: id,
            name: labelName,
          })
        )
      : // REPLACE WITH A SNACKBAR
        console.log("cannot update label");
  };

  useEffect(() => {
    const checkLabelLength = () => {
      if (labelName.length === 0) {
        setLabelNameTooShort(true);
        labelNameTooLong && setLabelNameTooLong(false);
      } else if (labelName.length > 20) {
        setLabelNameTooLong(true);
        labelNameTooShort && setLabelNameTooShort(false);
      } else {
        setLabelNameTooLong(false);
        setLabelNameTooShort(false);
      }
    };
    checkLabelLength();
  }, [labelName]);

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
            value={labelName}
            ref={labelNameRef}
            onChange={(e) => {
              setLabelName(e.target.value.trim());
            }}
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
                setLabelName(name);
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
      {editable && !labelNameTooShort && !labelNameTooLong ? (
        <LabelHelperText
          helperText={"Keep label length below 20"}
          error={false}
        />
      ) : null}
      {editable && labelNameTooLong ? (
        <LabelHelperText
          helperText={"Label can't be longer than 20!"}
          error={true}
        />
      ) : null}
      {editable && labelNameTooShort ? (
        <LabelHelperText
          helperText={"Label can't be left empty"}
          error={true}
        />
      ) : null}
    </li>
  );
};

export default LabelItem;
