import React from "react";
import { useAppSelector } from "../../../App/hooks";
import LittleSectionHeader from "../../../Components/Todos/LittleSectionHeader";
import Todo from "../Todos/Todo";

const DeletedTodosContainer = () => {
  const todoList = useAppSelector((state) => state.todos.todosList);
  return (
    <div className="section-global-container">
      <LittleSectionHeader header={"Deleted Todos"} />
      <div className="finished-todos-container todo-container">
        {todoList.map(
          (todo) => todo.deleted === true ? <Todo key={todo.id} {...todo} /> : null
        )}
      </div>
    </div>
  );
};

export default DeletedTodosContainer;
