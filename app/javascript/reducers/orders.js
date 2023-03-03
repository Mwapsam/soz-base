import { createSlice } from "@reduxjs/toolkit"
import { getOrders, fulfilOder } from "../services/orders.service";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    order: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  extraReducers: {
    [getOrders.fulfilled]: (state, { payload }) => {
        state.order = payload;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
    },
    [getOrders.rejected]: (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.error;
    },
    [getOrders.pending]: (state) => {
        state.isFetching = true;
    },
    [fulfilOder.fulfilled]: (state, { payload }) => {
      state.order = state.order.map((order) =>
      order.id === payload.id ? payload : order
    );
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [fulfilOder.rejected]: (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.error;
    },
    [fulfilOder.pending]: (state) => {
        state.isFetching = true;
    },
  },
})

