import React, { useEffect, useState } from "react";

import { HiLightBulb } from "react-icons/hi";
import TodosContainer from "./Containers/TodosContainer";
import EmptySection from "./Placeholders/EmptySection";
import LoadingPage from "./LoadingPage";
import { useAppSelector } from "../../App/hooks";
import { checkIfLoading } from "../../Utils/types";

const Todos = () => {
  const todoList = useAppSelector((state) => state.todos.todosList);

  const fetchingTodoThunkStatus = useAppSelector(
    (state) => state.todos.status.fetchTodoStatus
  );

  const [noOngoingTodos, setNoOngoingTodos] = useState<boolean>();

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
