import { Timestamp } from "firebase/firestore";
import { Actions, Labels, Todos } from "../Utils/types";
import { actions } from "./todoReducerActionsState";

export const todoReducer = (
  state: Todos,
  { type, payload }: Actions
): Todos => {
  switch (type) {
    case actions.FETCH_TODO_ITEM:
      return [...(payload.fetchedData as Todos)];

    case actions.ADD_TODO_ITEM:
      return [
        ...state,
        {
          id: payload.id as string,
          title: payload.title as string,
          content: payload.content as string,
          completed: false,
          deleted: false,
          archived: false,
          edited: false,
          date: Timestamp.now(),
          labels: [] as Labels,
        },
      ];

    case actions.EDIT_TODO_ITEM:
      return [
        ...state.map((todo) =>
          payload.id === todo.id
            ? {
                ...todo,
                title: payload.title as string,
                content: payload.content as string,
                date: payload.date as Timestamp,
                edited: true,
              }
            : todo
        ),
      ];

    case actions.REMOVE_TODO_ITEM:
      return [
        ...state.map((todo) =>
          todo.id === payload.id ? { ...todo, deleted: true } : todo
        ),
      ];

    case actions.RESTORE_TODO_ITEM:
      return [
        ...state.map((todo) =>
          todo.id === payload.id ? { ...todo, deleted: false } : todo
        ),
      ];

    case actions.PERMANENTLY_REMOVE_TODO_ITEM:
      return [...state.filter((todo) => todo.id !== payload.id)];

    case actions.TOGGLE_COMPLETED:
      return [
        ...state.map((todo) =>
          todo.id === payload.id
            ? todo.completed === true
              ? { ...todo, completed: false }
              : { ...todo, completed: true }
            : todo
        ),
      ];

    case actions.ARCHIVE_TODO_ITEM:
      return [
        ...state.map((todo) =>
          todo.id === payload.id
            ? todo.archived === true
              ? { ...todo, archived: false }
              : { ...todo, archived: true }
            : todo
        ),
      ];

    case actions.ADD_LABEL_TO_TODO_ITEM:
      return [
        ...state.map((todo) =>
          todo.id === payload.id
            ? { ...todo, labels: payload.labels as Labels }
            : todo
        ),
      ];

    case actions.REMOVE_LABEL_FROM_TODO_ITEM:
      return [
        ...state.map((todo) =>
          todo.id === payload.id
            ? { ...todo, labels: payload.labels as Labels }
            : todo
        ),
      ];

    default:
      return state;
  }
};
