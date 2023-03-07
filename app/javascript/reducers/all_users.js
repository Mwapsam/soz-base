import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../services/users.service";

const initialState = {
    allUsers: [],
    loading: false
  };
  
  const allUsersSlice = createSlice({
    name: "allUsers",
    initialState,
    extraReducers: {
      [fetchUsers.fulfilled]: (state, {payload}) => {
          state.status = "Checkout completed!";
          state.loading = false
          state.allUsers = payload;
      },
      [fetchUsers.pending]: (state) => {
          state.status = "Checkout completed!";
          state.loading = true

      },
      [fetchUsers.rejected]: (state) => {
          state.status = "Checkout completed!";
          state.loading = false
      },
    }
  });
  
  export default allUsersSlice;