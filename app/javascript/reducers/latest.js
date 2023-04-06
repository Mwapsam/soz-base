import { createSlice } from "@reduxjs/toolkit";
import { getLatest } from "../services/product.service";

const latestSlice = createSlice({
    name: "products",
    initialState: {
      latest: [],
      isFetchingLatest: false,
      isSuccess: false,
      isError: false,
      errorMessage: "",
    },
    extraReducers: {
      [getLatest.fulfilled]: (state, { payload }) => {
          state.latest = payload;
          state.isFetchingLatest = false;
          state.isSuccess = true;
          return state;
      },
      [getLatest.rejected]: (state, { payload }) => {
          state.isFetchingLatest = false;
          state.isError = true;
          // state.errorMessage = payload.error;
      },
      [getLatest.pending]: (state) => {
          state.isFetchingLatest = true;
      },
    },
  })

  export default latestSlice;
  