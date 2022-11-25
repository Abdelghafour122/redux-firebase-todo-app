import React, { useEffect, useState, useCallback, useMemo } from "react";
import { BsArchive, BsTrash } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { CgRemove } from "react-icons/cg";
import { FaTrash, FaTrashRestore } from "react-icons/fa";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { ImEnlarge2 } from "react-icons/im";
import EditTodoBackdrop from "../../../Components/Todos/EditTodoBackdrop";
import { useTodoContext } from "../../../Contexts/TodoContext";
import {
  EditTodoParamsType,
  DetailedTodoType,
  Todo as TodoType,
  Labels,
} from "../../../Utils/types";
import DetailedTodoBackdrop from "./DetailedTodoBackdrop";
import Snackbar from "../../../Components/Todos/Snackbar";
import TodoLabelsList from "../../../Components/Todos/TodoLabelsList";
import TodoActionsTooltip from "./TodoActionsTooltip";
import VerifyPermanentDelete from "./VerifyPermanentDelete";

import {
  FaTrashAlt,
  FaTrashRestoreAlt,
  FaPen,
  FaExpandAlt,
  FaLightbulb,
  FaSignOutAlt,
  FaTimes,
  FaArchive,
} from "react-icons/fa";

const Todo = (todoInfo: TodoType) => {
  const {
    removeTodoItem,
    restoreTodoItem,
    markAsCompleted,
    archiveTodoItem,
    labelsArray,
  } = useTodoContext();
  const [openEditTodoBackdrop, setOpenEditTodoBackdrop] = useState(false);
  const [openDetailedTodoBackdrop, setOpenDetailedTodoBackdrop] =
    useState(false);
  const [todoIsDone, setTodoIsDone] = useState(todoInfo.completed);
  const [openVerifyDeleteBackdrop, setOpenVerifyDeleteBackdrop] =
    useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenVerifyDeleteBackdrop = () => {
    return setOpenVerifyDeleteBackdrop(true);
  };

  const handleCloseVerifyDeleteBackdrop = () => {
    return setOpenVerifyDeleteBackdrop(false);
  };

  const handleOpenEditTodoBackdrop = () => {
    return setOpenEditTodoBackdrop(true);
  };

  const handleCloseEditTodoBackdrop = () => {
    return setOpenEditTodoBackdrop(false);
  };

  const handleOpenDetailedTodoBackdrop = () => {
    return setOpenDetailedTodoBackdrop(true);
  };

  const handleCloseDetailedTodoBackdrop = () => {
    return setOpenDetailedTodoBackdrop(false);
  };

  const handleOpenSnackbar = () => {
    return setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    return setOpenSnackbar(false);
  };

  const markTodoAsCompleted = () => {
    setTodoIsDone(!todoIsDone);
    return setTimeout(() => {
      markAsCompleted({ id: todoInfo.id, completed: !todoInfo.completed });
    }, 1500);
  };

  const syncTodoLabels = useMemo(() => {
    const todoLabelsIdList = [...todoInfo.labels.map((label) => label.id)];
    let result = [
      ...labelsArray.filter((label) => todoLabelsIdList.includes(label.id)),
    ];
    console.log("synced the labels");
    return result;
  }, [labelsArray, todoInfo.labels]);

  return (
    <div className="todo">
      {/* <button className="button" onClick={handleOpenSnackbar}> */}
      <h1 className="todo-title">
        {todoInfo.title?.length === 0 ? "No title" : todoInfo.title}
      </h1>
      <p className="todo-p">{todoInfo.content}</p>
      <div className="todo-checked">
        <input
          type="checkbox"
          id={`${todoInfo.id}`}
          checked={todoIsDone}
          onChange={markTodoAsCompleted}
        />
        <label htmlFor={`${todoInfo.id}`}>Completed</label>
      </div>
      {todoInfo.labels.length === 0 ? null : (
        <TodoLabelsList labelsList={syncTodoLabels} todoId={todoInfo.id} />
      )}
      <div className="button-cont flex items-center justify-around w-full">
        {todoInfo.deleted === undefined || todoInfo.deleted === false ? (
          <>
            <button
              className="todo-action-button relative group"
              onClick={handleOpenEditTodoBackdrop}
            >
              {/* <FiEdit3 size={"1.3rem"} /> */}
              <FaPen size={"1.3rem"} />
              <TodoActionsTooltip text={"Edit"} />
            </button>
            <>
              {todoInfo.archived === undefined ||
              todoInfo.archived === false ? (
                <button
                  className="todo-action-button group relative"
                  onClick={() =>
                    archiveTodoItem({
                      id: todoInfo.id,
                      archived: true,
                    })
                  }
                >
                  {/* <BsArchive size={"1.3rem"} /> */}
                  <FaArchive size={"1.3rem"} />
                  <TodoActionsTooltip text={"Archive"} />
                </button>
              ) : (
                <button
                  className="todo-action-button relative group"
                  onClick={() =>
                    archiveTodoItem({
                      id: todoInfo.id,
                      archived: false,
                    })
                  }
                >
                  <RiInboxUnarchiveLine size={"1.3rem"} />
                  <TodoActionsTooltip text={"Unarchive"} />
                </button>
              )}
            </>
            <button
              className="todo-action-button relative group"
              onClick={() =>
                removeTodoItem({ id: todoInfo.id, deleted: todoInfo.deleted })
              }
            >
              {/* <BsTrash size={"1.3rem"} /> */}
              <FaTrashAlt size={"1.3rem"} />
              <TodoActionsTooltip text={"Delete"} />
            </button>
            <button
              className="todo-action-button relative group"
              onClick={handleOpenDetailedTodoBackdrop}
            >
              {/* <ImEnlarge2 size={"1.3rem"} /> */}
              <FaExpandAlt size={"1.3rem"} />
              <TodoActionsTooltip text={"Enlarge"} />
            </button>
          </>
        ) : (
          <>
            <button
              className="todo-action-button relative group"
              onClick={() => handleOpenVerifyDeleteBackdrop()}
            >
              {/* <CgRemove size={"1.5rem"} color={"rgb(220 38 38)"} /> */}
              <FaTrash size={"1.5rem"} color={"rgb(220 38 38)"} />
              <TodoActionsTooltip text={"Delete forever"} />
            </button>
            <button
              className="todo-action-button relative group"
              onClick={() =>
                restoreTodoItem({ id: todoInfo.id, deleted: todoInfo.deleted })
              }
            >
              <FaTrashRestore size={"1.5rem"} color={"rgb(22 163 74)"} />
              <TodoActionsTooltip text={"Restore"} />
            </button>
          </>
        )}
      </div>
      {openEditTodoBackdrop && (
        <EditTodoBackdrop
          handleCloseEditTodoBackdrop={handleCloseEditTodoBackdrop}
          todoInfo={
            {
              id: todoInfo.id,
              title: todoInfo.title,
              content: todoInfo.content,
            } as EditTodoParamsType
          }
        />
      )}
      {openDetailedTodoBackdrop && (
        <DetailedTodoBackdrop
          handleCloseDetailedTodoBackdrop={handleCloseDetailedTodoBackdrop}
          detailedTodoInfo={
            {
              id: todoInfo.id,
              title: todoInfo.title,
              content: todoInfo.content,
              archived: todoInfo.archived,
              completed: todoInfo.completed,
              deleted: todoInfo.deleted,
              edited: todoInfo.edited,
              date: todoInfo.date,
              labels: todoInfo.labels,
            } as DetailedTodoType
          }
        />
      )}
      {/* <Snackbar
        text="Success message"
        handleCloseSnackbar={handleCloseSnackbar}
      /> */}
      {openVerifyDeleteBackdrop ? (
        <VerifyPermanentDelete
          id={todoInfo.id}
          handleCloseVerifyDeleteBackdrop={handleCloseVerifyDeleteBackdrop}
        />
      ) : null}
    </div>
  );
};

export default Todo;
