import React from "react";
import LittleSectionHeader from "../../../Components/Todos/LittleSectionHeader";
import { useTodoContext } from "../../../Contexts/TodoContext";
import Todo from "../Todos/Todo";

type Props = {};

const TodosContainer = (props: Props) => {
  const { todoList } = useTodoContext();
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
