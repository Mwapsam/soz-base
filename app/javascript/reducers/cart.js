import { createSlice } from "@reduxjs/toolkit";
import { addToCartFunc, getCartFunc, incrementFunc, decrementFunc, removeFromCartFunc } from "../services/cart.service";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: null, // add a status field to the initial state
  },
  reducers: {
    // reducers for handling synchronous actions can be added here
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartFunc.fulfilled, (state, { payload }) => {
        state.status = "Checkout completed!";
        state.cartItems.push(payload[0]);
      })
      .addCase(getCartFunc.fulfilled, (state, { payload }) => {
        state.status = "Cart loaded!";
        state.cartItems = payload;
      })
      .addCase(incrementFunc.fulfilled, (state, { payload }) => {
        state.cartItems = state.cartItems
          .filter((cart) => cart.id !== +payload.id)
          .concat(payload);
      })
      .addCase(decrementFunc.fulfilled, (state, { payload }) => {
        state.cartItems = state.cartItems
          .filter((cart) => cart.id !== +payload.id)
          .concat(payload);
      })
      .addCase(removeFromCartFunc.fulfilled, (state, { payload }) => {
        state.cartItems = state.cartItems.filter((cart) => cart.id !== +payload);
      });
  },
});

export default cartSlice;
