import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingStatus, UIMessages } from "../Utils/types";

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
  status: LoadingStatus.idle,
  user: null,
  error: null,
};

export const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,24}$/;
const googleProvider = new GoogleAuthProvider();

const authSlice = createSlice({
  name: "authenticationSlice",
  initialState: authInitialState,
  reducers: {},
  extraReducers(builder) {
    builder //SIGN UP EMAIL PASSWORD
      .addCase(userSignUpThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
      })
      .addCase(userSignUpThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
        state.error = UIMessages.signUpFailed;
      })
      .addCase(userSignUpThunk.fulfilled, (state, action) => {
        state.status = LoadingStatus.succeeded;
        state.user = JSON.parse(action.payload);
      }) //GOOGLE AUTH
      .addCase(signInWithGoogleThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
      })
      .addCase(signInWithGoogleThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
        state.error = UIMessages.googleSignInFailed;
      })
      .addCase(signInWithGoogleThunk.fulfilled, (state, action) => {
        state.status = LoadingStatus.succeeded;
        state.user = JSON.parse(action.payload);
      }) //EMAIL PASSWORD SIGN IN
      .addCase(userSignInThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
      })
      .addCase(userSignInThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
        state.error = UIMessages.signInFailed;
      })
      .addCase(userSignInThunk.fulfilled, (state, action) => {
        state.status = LoadingStatus.succeeded;
        state.user = JSON.parse(action.payload);
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
    ).then((result) => JSON.stringify(result.user));
  }
);

export const userSignInThunk = createAsyncThunk(
  "userSignIn",
  async (signInData: emailPasswordDataType) => {
    return await signInWithEmailAndPassword(
      globalAuth,
      signInData.email,
      signInData.password
    ).then((result) => JSON.stringify(result.user));
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
    return await signInWithPopup(globalAuth, googleProvider).then((result) =>
      JSON.stringify(result.user)
    );
  }
);

export const userSignOutThunk = createAsyncThunk("userSignOut", async () => {
  return await signOut(globalAuth);
});

export const selectCurrentUser = (state: RootState) => state.authentication;
export default authSlice.reducer;
