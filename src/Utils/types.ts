import { User, UserCredential } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export enum LoadingStatus {
  idle = "Idle",
  pending = "Pending",
  succeeded = "Succeeded",
  failed = "Failed",
}

export type TodoFuncsLoadingStatus = {
  addTodoStatus: LoadingStatus;
  toggleCompletedStatus: LoadingStatus;
  editTodoStatus: LoadingStatus;
  archiveTodoStatus: LoadingStatus;
  deleteTodoStatus: LoadingStatus;
  permanentlyDeleteTodoStatus: LoadingStatus;
  fetchTodoStatus: LoadingStatus;
};

export const checkIfLoading = (funcStatus: LoadingStatus) => {
  return Object.is(funcStatus, LoadingStatus.pending);
};

export enum AuthUIMessages {
  signInFailed = "Sign in failed, something went wrong!",
  signUpFailed = "Sign up failed, something went wrong!",
  passwordsDontMatch = "Passwords don't match!",
  passwordInvalid = "Password invalid",
  googleSignInFailed = "Sign in with google failed, something went wrong!",
  emailInvalid = "This is not an Email",
  resetPasswordFailed = "Unable to reset password, something went wrong!",
  resetPasswordSucceeded = "Check your inbox!",
}

export type AuthContextType = {
  currentUser: User | null | undefined;
  profilePic: string | undefined;
  userSignUp: (email: string, password: string) => Promise<UserCredential>;
  userSignIn: (email: string, password: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  userSignOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  EMAIL_REGEX: RegExp;
};

export type TodoContextValueType = {
  todoList: Todos;
  formatDate: (fetchedDate: Timestamp) => string;
  fetchTodoItems: () => Promise<void>;
  addTodoItem: ({ title, content }: EditTodoPayloadType) => void;
  editTodoItem: ({ id, title, content }: EditTodoParamsType) => void;
  removeTodoItem: ({ id, deleted }: DeletedTodoParamsType) => void;
  permanentlyRemoveTodoItem: ({ id }: PermanentlyDeleteTodoParamsType) => void;
  restoreTodoItem: ({ id, deleted }: DeletedTodoParamsType) => void;
  markAsCompleted: ({ id, completed }: CompletedTodoParamsType) => void; //CompletedTodoParamsType
  archiveTodoItem: ({ id, archived }: ArchivedTodoParamsType) => void;
  labelsArray: Labels;
  fetchLabels: () => Promise<void>;
  addLabel: ({ name }: AddLabelParamsType) => void;
  deleteLabel: (id: DeleteLabelParamsType) => void;
  // deleteLabel: (id: RemoveLabelFromTodoInput) => void;
  editLabel: (editLabelParams: UpdateLabelContentParamsType) => void;
  addLabelToTodoItem: (addLabelParams: AddLabelToTodoInput) => void;
  removeLabelFromTodoItem: (
    removeLabelParams: RemoveLabelFromTodoInput
  ) => void;
};

// type ArchiveTodoType = {
//   id: string;
//   deleted: boolean;
// };

export type EditTodoPayloadType = {
  id?: string;
  title?: string | undefined;
  content?: string | undefined;
  deleted?: boolean;
  archived?: boolean;
  fetchedData?: Todos;
  date?: Timestamp;
  labels?: Labels;
};

export type LabelsReducerPayloadType = {
  id?: string;
  name?: string;
  count?: number;
  fetchLabels?: Labels;
  // MAYBE MAKE AN ENUM HERE
  case?: "name" | "count";
};

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

// REMOVE THIS LATER
export type UpdateTodoContentParamsType = {
  id: string;
  title: string;
  content: string;
  edited: boolean;
};

// export type DeletedTodoParamsType = ArchiveTodoType;
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

export type Actions = {
  type: string;
  payload: EditTodoPayloadType;
};

export type LabelsActions = {
  type: string;
  payload: LabelsReducerPayloadType;
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

export type UpdateLabelCountParamsType = {
  case: "count";
  id: string;
  count: number;
};

export type UpdateLabelNameParamsType = {
  case: "name";
  id: string;
  name: string;
};

export type UpdateLabelCountParamsTypeRedux = {
  id: string;
  count: number;
};

export type UpdateLabelNameParamsTypeRedux = {
  id: string;
  name: string;
};

export type UpdateLabelContentParamsType =
  | UpdateLabelNameParamsType
  | UpdateLabelCountParamsType;

export type AddLabelToTodoInput = {
  id: string;
  name: string;
  todoId: string;
};
export type RemoveLabelFromTodoInput = {
  todoId: string;
  labelId: string;
};
