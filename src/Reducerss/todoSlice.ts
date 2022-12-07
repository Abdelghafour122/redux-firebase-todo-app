import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../App/store";
import { getTodosList } from "../Utils/firestore";
import { Todos, LoadingStatus } from "../Utils/types";

type todosInitialStateType = {
  todosList: Todos;
  status: LoadingStatus;
  error: null | string;
};
const todosInitialState: todosInitialStateType = {
  todosList: [],
  status: LoadingStatus.pending,
  error: null,
};

export const fetchTodosThunk = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    const todosResult = await getTodosList();
    return JSON.stringify(todosResult);
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {
    addTodo: () => {},
    editTodo: () => {},
    removeTodo: () => {},
    restoreTodo: () => {},
    permanentlyDeleteTodo: () => {},
    toggleTodoCompleted: () => {},
    archiveTodo: () => {},
    addLabelToTodo: () => {},
    removeLabelFromTodo: () => {},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodosThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
      })
      .addCase(fetchTodosThunk.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.succeeded;
        state.todosList.push(JSON.parse(payload));
      })
      .addCase(fetchTodosThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
        state.error = "An error has occured while fetching countries";
      });
  },
});

export const {} = todoSlice.actions;
export const selectTodosValue = (state: RootState) => state.todos.todosList;
export default todoSlice.reducer;
