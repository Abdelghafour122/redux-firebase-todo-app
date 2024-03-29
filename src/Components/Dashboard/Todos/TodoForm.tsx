import React, { useState, SyntheticEvent } from "react";
import { FaSpinner, FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { addTodoThunk } from "../../../Reducerss/todoSlice";
import { checkIfLoading, Labels } from "../../../Utils/types";
import { Timestamp } from "firebase/firestore";

type Props = {
  handleCloseTodoFormBackdrop: () => void;
};

const TodoForm = ({ handleCloseTodoFormBackdrop }: Props) => {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoContent, setTodoContent] = useState<string>("");

  const addTodoThunkStatus = useAppSelector(
    (state) => state.todos.status.addTodoStatus
  );

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    todoContent !== "" &&
      (await dispatch(
        addTodoThunk({
          title: todoTitle,
          content: todoContent,
          archived: false,
          completed: false,
          deleted: false,
          edited: false,
          labels: [] as Labels,
          date: Timestamp.now(),
        })
      ));

    setTodoContent("");
    setTodoTitle("");

    handleCloseTodoFormBackdrop();
  };

  return (
    <div className="add-todo backdrop">
      <div className="flex flex-col items-center justify-center w-10/12 sm:w-2/3 md:w-2/5">
        <div className="w-full py-3 flex items-center justify-between">
          <p className="text-2xl font-semibold text-stone-50">Add a todo</p>
          <button
            className="p-2 rounded-full hover:bg-neutral-600 active:bg-neutral-500"
            onClick={handleCloseTodoFormBackdrop}
          >
            <FaTimes color="rgb(250 250 249)" className="text-[1.5rem]" />
          </button>
        </div>
        <form
          action=""
          className="make-todo w-full flex flex-col p-3 bg-neutral-300 dark:bg-neutral-700 rounded-xl gap-5 border-2 border-neutral-900"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="todo-form-input font-semibold text-2xl"
            value={todoTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTodoTitle(e.target.value)
            }
            placeholder="Add a title..."
          />
          <textarea
            className="todo-form-input resize-none"
            rows={7}
            maxLength={2000}
            value={todoContent}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setTodoContent(e.target.value);
            }}
            placeholder="Write a task..."
          />
          <div className="form-buttons flex items-center justify-around">
            <button
              type="submit"
              className="button flex align-center justify-center w-full"
              disabled={
                todoContent === "" || checkIfLoading(addTodoThunkStatus)
              }
            >
              {checkIfLoading(addTodoThunkStatus) ? (
                <>
                  Making &nbsp;
                  <FaSpinner className="animate-spin text-stone-100 dark:text-stone-900 text-[1.5rem]" />
                </>
              ) : (
                "Make todo"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
