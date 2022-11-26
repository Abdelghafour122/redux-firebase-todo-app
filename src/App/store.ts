import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { fetchTodosThunk } from "../Reducerss/todoSlice";
import labelReducer, { fetchLabelsThunk } from "../Reducerss/labelSlice";

const todoAppStore = configureStore({
  reducer: {
    todos: todoReducer,
    labels: labelReducer,
  },
});

todoAppStore.dispatch(fetchLabelsThunk);
todoAppStore.dispatch(fetchTodosThunk);

export type AppDispatch = typeof todoAppStore.dispatch;
export type RootState = ReturnType<typeof todoAppStore.getState>;

export default todoAppStore;
