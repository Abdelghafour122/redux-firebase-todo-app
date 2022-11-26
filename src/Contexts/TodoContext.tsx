import React, {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useCallback,
  useRef,
} from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { labelsReducer } from "../Reducers/labelsReducer";
import { todoReducer } from "../Reducers/todoReducer";
import { initialState, actions } from "../Reducers/todoReducerActionsState";
import {
  AddTodoParamsType,
  TodoContextValueType,
  UpdateTodoContentParamsType,
  CompletedTodoParamsType,
  DeletedTodoParamsType,
  ArchivedTodoParamsType,
  AddLabelParamsType,
  UpdateLabelContentParamsType,
  Labels,
  AddLabelToTodoInput,
  RemoveLabelFromTodoInput,
  DeleteLabelParamsType,
} from "../Utils/types";

import {
  getLabelsList,
  getSpecificLabelCount,
  getTodosList,
  todoDatabase,
} from "../Utils/firestore";
import {
  labelsInitialState,
  labelsReducerActions,
} from "../Reducers/labelsReducerActionsState";

type TodoContextProps = {
  children: ReactNode;
};

const TodosContext = createContext<TodoContextValueType>(
  {} as TodoContextValueType
);

export function useTodoContext() {
  return useContext(TodosContext);
}

const todosCollection = collection(todoDatabase, "todos");
const labelsCollection = collection(todoDatabase, "labels");

