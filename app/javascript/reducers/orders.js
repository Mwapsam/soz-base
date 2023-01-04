import { createSlice } from "@reduxjs/toolkit"
import { getOrders } from "../services/orders.service";

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
  },
})

