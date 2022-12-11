import React, { useEffect, useState } from "react";
import EmptySection from "./Placeholders/EmptySection";
import FinishedTodosContainer from "./Containers/FinishedTodosContainer";
import { MdOutlineDone } from "react-icons/md";
import LoadingPage from "./LoadingPage";
import { useAppSelector } from "../../App/hooks";

const Finished = () => {
  const todoList = useAppSelector((state) => state.todos.todosList);
  const [noFinishedTodos, setNoFinishedTodos] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    noFinishedTodos === undefined ? setLoading(true) : setLoading(false);
  }, [noFinishedTodos]);

  useEffect(() => {
    const checkForUnfinishedTodos = () => {
      return todoList.every(
        (todo) => todo.completed === false || todo.deleted === true
      );
    };
    setNoFinishedTodos(() => checkForUnfinishedTodos());
  }, [todoList]);

  return (
    <div className="finished-todos route-container">
      {loading ? (
        <LoadingPage />
      ) : noFinishedTodos === true || todoList.length === 0 ? (
        <EmptySection
          Icon={MdOutlineDone}
          message={"Your finished todos will be moved in here!"}
        />
      ) : (
        <FinishedTodosContainer />
      )}
    </div>
  );
};

export default Finished;
