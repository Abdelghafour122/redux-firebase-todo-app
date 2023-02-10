import React, { useState, useEffect } from "react";
import { BsTrashFill } from "react-icons/bs";
import EmptySection from "./Placeholders/EmptySection";
import DeletedTodosContainer from "./Containers/DeletedTodosContainer";
import LoadingPage from "./LoadingPage";
import { useAppSelector } from "../../App/hooks";
import { checkIfLoading } from "../../Utils/types";

const Trash = () => {
  const todoList = useAppSelector((state) => state.todos.todosList);
  const fetchingTodoThunkStatus = useAppSelector(
    (state) => state.todos.status.fetchTodoStatus
  );
  const [undeletedTodos, setUndeletedTodos] = useState<boolean>();

  useEffect(() => {
    const checkForUndeletedTodos = () => {
      return todoList.every((todo) => todo.deleted === false);
    };
    setUndeletedTodos(() => checkForUndeletedTodos());
  }, [todoList]);

  return (
    <div className="trashed-todos route-container">
      {checkIfLoading(fetchingTodoThunkStatus) ||
      undeletedTodos === undefined ? (
        <LoadingPage loadingText={"Please wait"} />
      ) : undeletedTodos === true ? (
        <EmptySection message={"No todos in Trash!"} Icon={BsTrashFill} />
      ) : (
        <DeletedTodosContainer />
      )}
    </div>
  );
};

export default Trash;
