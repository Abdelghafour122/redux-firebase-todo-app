import React from "react";
import { useAppSelector } from "../../../App/hooks";
import { Labels } from "../../../Utils/types";
import Todo from "../Todos/Todo";

type Props = {
  id: string;
  name: string;
};

const LabeledTodosContainer = ({ id, name }: Props) => {
  const todoList = useAppSelector((state) => state.todos.todosList);
  const getLabelsIds = (curLabelsList: Labels) => {
    return curLabelsList.map((label) => label.id);
  };

  return (
    <div className="section-global-container">
      <p className="section-small-header">
        Todos labeled by:{" "}
        <span className="font-semibold text-stone-200 text-lg">{name}</span>{" "}
      </p>
      <div className="todo-container">
        {todoList.map((todo) =>
          getLabelsIds(todo.labels).includes(id) ? (
            <Todo key={todo.id} {...todo} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default LabeledTodosContainer;
