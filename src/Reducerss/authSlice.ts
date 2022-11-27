import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "../Utils/types";

import { User } from "firebase/auth";
import { RootState } from "../App/store";

type authInitialStateType = {
  status: LoadingStatus;
  error: null | string;
};

const authInitialState: User | null = null;

const authSlice = createSlice({
  name: "authenticationSlice",
  initialState: authInitialState,
  reducers: {
    userSignIn: () => {},
    userSignUp: () => {},
    resetPassword: () => {},
    signInWithGoogle: () => {},
    userSignOut: () => {},
  },
});

export const {
  userSignIn,
  userSignUp,
  userSignOut,
  signInWithGoogle,
  resetPassword,
} = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.authentication;
export default authSlice.reducer;
