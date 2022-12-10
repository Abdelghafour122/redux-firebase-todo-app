import React from "react";
import { useAppSelector } from "../../../App/hooks";
import LittleSectionHeader from "../../../Components/Todos/LittleSectionHeader";
import Todo from "../Todos/Todo";

const ArchivedTodosContainer = () => {
  const todoList = useAppSelector((state) => state.todos.todosList);
  return (
    <div className="section-global-container">
      <LittleSectionHeader header={"Archived Todos"} />
      <div className="archived-todos-container todo-container">
        {todoList.map((todo) => {
          return (
            todo.deleted === false &&
            todo.archived === true && <Todo key={todo.id} {...todo} />
          );
        })}
      </div>
    </div>
  );
};

export default ArchivedTodosContainer;
