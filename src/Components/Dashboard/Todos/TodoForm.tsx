import React, { useState, SyntheticEvent } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useTodoContext } from "../../../Contexts/TodoContext";
import { FaTimes } from "react-icons/fa";

type Props = {
  handleCloseTodoFormBackdrop: () => void;
};

const TodoForm = ({ handleCloseTodoFormBackdrop }: Props) => {
  const { addTodoItem } = useTodoContext();
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoContent, setTodoContent] = useState<string>("");
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    todoContent !== "" &&
      addTodoItem({ title: todoTitle, content: todoContent });

    setTodoContent("");
    setTodoTitle("");

    handleCloseTodoFormBackdrop();
  };

  return (
    <div className="add-todo backdrop">
      <div className="flex flex-col items-center justify-center basis-2/4">
        <div className="w-full py-3 flex items-center justify-between">
          <p className="text-2xl font-semibold text-stone-50 ">Add a todo</p>
          <button
            className="p-2 rounded-full hover:bg-neutral-600 active:bg-neutral-500"
            onClick={handleCloseTodoFormBackdrop}
          >
            <FaTimes color="rgb(250 250 249)" size="1.5rem" />
          </button>
        </div>
        <form
          action=""
          className="make-todo w-full flex flex-col p-3 bg-neutral-700 rounded-xl gap-5 border-2 border-neutral-900"
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
              className="button w-full self-center"
              disabled={todoContent === ""}
            >
              Make todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
