import { createSlice } from "@reduxjs/toolkit";
import { getAdminProducts } from "../services/products.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
      products: [],
      isFetching: false,
      isSuccess: false,
      isError: false,
      errorMessage: "",
    },
    extraReducers: {
      [getAdminProducts.fulfilled]: (state, { payload }) => {
          state.products = payload;
          state.isFetching = false;
          state.isSuccess = true;
          return state;
      },
      [getAdminProducts.rejected]: (state, { payload }) => {
          state.isFetching = false;
          state.isError = true;
          // state.errorMessage = payload.error;
      },
      [getAdminProducts.pending]: (state) => {
          state.isFetching = true;
      },
    },
  })

  export default productsSlice
  