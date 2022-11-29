import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "../Utils/types";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { RootState } from "../App/store";
import { globalAuth } from "../firebase";
import { useEffect } from "react";

type authInitialStateType = {
  status: LoadingStatus;
  user: User | null;
  error: null | string;
};

type emailPasswordDataType = {
  email: string;
  password: string;
};

const authInitialState: authInitialStateType = {
  status: LoadingStatus.pending,
  user: null,
  error: null,
};

const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const googleProvider = new GoogleAuthProvider();

const authSlice = createSlice({
  name: "authenticationSlice",
  initialState: authInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userSignUpThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
      })
      .addCase(userSignUpThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
        state.error = "Sign up failed, something went wrong!";
      })
      .addCase(userSignUpThunk.fulfilled, (state) => {
        state.status = LoadingStatus.succeeded;
        globalAuth.onAuthStateChanged((user) => {
          state.user = user;
        });
      });
  },
});

export const userSignUpThunk = createAsyncThunk(
  "userSignUp",
  async (signUpData: emailPasswordDataType) => {
    return await createUserWithEmailAndPassword(
      globalAuth,
      signUpData.email,
      signUpData.password
    );
  }
);

export const userSignInThunk = createAsyncThunk(
  "userSignIn",
  async (signInData: emailPasswordDataType) => {
    return await signInWithEmailAndPassword(
      globalAuth,
      signInData.email,
      signInData.password
    );
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "resetPassword",
  async (email: string) => {
    return await sendPasswordResetEmail(globalAuth, email);
  }
);

export const signInWithGoogleThunk = createAsyncThunk(
  "userSignInWithGoogle",
  async () => {
    return await signInWithPopup(globalAuth, googleProvider);
  }
);

export const userSignOutThunk = createAsyncThunk("userSignOut", async () => {
  return await signOut(globalAuth);
});

export const {
  //   userSignIn,
  //   userSignUp,
  //   userSignOut,
  //   signInWithGoogle,
  //   resetPassword,
} = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.authentication;
export default authSlice.reducer;
