import { createSlice } from "@reduxjs/toolkit"
import { postProduct, getProducts, incrementFunc, decrementFunc, makePublic, editProduct, deleteProduct } from "../services/product.service";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
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
    [postProduct.fulfilled]: (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.product = payload
    },
    [postProduct.pending]: (state) => {
        state.isFetching = true;
    },
    [postProduct.rejected]: (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        // state.errorMessage = payload.error;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
        state.product = payload;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
    },
    [getProducts.rejected]: (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        // state.errorMessage = payload.error;
    },
    [getProducts.pending]: (state) => {
        state.isFetching = true;
    },
    [incrementFunc.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.product = payload
    },
    [decrementFunc.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.product = payload
    },
    [makePublic.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.product = [...state.product, payload]
    },
    [editProduct.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.product = [...state.product, payload]
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.product = state.product.filter((product) => product.id !== payload)
    },  
  },
})

export const { clearState } = productSlice.actions;
export const productSelector = state => state.product