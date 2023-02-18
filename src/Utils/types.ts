import { Timestamp } from "firebase/firestore";

export enum LoadingStatus {
  idle = "Idle",
  pending = "Pending",
  succeeded = "Succeeded",
  failed = "Failed",
}

export enum ColorThemes {
  light = "light",
  dark = "dark",
}

type TodoStatusType = {
  todoId?: string;
  todoStatus: LoadingStatus;
};

type LabelStatusType = {
  labelId?: string;
  labelStatus: LoadingStatus;
};

export type TodoFuncsLoadingStatus = {
  addTodoStatus: LoadingStatus;
  editTodoStatus: LoadingStatus;
  toggleCompletedStatus: LoadingStatus;
  fetchTodoStatus: LoadingStatus;
  permanentlyDeleteTodoStatus: LoadingStatus;
  archiveTodoStatus: TodoStatusType;
  deleteTodoStatus: TodoStatusType;
  editTodosLabelListStatus: LoadingStatus;
};

export type LabelFuncsLoadingStatus = {
  fetchLabelStatus: LoadingStatus;
  addLabelStatus: LoadingStatus;
  handleLabelStatus: LabelStatusType;
};

export const checkIfLoading = (funcStatus: LoadingStatus) => {
  return Object.is(funcStatus, LoadingStatus.pending);
};

export enum AuthUIMessages {
  signInFailed = "Sign in failed, something went wrong!",
  signInPending = "Signing you in...",
  signUpFailed = "Sign up failed, something went wrong!",
  passwordsDontMatch = "Passwords don't match!",
  passwordInvalid = "Password invalid",
  googleSignInFailed = "Sign in with google failed, something went wrong!",
  emailInvalid = "This is not an Email",
  resetPasswordFailed = "Unable to reset password, something went wrong!",
  resetPasswordSucceeded = "Check your inbox!",
}

export type PermanentlyDeleteTodoParamsType = {
  id: string;
};

export type AddTodoParamsType = {
  title?: string;
  content: string;
  completed: boolean;
  deleted: boolean;
  archived: boolean;
  edited: boolean;
  date: Timestamp;
  labels: Labels;
};

export type CompletedTodoParamsType = {
  id: string;
  completed: boolean;
};

export type DeletedTodoParamsType = {
  id: string;
  deleted: boolean;
};

export type ArchivedTodoParamsType = {
  id: string;
  archived: boolean;
};

export type EditTodoParamsType = {
  id: string;
  title: string;
  content: string;
  date: Timestamp;
};

export type DetailedTodoType = AddTodoParamsType & {
  id: string;
};

export type InitialReducerStateType = {
  todoList: Todos;
};

export type Todo = {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  deleted: boolean;
  archived: boolean;
  edited: boolean;
  date: Timestamp;
  labels: Labels;
};

export type Todos = Todo[];

export type Label = {
  id: string;
  name: string;
  count: number;
};

export type Labels = Label[];

export type AddLabelParamsType = {
  name: string;
  count: number;
};

export type DeleteLabelParamsType = {
  labelId: string;
  labelCount: number;
};

export type UpdateLabelCountParamsTypeRedux = {
  id: string;
  count: number;
};

export type UpdateLabelNameParamsTypeRedux = {
  id: string;
  name: string;
};

export type HandleTodosLables = {
  todoId: string;
  labelsList: Labels;
};
