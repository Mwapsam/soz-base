import { createSlice } from "@reduxjs/toolkit";
import {
  postProduct,
  getProducts,
  incrementFunc,
  decrementFunc,
  makePublic,
  editProduct,
  deleteProduct,
} from "../services/product.service";

const initialState = {
  products: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postProduct.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.products = payload;
      })
      .addCase(postProduct.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(postProduct.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        // state.errorMessage = payload.error;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
        state.isFetching = false;
        state.isSuccess = true;
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        // state.errorMessage = payload.error;
      })
      .addCase(getProducts.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(incrementFunc.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.products = payload;
      })
      .addCase(decrementFunc.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.products = payload;
      })
      .addCase(makePublic.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.products = [...state.products, payload];
      })
      .addCase(editProduct.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.products = state.products.map((product) =>
          product.id === payload.id ? payload : product
        );
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product) => product.id !== payload
        );
      });
  },
});

export const { clearState } = productSlice.actions;
export const selectProducts = (state) => state.product.products;
