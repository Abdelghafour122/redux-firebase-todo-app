import React, { useEffect, useState } from "react";
import { ColorThemes } from "../../Utils/types";
import ColorThemeButton from "./ColorThemeButton";
import TodoForm from "./Todos/TodoForm";

const ToolBar = () => {
  const [openTodoForm, setOpenTodoForm] = useState(false);

  const handleCloseTodoFormBackdrop = () => {
    return setOpenTodoForm(false);
  };

  const handleOpenTodoFormBackdrop = () => {
    return setOpenTodoForm(true);
  };

  return (
    <div className="toolbar">
      <div className="left flex items-center justify-between gap-3">
        <p className="text-stone-300 text-lg font-semibold">Welcome, friend!</p>
        <button
          className="button"
          onClick={handleOpenTodoFormBackdrop}
          disabled={openTodoForm}
        >
          Add todo
        </button>
      </div>
      <ColorThemeButton />
      {openTodoForm ? (
        <TodoForm handleCloseTodoFormBackdrop={handleCloseTodoFormBackdrop} />
      ) : null}
    </div>
  );
};

export default ToolBar;
