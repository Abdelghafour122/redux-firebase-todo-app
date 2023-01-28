import React, { useEffect, useState } from "react";

import { HiLightBulb } from "react-icons/hi";
import TodoForm from "./Todos/TodoForm";
import TodosContainer from "./Containers/TodosContainer";
import EmptySection from "./Placeholders/EmptySection";
import Message from "./Todos/Message";
import LoadingPage from "./LoadingPage";
import { useAppSelector } from "../../App/hooks";
import { checkIfLoading } from "../../Utils/types";

const Todos = () => {
  const todoList = useAppSelector((state) => state.todos.todosList);

  const fetchingTodoThunkStatus = useAppSelector(
    (state) => state.todos.status.fetchTodoStatus
  );

  const [openTodoForm, setOpenTodoForm] = useState(false);
  const [noOngoingTodos, setNoOngoingTodos] = useState<boolean>();

  const handleCloseTodoFormBackdrop = () => {
    return setOpenTodoForm(false);
  };

  const handleOpenTodoFormBackdrop = () => {
    return setOpenTodoForm(true);
  };

  useEffect(() => {
    const checkForOngoingTodos = () => {
      if (!checkIfLoading(fetchingTodoThunkStatus))
        return todoList.every(
          (todo) =>
            todo.archived === true ||
            todo.completed === true ||
            todo.deleted === true
        );
    };
    setNoOngoingTodos(() => checkForOngoingTodos());
  }, [todoList]);

  return (
    <div className="todos">
      {/* {openTodoForm ? (
        <TodoForm handleCloseTodoFormBackdrop={handleCloseTodoFormBackdrop} />
      ) : (
        <div className="form-note flex items-center justify-center gap-2">
          <Message message={"Click to add a todo"} />
          <button className="button" onClick={handleOpenTodoFormBackdrop}>
            Open
          </button>
        </div>
      )} */}

      {/* {openTodoForm ? (
        <TodoForm handleCloseTodoFormBackdrop={handleCloseTodoFormBackdrop} />
      ) : null} */}
      <div className="route-container">
        {checkIfLoading(fetchingTodoThunkStatus) ? (
          <LoadingPage loadingText={"Fetching todos..."} />
        ) : !checkIfLoading(fetchingTodoThunkStatus) &&
          noOngoingTodos === true ? (
          <EmptySection
            Icon={HiLightBulb}
            message={"Your ongoing todos will show up here!"}
          />
        ) : (
          !checkIfLoading(fetchingTodoThunkStatus) &&
          noOngoingTodos === false && <TodosContainer />
        )}
      </div>
    </div>
  );
};

export default Todos;