const TodoContext = ({ children }: TodoContextProps) => {
  const todoItemIdRef = useRef<string>("");
  const labelIdRef = useRef<string>("");
  const [state, dispatch] = useReducer(todoReducer, initialState.todoList);
  const [labelsState, labelsDispatch] = useReducer(
    labelsReducer,
    labelsInitialState.labelsList
  );

  const addTodoItemToDB = async (params: AddTodoParamsType) => {
    let documentId = "";
    await addDoc(todosCollection, params)
      .then((doc) => (documentId = doc.id))
      .catch((err) => {
        console.log("error while adding a todo, ");
        return err;
      });
    return documentId;
  };

  const permanentlyDeleteTodoItemFromDB = async (removeTodoId: string) => {
    const deleteTodoDocRef = doc(todoDatabase, "todos", removeTodoId);
    await deleteDoc(deleteTodoDocRef)
      .then(() => console.log("deleted successfuly"))
      .catch((err) => console.log("error while deleting todo.", err));
  };

  const updateTodoContentInDB = async (
    updateTodoContentInput: UpdateTodoContentParamsType
  ) => {
    const editTodoDocRef = doc(
      todoDatabase,
      "todos",
      updateTodoContentInput.id
    );
    await updateDoc(editTodoDocRef, {
      title: updateTodoContentInput.title,
      content: updateTodoContentInput.content,
    })
      .then(() => console.log("content updated successfuly"))
      .catch((err) => console.log("error while updating content.", err));
  };
  const setTodoCompletedInDB = async (
    updateTodoCompletedInput: CompletedTodoParamsType
  ) => {
    const editTodoDocRef = doc(
      todoDatabase,
      "todos",
      updateTodoCompletedInput.id
    );
    await updateDoc(editTodoDocRef, {
      completed: updateTodoCompletedInput.completed,
    })
      .then(() => console.log("updated todos completed state successfuly."))
      .catch((err) =>
        console.log("error while updating todos completed state", err)
      );
  };
  const setTodoDeletedInDB = async (
    updateTodoDeletedInput: DeletedTodoParamsType
  ) => {
    const editTodoDocRef = doc(
      todoDatabase,
      "todos",
      updateTodoDeletedInput.id
    );
    await updateDoc(editTodoDocRef, {
      deleted: updateTodoDeletedInput.deleted,
    })
      .then(() => console.log("updated todos deleted state successfuly."))
      .catch((err) =>
        console.log("error while updating todos deleted state", err)
      );
  };
  const archiveTodoInDB = async (
    updateTodoArchivededInput: ArchivedTodoParamsType
  ) => {
    const editTodoDocRef = doc(
      todoDatabase,
      "todos",
      updateTodoArchivededInput.id
    );
    await updateDoc(editTodoDocRef, {
      archived: updateTodoArchivededInput.archived,
    })
      .then(() => console.log("updated todos archived state successfuly."))
      .catch((err) =>
        console.log("error while updating todos archived state", err)
      );
  };

  // LABEL RELATED FUNCS
  const addLabelToDB = async (params: AddLabelParamsType) => {
    let documentId = "";
    await addDoc(labelsCollection, params)
      .then((doc) => (documentId = doc.id))
      .catch((err) => {
        console.log("error while adding a label.");
        return err;
      });
    return documentId;
  };
  const deleteLabelFromDB = async (deleteLabelId: string) => {
    const deleteLabelDocRef = doc(todoDatabase, "labels", deleteLabelId);
    await deleteDoc(deleteLabelDocRef)
      .then(() => console.log("deleted successfuly"))
      .catch((err) => console.log("error while deleting label.", err));
  };
  const editLabelInDB = async (
    updateLabelContentInput: UpdateLabelContentParamsType
  ) => {
    const editLabelDocRef = doc(
      todoDatabase,
      "labels",
      updateLabelContentInput.id
    );
    if (updateLabelContentInput.case === "count") {
      await updateDoc(editLabelDocRef, {
        count: updateLabelContentInput.count,
      })
        .then(() => console.log("label count updated successfuly"))
        .catch((err) => console.log("error while updating label count.", err));
    } else if (updateLabelContentInput.case === "name") {
      await updateDoc(editLabelDocRef, {
        name: updateLabelContentInput.name,
      })
        .then(() => console.log("label name updated successfuly"))
        .catch((err) => console.log("error while updating label name.", err));
    }
  };

  // FIND TODO & RETURN THE TODOS LABELS ARRAY
  const getLabelsListOfTodo = (todosId: string) => {
    let curLabels = [] as Labels;
    state.forEach((todo) => {
      if (todo.id === todosId) curLabels = todo.labels;
    });
    return curLabels;
  };

  // MANAGE LABELS IN A TODO
  const addLabelToTodo = async (addLabelToTodoInput: AddLabelToTodoInput) => {
    const addLabelToTodoDocRef = doc(
      todoDatabase,
      "todos",
      addLabelToTodoInput.todoId
    );
    const labelCount = await getSpecificLabelCount(addLabelToTodoInput.id);
    await updateDoc(addLabelToTodoDocRef, {
      labels: [
        ...getLabelsListOfTodo(addLabelToTodoInput.todoId),
        {
          id: addLabelToTodoInput.id,
          name: addLabelToTodoInput.name,
          count: labelCount?.count + 1,
        },
      ],
    })
      .then(() => console.log("label added to todo successfuly"))
      .catch((err) => console.log("error while adding label to todo.", err));
  };
  const removeLabelFromTodo = async (
    removeLabelFromTodoInput: RemoveLabelFromTodoInput
  ) => {
    const removeLabelFromTodoDocRef = doc(
      todoDatabase,
      "todos",
      removeLabelFromTodoInput.todoId
    );
    await updateDoc(removeLabelFromTodoDocRef, {
      labels: [
        ...getLabelsListOfTodo(removeLabelFromTodoInput.todoId).filter(
          (todoLabels) => todoLabels.id !== removeLabelFromTodoInput.labelId
        ),
      ],
    })
      .then(() => console.log("label removed from todo successfuly"))
      .catch((err) =>
        console.log("error while removing label from todo.", err)
      );
  };

  // CONTEXT VALUE OBJECT
  const contextValue: TodoContextValueType = {
    todoList: state,
    fetchTodoItems: useCallback(async () => {
      await getTodosList().then((res) => {
        dispatch({
          type: actions.FETCH_TODO_ITEM,
          payload: { fetchedData: res },
        });
      });
    }, []),

    formatDate: (fetchedDate: Timestamp) => {
      return fetchedDate.toDate().toLocaleString("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      });
    },

    addTodoItem: async ({ title: todoItemTitle, content: todoItemContent }) => {
      await addTodoItemToDB({
        title: todoItemTitle,
        content: todoItemContent as string,
        completed: false,
        archived: false,
        deleted: false,
        edited: false,
        date: Timestamp.now(),
        labels: [],
      }).then((res) => (todoItemIdRef.current = res));
      dispatch({
        type: actions.ADD_TODO_ITEM,
        payload: {
          id: todoItemIdRef.current,
          title: todoItemTitle,
          content: todoItemContent,
        },
      });
    },
    editTodoItem: ({
      id: todoItemId,
      title: todoItemTitle,
      content: todoItemContent,
      date: todoItemDate,
    }) => {
      updateTodoContentInDB({
        id: todoItemId,
        title: todoItemTitle,
        content: todoItemContent,
        edited: true,
        date: todoItemDate,
      } as UpdateTodoContentParamsType);
      dispatch({
        type: actions.EDIT_TODO_ITEM,
        payload: {
          id: todoItemId,
          title: todoItemTitle,
          content: todoItemContent,
          date: todoItemDate,
        },
      });
    },
    removeTodoItem: ({ id: todoItemId }) => {
      setTodoDeletedInDB({
        id: todoItemId,
        deleted: true,
      } as DeletedTodoParamsType);
      dispatch({
        type: actions.REMOVE_TODO_ITEM,
        payload: { id: todoItemId },
      });
    },
    permanentlyRemoveTodoItem: ({ id: todoItemId }) => {
      permanentlyDeleteTodoItemFromDB(todoItemId as string);
      dispatch({
        type: actions.PERMANENTLY_REMOVE_TODO_ITEM,
        payload: { id: todoItemId },
      });
    },
    restoreTodoItem: ({ id: todoItemId }) => {
      setTodoDeletedInDB({
        id: todoItemId,
        deleted: false,
      } as DeletedTodoParamsType);
      dispatch({
        type: actions.RESTORE_TODO_ITEM,
        payload: { id: todoItemId },
      });
    },
    markAsCompleted: ({ id: todoItemId, completed: todoItemCompleted }) => {
      setTodoCompletedInDB({
        id: todoItemId,
        completed: todoItemCompleted,
      } as CompletedTodoParamsType);
      dispatch({
        type: actions.TOGGLE_COMPLETED,
        payload: { id: todoItemId },
      });
    },
    archiveTodoItem: async ({ id: todoItemId, archived: todoItemArchived }) => {
      await archiveTodoInDB({
        id: todoItemId,
        archived: todoItemArchived,
      });
      dispatch({
        type: actions.ARCHIVE_TODO_ITEM,
        payload: { id: todoItemId, archived: todoItemArchived },
      });
    },

    // LABELS FUNCS & STATE
    labelsArray: labelsState,
    fetchLabels: useCallback(async () => {
      await getLabelsList().then((res) => {
        labelsDispatch({
          type: labelsReducerActions.FETCH_LABEL_ITEM,
          payload: { fetchLabels: res },
        });
      });
    }, []),
    addLabel: async ({ name: labelName }: AddLabelParamsType) => {
      await addLabelToDB({ name: labelName, count: 0 }).then(
        (res) => (labelIdRef.current = res)
      );
      labelsDispatch({
        type: labelsReducerActions.ADD_LABEL_ITEM,
        payload: { id: labelIdRef.current, name: labelName },
      });
    },
    deleteLabel: (deleteLabelParams: DeleteLabelParamsType) => {
      deleteLabelFromDB(deleteLabelParams.labelId);
      state.forEach(async (todo) => {
        if (
          todo.labels.some((tLabel) => tLabel.id === deleteLabelParams.labelId)
        ) {
          await removeLabelFromTodo({
            labelId: deleteLabelParams.labelId,
            todoId: todo.id,
          });
          dispatch({
            type: actions.REMOVE_LABEL_FROM_TODO_ITEM,
            payload: {
              id: todo.id,
              labels: [
                ...getLabelsListOfTodo(todo.id).filter(
                  (todoLabels) => todoLabels.id !== deleteLabelParams.labelId
                ),
              ],
            },
          });
        }
      });
      labelsDispatch({
        type: labelsReducerActions.DELETE_LABEL_ITEM,
        payload: { id: deleteLabelParams.labelId as string },
      });
    },
    editLabel: async (editLabelParams: UpdateLabelContentParamsType) => {
      if (editLabelParams.case === "name") {
        await editLabelInDB({
          id: editLabelParams.id,
          name: editLabelParams.name,
          case: "name",
        });
        labelsDispatch({
          type: labelsReducerActions.EDIT_LABEL_ITEM,
          payload: {
            id: editLabelParams.id,
            case: "name",
            name: editLabelParams.name,
          },
        });
      } else if (editLabelParams.case === "count") {
        await editLabelInDB({
          id: editLabelParams.id,
          count: editLabelParams.count,
          case: "count",
        });
        labelsDispatch({
          type: labelsReducerActions.EDIT_LABEL_ITEM,
          payload: {
            id: editLabelParams.id,
            case: "count",
            count: editLabelParams.count,
          },
        });
      }
    },
    addLabelToTodoItem: async ({
      todoId: todoItemId,
      id: labelId,
      name: labelsName,
    }) => {
      const labelCount = await getSpecificLabelCount(labelId);
      if (
        getLabelsListOfTodo(todoItemId).every(
          (label) => label.id !== labelId
        ) === true
      ) {
        await addLabelToTodo({
          id: labelId,
          name: labelsName,
          todoId: todoItemId,
        });
        await editLabelInDB({
          id: labelId,
          count: labelCount?.count + 1,
          case: "count",
        });
        dispatch({
          type: actions.ADD_LABEL_TO_TODO_ITEM,
          payload: {
            id: todoItemId,
            labels: [
              ...getLabelsListOfTodo(todoItemId),
              { id: labelId, name: labelsName, count: labelCount?.count + 1 },
            ],
          },
        });
        labelsDispatch({
          type: labelsReducerActions.EDIT_LABEL_ITEM,
          payload: {
            id: labelId,
            case: "count",
            count: labelCount?.count + 1,
          },
        });
      }
    },
    removeLabelFromTodoItem: async (removeLabelParams) => {
      const labelCount = await getSpecificLabelCount(removeLabelParams.labelId);

      await removeLabelFromTodo(removeLabelParams);
      await editLabelInDB({
        id: removeLabelParams.labelId,
        case: "count",
        count: labelCount?.count - 1,
      });
      labelsDispatch({
        type: labelsReducerActions.EDIT_LABEL_ITEM,
        payload: {
          id: removeLabelParams.labelId,
          case: "count",
          count: labelCount?.count - 1,
        },
      });
      dispatch({
        type: actions.REMOVE_LABEL_FROM_TODO_ITEM,
        payload: {
          id: removeLabelParams.todoId,
          labels: [
            ...getLabelsListOfTodo(removeLabelParams.todoId).filter(
              (todoLabels) => todoLabels.id !== removeLabelParams.labelId
            ),
          ],
        },
      });
    },
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodoContext;
