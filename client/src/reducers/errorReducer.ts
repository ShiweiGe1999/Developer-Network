import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface errorStateProps {
  [key: string]: any;
}
const errorState: errorStateProps = {};
const errorSlice = createSlice({
  name: "error",
  initialState: errorState,
  reducers: {
    getErrors: (state, action: PayloadAction<any>) => {
      return action.payload.response.data;
    },
    clearErrors: (state) => {
      return {}
    },
  },
});

export const { getErrors, clearErrors } = errorSlice.actions;

// SELECT Errors
export const selectErrors = (state: RootState) => state.error;
export default errorSlice.reducer;
