import React, { useState, useEffect } from "react";
import { useTodoContext } from "../../Contexts/TodoContext";
import ArchivedTodosContainer from "./Containers/ArchivedTodosContainer";
import EmptySection from "./Placeholders/EmptySection";
import { BsArchiveFill } from "react-icons/bs";
import LoadingPage from "./LoadingPage";

type Props = {};

const Archived = (props: Props) => {
  const { todoList } = useTodoContext();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    unArchivedTodos === undefined ? setLoading(true) : setLoading(false);
  }, [unArchivedTodos]);

  return (
    <div className="archived-todos route-container">
      {loading ? (
        <LoadingPage />
      ) : unArchivedTodos === true ? (
        <EmptySection
          Icon={BsArchiveFill}
          message={"Your archived todos will appear here!"}
        />
      ) : (
        <ArchivedTodosContainer />
      )}
    </div>
  );
};

export default Archived;
