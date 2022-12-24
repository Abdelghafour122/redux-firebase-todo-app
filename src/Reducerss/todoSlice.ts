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
  CompletedTodoParamsType,
  TodoFuncsLoadingStatus,
} from "../Utils/types";

type todosInitialStateType = {
  todosList: Todos;
  status: TodoFuncsLoadingStatus;
  error: null | string;
};

const initialStatus: TodoFuncsLoadingStatus = {
  addTodoStatus: LoadingStatus.idle,
  editTodoStatus: LoadingStatus.idle,
  archiveTodoStatus: {
    todoStatus: LoadingStatus.idle,
  },
  deleteTodoStatus: {
    todoStatus: LoadingStatus.idle,
  },
  fetchTodoStatus: LoadingStatus.idle,
  toggleCompletedStatus: LoadingStatus.idle,
  permanentlyDeleteTodoStatus: LoadingStatus.idle,
};

const todosInitialState: todosInitialStateType = {
  todosList: [],
  status: initialStatus,
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

export const toggleTodoCompletedThunk = createAsyncThunk(
  "todos/toggleTodoCompleted",
  async (completedTodoPayload: CompletedTodoParamsType) => {
    const completedTodoDocRef = doc(
      todoDatabase,
      "todos",
      completedTodoPayload.id
    );
    await updateDoc(completedTodoDocRef, {
      completed: completedTodoPayload.completed,
    });
    return JSON.stringify(completedTodoPayload);
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodosThunk.pending, (state) => {
        state.status.fetchTodoStatus = LoadingStatus.pending;
      })
      .addCase(fetchTodosThunk.fulfilled, (state, { payload }) => {
        state.status.fetchTodoStatus = LoadingStatus.succeeded;
        state.todosList = JSON.parse(payload);
      })
      .addCase(fetchTodosThunk.rejected, (state) => {
        state.status.fetchTodoStatus = LoadingStatus.failed;
        state.error = "An error has occured while fetching countries";
      }) //ADD TODO THUNK
      .addCase(addTodoThunk.pending, (state) => {
        state.status.addTodoStatus = LoadingStatus.pending;
      })
      .addCase(addTodoThunk.fulfilled, (state, { payload }) => {
        state.status.addTodoStatus = LoadingStatus.succeeded;
        state.todosList.push(JSON.parse(payload));
      })
      .addCase(addTodoThunk.rejected, (state) => {
        state.status.addTodoStatus = LoadingStatus.failed;
      })
      .addCase(editTodoThunk.pending, (state) => {
        state.status.editTodoStatus = LoadingStatus.pending;
      })
      .addCase(editTodoThunk.fulfilled, (state, { payload }) => {
        state.status.editTodoStatus = LoadingStatus.succeeded;
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
        state.status.editTodoStatus = LoadingStatus.failed;
      })
      .addCase(archiveTodoThunk.pending, (state, { meta }) => {
        state.status.archiveTodoStatus = {
          todoStatus: LoadingStatus.pending,
          todoId: meta.arg.id,
        };
      })
      .addCase(archiveTodoThunk.fulfilled, (state, { payload }) => {
        state.status.archiveTodoStatus = {
          todoStatus: LoadingStatus.succeeded,
        };
        const parsedPayload: ArchivedTodoParamsType = JSON.parse(payload);
        state.todosList.map((todo) => {
          if (todo.id === parsedPayload.id) {
            todo.archived = parsedPayload.archived;
          }
        });
      })
      // .addCase(archiveTodoThunk.rejected, (state) => {
      //   state.status.archiveTodoStatus = LoadingStatus.failed;
      // })
      .addCase(deleteTodoThnuk.pending, (state, { meta }) => {
        state.status.deleteTodoStatus = {
          todoStatus: LoadingStatus.pending,
          todoId: meta.arg.id,
        };
      })
      .addCase(deleteTodoThnuk.fulfilled, (state, { payload }) => {
        state.status.deleteTodoStatus = { todoStatus: LoadingStatus.succeeded };
        const parsedPayload: DeletedTodoParamsType = JSON.parse(payload);
        state.todosList.map((todo) => {
          if (todo.id === parsedPayload.id) {
            todo.deleted = parsedPayload.deleted;
          }
        });
      })
      // .addCase(deleteTodoThnuk.rejected, (state) => {
      //   state.status.deleteTodoStatus = LoadingStatus.failed;
      // })
      .addCase(permanentlyDeleteTodoThnuk.pending, (state) => {
        state.status.permanentlyDeleteTodoStatus = LoadingStatus.pending;
      })
      .addCase(permanentlyDeleteTodoThnuk.fulfilled, (state, { payload }) => {
        state.status.permanentlyDeleteTodoStatus = LoadingStatus.succeeded;
        state.todosList = state.todosList.filter(
          (todo) => todo.id !== JSON.parse(payload)
        );
      })
      .addCase(permanentlyDeleteTodoThnuk.rejected, (state) => {
        state.status.permanentlyDeleteTodoStatus = LoadingStatus.failed;
      })
      .addCase(toggleTodoCompletedThunk.pending, (state) => {
        state.status.toggleCompletedStatus = LoadingStatus.pending;
      })
      .addCase(toggleTodoCompletedThunk.fulfilled, (state, { payload }) => {
        state.status.toggleCompletedStatus = LoadingStatus.succeeded;
        const parsedPayload: CompletedTodoParamsType = JSON.parse(payload);
        state.todosList.map((todo) => {
          if (todo.id === parsedPayload.id) {
            todo.completed = parsedPayload.completed;
          }
        });
      })
      .addCase(toggleTodoCompletedThunk.rejected, (state) => {
        state.status.toggleCompletedStatus = LoadingStatus.failed;
      });
  },
});

export const {} = todoSlice.actions;
export const selectTodosValue = (state: RootState) => state.todos.todosList;
export default todoSlice.reducer;
