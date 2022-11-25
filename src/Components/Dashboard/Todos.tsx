import React, { useEffect, useState } from "react";
import { useTodoContext } from "../../Contexts/TodoContext";

import { HiLightBulb } from "react-icons/hi";
import TodoForm from "./Todos/TodoForm";
import TodosContainer from "./Containers/TodosContainer";
import EmptySection from "./Placeholders/EmptySection";
import Message from "./Todos/Message";
import LoadingPage from "./LoadingPage";

type Props = {};

const Todos = (props: Props) => {
  const { todoList } = useTodoContext();

  const [openTodoForm, setOpenTodoForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noOngoingTodos, setNoOngoingTodos] = useState<boolean>();

  const handleCloseTodoFormBackdrop = () => {
    return setOpenTodoForm(false);
  };

  const handleOpenTodoFormBackdrop = () => {
    return setOpenTodoForm(true);
  };

  useEffect(() => {
    todoList === undefined ? setLoading(true) : setLoading(false);
  }, [todoList]);

  useEffect(() => {
    const checkForOngoingTodos = () => {
      if (!loading)
        return todoList.every(
          (todo) =>
            todo.archived === true ||
            todo.completed === true ||
            todo.deleted === true
        );
    };
    setNoOngoingTodos(() => checkForOngoingTodos());
  }, [todoList, loading]);

  return (
    <div className="todos">
      {openTodoForm ? (
        <TodoForm handleCloseTodoFormBackdrop={handleCloseTodoFormBackdrop} />
      ) : (
        <div className="form-note flex items-center justify-center gap-2">
          <Message message={"Click to add a todo"} />
          <button className="button" onClick={handleOpenTodoFormBackdrop}>
            Open
          </button>
        </div>
      )}
      <div className="route-container">
        {loading === true ? (
          <LoadingPage />
        ) : loading === false && noOngoingTodos === true ? (
          <EmptySection
            Icon={HiLightBulb}
            message={"Your ongoing todos will show up here!"}
          />
        ) : (
          loading === false && noOngoingTodos === false && <TodosContainer />
        )}
      </div>
    </div>
  );
};

export default Todos;
