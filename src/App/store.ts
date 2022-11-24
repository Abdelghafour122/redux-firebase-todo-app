import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { fetchTodosThunk } from "../Reducers/TodoSlice";
import labelReducer, { fetchLabelsThunk } from "../Reducers/LabelSlice";

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
