import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FaTrash, FaTrashRestore } from "react-icons/fa";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import EditTodoBackdrop from "../../../Components/Todos/EditTodoBackdrop";
import { useTodoContext } from "../../../Contexts/TodoContext";
import {
  EditTodoParamsType,
  DetailedTodoType,
  Todo as TodoType,
  LoadingStatus,
} from "../../../Utils/types";
import DetailedTodoBackdrop from "./DetailedTodoBackdrop";
import Snackbar from "../../../Components/Todos/Snackbar";
import TodoLabelsList from "../../../Components/Todos/TodoLabelsList";
import TodoActionsTooltip from "./TodoActionsTooltip";
import VerifyPermanentDelete from "./VerifyPermanentDelete";

import {
  FaTrashAlt,
  FaPen,
  FaExpandAlt,
  FaArchive,
  FaSpinner,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import {
  archiveTodoThunk,
  deleteTodoThnuk,
} from "../../../Reducerss/todoSlice";

const Todo = (todoInfo: TodoType) => {
  const [todoActionLoading, setTodoActionLoading] = useState(false);
  const dispatch = useAppDispatch();

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

  const currentThunkStatus = useAppSelector((state) => state.todos.status);

  const curentTodo = useAppSelector((state) =>
    state.todos.todosList.find(
      (todoFromState) => todoInfo.id === todoFromState.id
    )
  );

  useEffect(() => {
    setTodoActionLoading(() =>
      Object.is(currentThunkStatus, LoadingStatus.pending)
    );
  }, [currentThunkStatus]);

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
    // console.log("synced the labels");
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
              <FaPen size={"1.3rem"} />
              <TodoActionsTooltip text={"Edit"} />
            </button>
            <>
              {todoInfo.archived === undefined ||
              todoInfo.archived === false ? (
                <button
                  className="todo-action-button group relative"
                  onClick={async () =>
                    await dispatch(
                      archiveTodoThunk({
                        id: todoInfo.id,
                        archived: true,
                      })
                    )
                  }
                >
                  {/* FIX THE ID BUG */}
                  {todoActionLoading && curentTodo?.id === todoInfo.id ? (
                    <FaSpinner
                      size={"1.3rem"}
                      className={`${todoActionLoading ? "animate-spin" : ""}`}
                    />
                  ) : (
                    <>
                      <FaArchive size={"1.3rem"} />
                      <TodoActionsTooltip text={"Archive"} />
                    </>
                  )}
                </button>
              ) : (
                <button
                  className="todo-action-button relative group"
                  onClick={async () =>
                    await dispatch(
                      archiveTodoThunk({
                        id: todoInfo.id,
                        archived: false,
                      })
                    )
                  }
                >
                  <RiInboxUnarchiveLine size={"1.3rem"} />
                  <TodoActionsTooltip text={"Unarchive"} />
                </button>
              )}
            </>
            <button
              className="todo-action-button relative group"
              onClick={async () =>
                await dispatch(
                  deleteTodoThnuk({
                    id: todoInfo.id,
                    deleted: true,
                  })
                )
              }
            >
              <FaTrashAlt size={"1.3rem"} />
              <TodoActionsTooltip text={"Delete"} />
            </button>
            <button
              className="todo-action-button relative group"
              onClick={handleOpenDetailedTodoBackdrop}
            >
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
              <FaTrash size={"1.5rem"} color={"rgb(220 38 38)"} />
              <TodoActionsTooltip text={"Delete forever"} />
            </button>
            <button
              className="todo-action-button relative group"
              onClick={async () =>
                await dispatch(
                  deleteTodoThnuk({ id: todoInfo.id, deleted: false })
                )
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
