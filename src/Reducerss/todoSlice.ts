import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { RootState } from "../App/store";
import { todoDatabase, todosCollection } from "../Utils/firestore";
import { getTodosList } from "../Utils/firestore";
import {
  Todos,
  LoadingStatus,
  AddTodoParamsType,
  EditTodoParamsType,
  ArchivedTodoParamsType,
  DeletedTodoParamsType,
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

export const archiveTodoThunk = createAsyncThunk(
  "todos/archiveTodo",
  async (archiveTodoPayload: ArchivedTodoParamsType) => {
    const archiveTodoDocRef = doc(todoDatabase, "todos", archiveTodoPayload.id);
    await updateDoc(archiveTodoDocRef, {
      archived: archiveTodoPayload.archived,
    });
    return JSON.stringify(archiveTodoPayload);
  }
);

export const deleteTodoThnuk = createAsyncThunk(
  "todos/deleteTodo",
  async (deleteTodoPayload: DeletedTodoParamsType) => {
    const editTodoDocRef = doc(todoDatabase, "todos", deleteTodoPayload.id);
    await updateDoc(editTodoDocRef, {
      deleted: deleteTodoPayload.deleted,
    });
    return JSON.stringify(deleteTodoPayload);
  }
);

export const permanentlyDeleteTodoThnuk = createAsyncThunk(
  "todos/permanentlyDeleteTodo",
  async (pDeleteTodoPayload: string) => {
    const pDeleteTodoDocRef = doc(todoDatabase, "todos", pDeleteTodoPayload);
    await deleteDoc(pDeleteTodoDocRef);
    return JSON.stringify(pDeleteTodoPayload);
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {},
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
        const parsedPayload: EditTodoParamsType = JSON.parse(payload);
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
      })
      .addCase(archiveTodoThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
      })
      .addCase(archiveTodoThunk.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.succeeded;
        const parsedPayload: ArchivedTodoParamsType = JSON.parse(payload);
        state.todosList.map((todo) => {
          if (todo.id === parsedPayload.id) {
            todo.archived = parsedPayload.archived;
          }
        });
      })
      .addCase(archiveTodoThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
      })
      .addCase(deleteTodoThnuk.pending, (state) => {
        state.status = LoadingStatus.pending;
      })
      .addCase(deleteTodoThnuk.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.succeeded;
        const parsedPayload: DeletedTodoParamsType = JSON.parse(payload);
        state.todosList.map((todo) => {
          if (todo.id === parsedPayload.id) {
            todo.deleted = parsedPayload.deleted;
          }
        });
      })
      .addCase(deleteTodoThnuk.rejected, (state) => {
        state.status = LoadingStatus.failed;
      })
      .addCase(permanentlyDeleteTodoThnuk.pending, (state) => {
        state.status = LoadingStatus.pending;
      })
      .addCase(permanentlyDeleteTodoThnuk.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.succeeded;
        state.todosList = state.todosList.filter(
          (todo) => todo.id !== JSON.parse(payload)
        );
      })
      .addCase(permanentlyDeleteTodoThnuk.rejected, (state) => {
        state.status = LoadingStatus.failed;
      });
  },
});

export const {} = todoSlice.actions;
export const selectTodosValue = (state: RootState) => state.todos.todosList;
export default todoSlice.reducer;
