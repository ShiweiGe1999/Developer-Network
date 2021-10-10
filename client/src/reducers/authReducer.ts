import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import { getErrors } from "./errorReducer";
import setAuthToken from "../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import isEmpty from "../validation/isEmpty";
export const register = createAsyncThunk(
  "auth/register",
  async (payload: Array<any>, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post("/api/users/register", payload[0]);
      return res;
    } catch (err) {
      dispatch(getErrors(err));
    }
  }
);

export interface loginProps {
  email: string;
  password: string;
}
// login
export const login = createAsyncThunk(
  "auth/login",
  async (userData: loginProps, { dispatch }) => {
    try {
      const res = await axios.post("/api/users/login", userData);
      const { token } = res.data;
      // save token to local storage
      localStorage.setItem("jwtToken", token);
      // set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwtDecode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    } catch (err) {
      dispatch(getErrors(err));
    }
  }
);

// log user out
export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { dispatch }) => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header
    setAuthToken(false);
    // set current user to empty object
    dispatch(setCurrentUser({}));
  }
);
export interface initialStateProps {
  isAuthenticated: boolean;
  user: {
    [key: string]: any;
  };
  errors: {
    [key: string]: any;
  };
}

const initialState: initialStateProps = {
  isAuthenticated: false,
  user: {},
  errors: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = !isEmpty(action.payload);
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.errors = action.payload.response.data;
    });
  },
});

export const { setCurrentUser } = authSlice.actions;

// SELECT authState
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
