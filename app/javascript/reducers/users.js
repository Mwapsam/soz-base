import { createSlice } from "@reduxjs/toolkit"
import { signupUser, loginUser, logoutUser, fetchUser } from "../services/sessions.service";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = false;
  
        return state;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.user = payload
    },
    [signupUser.pending]: (state) => {
        state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        // state.errorMessage = payload.message;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
        state.user = payload;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        // state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
        state.isFetching = true;
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
        state.user = payload;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
    },
    [fetchUser.rejected]: (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        // state.errorMessage = payload;
    },
    [fetchUser.pending]: (state) => {
        state.isFetching = true;
    },
  },
})

export const { clearState } = userSlice.actions;
export const userSelector = state => state.user