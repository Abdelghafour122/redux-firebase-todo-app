import React, { useState } from "react";
import { DetailedTodoType } from "../../../Utils/types";
import { formatDate } from "../../../Utils/firestore";
import { useTodoContext } from "../../../Contexts/TodoContext";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import TodoActionsTooltip from "./TodoActionsTooltip";
import LabelListDropdown from "../Labels/LabelListDropdown";
import TodoLabelsList from "../../../Components/Todos/TodoLabelsList";

import { FaTrashAlt, FaArchive, FaTags } from "react-icons/fa";
import { useAppDispatch } from "../../../App/hooks";
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
  const { labelsArray } = useTodoContext();

  const dispatch = useAppDispatch();

  const [openLabelsDrpdown, setOpenLabelsDropdown] = useState(false);
  return (
    <div className="detailed-todo backdrop">
      <section className="details flex flex-col items-start justify-start gap-3 max-w-3xl min-w-2xl bg-neutral-900 p-3 rounded-md shadow-xl">
        <div className="todo-info flex flex-col items-start justify-start w-full gap-3">
          {/* <h1 className="text-2xl leading-normal text-stone-100 font-bold rounded-md mb-0 w-[560px] break-all text-ellipsis overflow-hidden whitespace-nowrap"> */}
          <h1 className="text-2xl leading-normal text-stone-100 font-bold rounded-md mb-0 min-w-min w-[560px] max-h-[60px] break-all overflow-scroll scrollbar-none ">
            {detailedTodoInfo.title}
          </h1>
          <p className="min-h-[200px] max-h-[250px] text-lg min-w-min detailed-todo-p">
            {detailedTodoInfo.content}
          </p>
        </div>
        <p>
          {" "}
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
                onClick={async () => {
                  await dispatch(
                    deleteTodoThnuk({
                      id: detailedTodoInfo.id,
                      deleted: detailedTodoInfo.deleted,
                    })
                  );
                }}
              >
                <FaTrashAlt size={"1.3rem"} />
                <TodoActionsTooltip text={"Delete"} />
              </button>
            </li>
            <li>
              {detailedTodoInfo.archived === undefined ||
              detailedTodoInfo.archived === false ? (
                <button
                  className="todo-action-button group relative"
                  onClick={async () => {
                    dispatch(
                      archiveTodoThunk({
                        id: detailedTodoInfo.id,
                        archived: true,
                      })
                    );
                  }}
                >
                  <FaArchive size={"1.3rem"} />
                  <TodoActionsTooltip text={"Archive"} />
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
                  <RiInboxUnarchiveLine size={"1.3rem"} />
                  <TodoActionsTooltip text={"Unarchive"} />
                </button>
              )}
            </li>
            <li className="relative">
              <button
                className="todo-action-button group relative"
                onClick={() => setOpenLabelsDropdown((prev) => !prev)}
              >
                <FaTags size={"1.3rem"} />
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
