import React from "react";
import { useAppSelector } from "../../../App/hooks";
import LittleSectionHeader from "../../../Components/Todos/LittleSectionHeader";
import Todo from "../Todos/Todo";

const FinishedTodosContainer = () => {
  const todoList = useAppSelector((state) => state.todos.todosList);
  return (
    <div className="section-global-container">
      <LittleSectionHeader header={"Finished Todos"} />
      <div className="finished-todos-container todo-container">
        {todoList.map((todo) =>
          todo.completed === true && todo.deleted === false ? (
            <Todo key={todo.id} {...todo} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default FinishedTodosContainer;
