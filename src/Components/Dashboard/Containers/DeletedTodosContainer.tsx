import React from "react";
import LittleSectionHeader from "../../../Components/Todos/LittleSectionHeader";
import { useTodoContext } from "../../../Contexts/TodoContext";
import Todo from "../Todos/Todo";

const DeletedTodosContainer = () => {
  const { todoList } = useTodoContext();
  return (
    <div className="section-global-container">
      <LittleSectionHeader header={"Deleted Todos"} />
      <div className="finished-todos-container flex flex-wrap items-start justify-start gap-2">
        {todoList.map(
          (todo) => todo.deleted === true && <Todo key={todo.id} {...todo} />
        )}
      </div>
    </div>
  );
};

export default DeletedTodosContainer;
