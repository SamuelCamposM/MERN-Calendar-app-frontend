import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // 'authenticated' "not-authenticated",
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onSlicechecking: (state /* action */) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onSliceLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onSliceLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSlicechecking,
  onSliceLogin,
  onSliceLogout,
  clearErrorMessage,
} = authSlice.actions;
