import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FaTrash, FaTrashRestore } from "react-icons/fa";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import EditTodoBackdrop from "../../../Components/Todos/EditTodoBackdrop";
import {
  EditTodoParamsType,
  DetailedTodoType,
  Todo as TodoType,
  checkIfLoading,
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
  toggleTodoCompletedThunk,
} from "../../../Reducerss/todoSlice";

const Todo = (todoInfo: TodoType) => {
  const dispatch = useAppDispatch();
  const toggleTodoCompletedThunkStatus = useAppSelector(
    (state) => state.todos.status.toggleCompletedStatus
  );

  const [openEditTodoBackdrop, setOpenEditTodoBackdrop] = useState(false);
  const [openDetailedTodoBackdrop, setOpenDetailedTodoBackdrop] =
    useState(false);
  const [todoIsDone, setTodoIsDone] = useState(todoInfo.completed);
  const [openVerifyDeleteBackdrop, setOpenVerifyDeleteBackdrop] =
    useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const currentThunkStatus = useAppSelector((state) => state.todos.status);

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
    dispatch(
      toggleTodoCompletedThunk({
        id: todoInfo.id,
        completed: !todoInfo.completed,
      })
    );
  };

  return (
    <div className="todo">
      {todoInfo.title !== "" ? (
        <h1 className="todo-title">{todoInfo.title}</h1>
      ) : null}
      <p className="todo-p">{todoInfo.content}</p>
      <button
        className={todoInfo.completed ? "completed-btn" : "checked-btn"}
        disabled={checkIfLoading(toggleTodoCompletedThunkStatus)}
        onClick={markTodoAsCompleted}
      >
        {todoInfo.completed ? "Completed" : "Mark Completed"}
      </button>
      {todoInfo.labels.length === 0 ? null : (
        <TodoLabelsList labelsList={todoInfo.labels} todoId={todoInfo.id} />
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
                  disabled={checkIfLoading(
                    currentThunkStatus.archiveTodoStatus.todoStatus
                  )}
                  onClick={async () =>
                    await dispatch(
                      archiveTodoThunk({
                        id: todoInfo.id,
                        archived: true,
                      })
                    )
                  }
                >
                  {currentThunkStatus.archiveTodoStatus.todoId ===
                    todoInfo.id &&
                  checkIfLoading(
                    currentThunkStatus.archiveTodoStatus.todoStatus
                  ) ? (
                    <FaSpinner size={"1.3rem"} className="animate-spin" />
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
                  disabled={checkIfLoading(
                    currentThunkStatus.archiveTodoStatus.todoStatus
                  )}
                  onClick={async () =>
                    await dispatch(
                      archiveTodoThunk({
                        id: todoInfo.id,
                        archived: false,
                      })
                    )
                  }
                >
                  {currentThunkStatus.archiveTodoStatus.todoId ===
                    todoInfo.id &&
                  checkIfLoading(
                    currentThunkStatus.archiveTodoStatus.todoStatus
                  ) ? (
                    <FaSpinner size={"1.3rem"} className="animate-spin" />
                  ) : (
                    <>
                      <RiInboxUnarchiveLine size={"1.3rem"} />
                      <TodoActionsTooltip text={"Unarchive"} />
                    </>
                  )}
                </button>
              )}
            </>
            <button
              className="todo-action-button relative group"
              disabled={checkIfLoading(
                currentThunkStatus.deleteTodoStatus.todoStatus
              )}
              onClick={async () =>
                await dispatch(
                  deleteTodoThnuk({
                    id: todoInfo.id,
                    deleted: true,
                  })
                )
              }
            >
              {currentThunkStatus.deleteTodoStatus.todoId === todoInfo.id &&
              checkIfLoading(currentThunkStatus.deleteTodoStatus.todoStatus) ? (
                <FaSpinner size={"1.3rem"} className="animate-spin" />
              ) : (
                <>
                  <FaTrashAlt size={"1.3rem"} />
                  <TodoActionsTooltip text={"Delete"} />
                </>
              )}
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
              disabled={checkIfLoading(
                currentThunkStatus.deleteTodoStatus.todoStatus
              )}
              onClick={async () =>
                await dispatch(
                  deleteTodoThnuk({ id: todoInfo.id, deleted: false })
                )
              }
            >
              {currentThunkStatus.deleteTodoStatus.todoId === todoInfo.id &&
              checkIfLoading(currentThunkStatus.deleteTodoStatus.todoStatus) ? (
                <FaSpinner size={"1.3rem"} className="animate-spin" />
              ) : (
                <>
                  <FaTrashRestore size={"1.5rem"} color={"rgb(22 163 74)"} />
                  <TodoActionsTooltip text={"Restore"} />
                </>
              )}
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
          labelList={todoInfo.labels}
          handleCloseVerifyDeleteBackdrop={handleCloseVerifyDeleteBackdrop}
        />
      ) : null}
    </div>
  );
};

export default Todo;
