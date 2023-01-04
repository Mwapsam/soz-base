import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../services/users.service";

const initialState = {
    allUsers: []
  };
  
  const allUsersSlice = createSlice({
    name: "allUsers",
    initialState,
    extraReducers: {
      [fetchUsers.fulfilled]: (state, {payload}) => {
          state.status = "Checkout completed!";
          state.allUsers = payload;
      },
    }
  });
  
  export default allUsersSlice;