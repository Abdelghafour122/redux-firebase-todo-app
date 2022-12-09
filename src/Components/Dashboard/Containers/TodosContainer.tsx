import React from "react";
import { useAppSelector } from "../../../App/hooks";
import LittleSectionHeader from "../../../Components/Todos/LittleSectionHeader";
import Todo from "../Todos/Todo";

const TodosContainer = () => {
  const todoList = useAppSelector((state) => state.todos.todosList);
  console.log(todoList);
  return (
    <div className="section-global-container">
      <LittleSectionHeader header={"Ongoing Todos"} />
      <div className="todos-container todo-container">
        {todoList.map(
          (todo) =>
            todo.completed === false &&
            todo.deleted === false &&
            todo.archived === false && <Todo key={todo.id} {...todo} />
        )}
      </div>
    </div>
  );
};

export default TodosContainer;
