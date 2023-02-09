import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus, AuthUIMessages } from "../Utils/types";

import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  setPersistence,
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

const storedUserId: string | null = localStorage.key(0);
let storedUser = null;
if (storedUserId !== null && storedUserId !== "color-theme") {
  storedUser = localStorage.getItem(storedUserId);
}
const authInitialState: authInitialStateType = {
  status: LoadingStatus.idle,
  user: storedUser === null ? null : (JSON.parse(storedUser as string) as User),
  error: null,
};

export const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,24}$/;
const googleProvider = new GoogleAuthProvider();

const persistenceAuth = getAuth();
setPersistence(persistenceAuth, browserLocalPersistence)
  .then(() => console.log("persistence is used"))
  .catch((err) => console.log("some error: ", err));

const authSlice = createSlice({
  name: "authenticationSlice",
  initialState: authInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = JSON.parse(action.payload);
    },
  },
  extraReducers(builder) {
    builder //SIGN UP EMAIL PASSWORD
      .addCase(userSignUpThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
        state.error = "";
      })
      .addCase(userSignUpThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
        state.error = AuthUIMessages.signUpFailed;
      })
      .addCase(userSignUpThunk.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.succeeded;
        state.user = JSON.parse(payload);
        state.error = "";
      }) //GOOGLE AUTH
      .addCase(signInWithGoogleThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
        state.error = "";
      })
      .addCase(signInWithGoogleThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
        state.error = AuthUIMessages.googleSignInFailed;
      })
      .addCase(signInWithGoogleThunk.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.succeeded;
        state.user = JSON.parse(payload);
        state.error = "";
      }) //EMAIL PASSWORD AUTH
      .addCase(userSignInThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
        state.error = "";
      })
      .addCase(userSignInThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
        state.error = AuthUIMessages.signInFailed;
      })
      .addCase(userSignInThunk.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.succeeded;
        state.user = JSON.parse(payload);
        state.error = "";
      })
      .addCase(userSignOutThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
        state.error = "";
      })
      .addCase(userSignOutThunk.fulfilled, (state) => {
        state.user = null;
        state.status = LoadingStatus.succeeded;
      })
      .addCase(resetPasswordThunk.pending, (state) => {
        state.status = LoadingStatus.pending;
      })
      .addCase(resetPasswordThunk.rejected, (state) => {
        state.status = LoadingStatus.failed;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.status = LoadingStatus.succeeded;
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

export const { setUser } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.authentication;
export default authSlice.reducer;
