import React, { useState } from "react";
import { DetailedTodoType, checkIfLoading } from "../../../Utils/types";
import { formatDate } from "../../../Utils/firestore";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import TodoActionsTooltip from "./TodoActionsTooltip";
import LabelListDropdown from "../Labels/LabelListDropdown";
import TodoLabelsList from "../../../Components/Todos/TodoLabelsList";

import { FaTrashAlt, FaArchive, FaTags, FaSpinner } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import {
  archiveTodoThunk,
  deleteTodoThnuk,
} from "../../../Reducerss/todoSlice";

type Props = {
  handleCloseDetailedTodoBackdrop: () => void;
  detailedTodoInfo: DetailedTodoType;
};

const DetailedTodoBackdrop = ({
  handleCloseDetailedTodoBackdrop,
  detailedTodoInfo,
}: Props) => {
  const labelsArray = useAppSelector((state) => state.labels.labelsList);

  const currentThunkStatus = useAppSelector((state) => state.todos.status);

  const dispatch = useAppDispatch();

  const [openLabelsDrpdown, setOpenLabelsDropdown] = useState(false);
  return (
    <div className="backdrop">
      <section className="detailed-todo w-11/12 md:w-3/5">
        <div className="todo-info flex flex-col items-start justify-start w-full gap-3">
          <h1
            className={`detailed-todo-header ${
              detailedTodoInfo.title === ""
                ? "text-stone-400 dark:text-stone-600 "
                : "text-stone-900 dark:text-stone-100"
            }`}
          >
            {detailedTodoInfo.title !== ""
              ? detailedTodoInfo.title
              : "No title"}
          </h1>
          <p className="min-h-[200px] max-h-[250px] text-lg min-w-min detailed-todo-p">
            {detailedTodoInfo.content}
          </p>
        </div>
        <p>
          {`${
            detailedTodoInfo.edited === false ? "Created on: " : "Edited on: "
          } ${formatDate(detailedTodoInfo.date)}`}{" "}
        </p>
        {detailedTodoInfo.labels.length === 0 ? null : (
          <TodoLabelsList
            labelsList={detailedTodoInfo.labels}
            todoId={detailedTodoInfo.id}
          />
        )}
        <div className="todo-funcs w-full flex items-center justify-between">
          <ul className="flex items-center justify-between gap-1">
            <li>
              <button
                className="todo-action-button group relative"
                disabled={checkIfLoading(
                  currentThunkStatus.deleteTodoStatus.todoStatus
                )}
                onClick={async () => {
                  await dispatch(
                    deleteTodoThnuk({
                      id: detailedTodoInfo.id,
                      deleted: true,
                    })
                  );
                }}
              >
                {checkIfLoading(
                  currentThunkStatus.deleteTodoStatus.todoStatus
                ) ? (
                  <FaSpinner className="animate-spin text-[1.3rem]" />
                ) : (
                  <>
                    <FaTrashAlt className="text-[1.3rem]" />
                    <TodoActionsTooltip text={"Delete"} />
                  </>
                )}
              </button>
            </li>
            <li>
              {detailedTodoInfo.archived === undefined ||
              detailedTodoInfo.archived === false ? (
                <button
                  className="todo-action-button group relative"
                  disabled={checkIfLoading(
                    currentThunkStatus.archiveTodoStatus.todoStatus
                  )}
                  onClick={async () => {
                    await dispatch(
                      archiveTodoThunk({
                        id: detailedTodoInfo.id,
                        archived: true,
                      })
                    );
                  }}
                >
                  {checkIfLoading(
                    currentThunkStatus.archiveTodoStatus.todoStatus
                  ) ? (
                    <FaSpinner className="animate-spin text-[1.3rem]" />
                  ) : (
                    <>
                      <FaArchive className="text-[1.3rem]" />
                      <TodoActionsTooltip text={"Archive"} />
                    </>
                  )}
                </button>
              ) : (
                <button
                  className="todo-action-button group relative"
                  onClick={async () =>
                    await dispatch(
                      archiveTodoThunk({
                        id: detailedTodoInfo.id,
                        archived: false,
                      })
                    )
                  }
                >
                  <RiInboxUnarchiveLine className="text-[1.3rem]" />
                  <TodoActionsTooltip text={"Unarchive"} />
                </button>
              )}
            </li>
            <li className="relative">
              <button
                className="todo-action-button group relative"
                onClick={() => setOpenLabelsDropdown((prev) => !prev)}
              >
                <FaTags className="text-[1.3rem]" />
                <TodoActionsTooltip text={"Add Label"} />
              </button>
              {openLabelsDrpdown ? (
                <LabelListDropdown
                  labelsList={labelsArray}
                  currTodoId={detailedTodoInfo.id}
                  currTodoLabelsList={detailedTodoInfo.labels}
                />
              ) : null}
            </li>
          </ul>
          <div className="close-button">
            <button
              className="button pointer-events-auto"
              onClick={handleCloseDetailedTodoBackdrop}
            >
              Close
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DetailedTodoBackdrop;
