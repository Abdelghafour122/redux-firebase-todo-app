import React from "react";
import LittleSectionHeader from "../../../Components/Todos/LittleSectionHeader";
import { useTodoContext } from "../../../Contexts/TodoContext";
import Todo from "../Todos/Todo";

type Props = {};

const ArchivedTodosContainer = (props: Props) => {
  const { todoList } = useTodoContext();
  return (
    <div className="section-global-container">
      <LittleSectionHeader header={"Archived Todos"} />
      {/* <div className="archived-todos-container flex flex-wrap items-start justify-start gap-2 overflow-auto"> */}
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
