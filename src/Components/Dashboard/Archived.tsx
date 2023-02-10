import React, { useState, useEffect } from "react";
import ArchivedTodosContainer from "./Containers/ArchivedTodosContainer";
import EmptySection from "./Placeholders/EmptySection";
import { BsArchiveFill } from "react-icons/bs";
import LoadingPage from "./LoadingPage";
import { useAppSelector } from "../../App/hooks";
import { checkIfLoading } from "../../Utils/types";

const Archived = () => {
  const todoList = useAppSelector((state) => state.todos.todosList);
  const fetchingTodoThunkStatus = useAppSelector(
    (state) => state.todos.status.fetchTodoStatus
  );

  const [unArchivedTodos, setUnArchivedTodos] = useState<boolean>();

  useEffect(() => {
    const checkForUnArchivedTodos = () => {
      return todoList.every(
        (todo) =>
          todo.archived === false ||
          (todo.archived === true && todo.deleted === true)
      );
    };
    setUnArchivedTodos(() => checkForUnArchivedTodos());
  }, [todoList]);

  return (
    <div className="archived-todos route-container">
      {checkIfLoading(fetchingTodoThunkStatus) ||
      unArchivedTodos === undefined ? (
        <LoadingPage loadingText={"Please wait"} />
      ) : unArchivedTodos === true ? (
        <EmptySection Icon={BsArchiveFill} message={"No archived Todos!"} />
      ) : (
        <ArchivedTodosContainer />
      )}
    </div>
  );
};

export default Archived;
