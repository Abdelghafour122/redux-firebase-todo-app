import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { RootState } from "../App/store";
import { todoDatabase, todosCollection } from "../Utils/firestore";
import { getTodosList } from "../Utils/firestore";
import {
  Todos,
  LoadingStatus,
  AddTodoParamsType,
  EditTodoParamsType,
} from "../Utils/types";

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

export const addTodoThunk = createAsyncThunk(
  "todos/addTodo",
  async (addTodoPayload: AddTodoParamsType) => {
    let documentId = "";
    await addDoc(todosCollection, addTodoPayload).then(
      (doc) => (documentId = doc.id)
    );
    return JSON.stringify({ ...addTodoPayload, id: documentId });
  }
);

export const editTodoThunk = createAsyncThunk(
  "todos/editTodo",
  async (editTodoPayload: EditTodoParamsType) => {
    const editTodoDocRef = doc(todoDatabase, "todos", editTodoPayload.id);
    await updateDoc(editTodoDocRef, {
      title: editTodoPayload.title,
      content: editTodoPayload.content,
    });
    return JSON.stringify(editTodoPayload);
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {
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
        state.todosList = JSON.parse(payload);
      })
      .addCase(fetchTodosThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
        state.error = "An error has occured while fetching countries";
      }) //ADD TODO THUNK
      .addCase(addTodoThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
      })
      .addCase(addTodoThunk.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.succeeded;
        state.todosList.push(JSON.parse(payload));
      })
      .addCase(addTodoThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
      })
      .addCase(editTodoThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
      })
      .addCase(editTodoThunk.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.succeeded;
        const parsedPayload = JSON.parse(payload);
        console.log(parsedPayload);
        // todo.id === parsedPayload.id
        // ? {
        //     ...todo,
        //     title: parsedPayload.title,
        //     content: parsedPayload.content,
        //     date: parsedPayload.date,
        //   }
        // : todo
        state.todosList.map((todo) => {
          if (todo.id === parsedPayload.id) {
            todo.title = parsedPayload.title;
            todo.content = parsedPayload.content;
            todo.date = parsedPayload.date;
          }
        });
      })
      .addCase(editTodoThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
      });
  },
});

export const {} = todoSlice.actions;
export const selectTodosValue = (state: RootState) => state.todos.todosList;
export default todoSlice.reducer;
