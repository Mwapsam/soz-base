import { createSlice } from "@reduxjs/toolkit";
import { addToCartFunc, getCartFunc, incrementFunc, decrementFunc, removeFromCartFunc } from "../services/cart.service";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  extraReducers: {
    [addToCartFunc.fulfilled]: (state, {payload}) => {
        state.status = "Checkout completed!";
        state.cartItems = [...state.cartItems, payload[0]];
    }, 
    [getCartFunc.fulfilled]: (state, {payload}) => {
      state.status = "Checkout completed!";
      state.cartItems = payload;
    },
    [incrementFunc.fulfilled]: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((cart) => cart.id !== +payload.id );
      state.cartItems = [...state.cartItems, payload]
    },
    [decrementFunc.fulfilled]: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((cart) => cart.id !== +payload.id );
      state.cartItems = [...state.cartItems, payload]
    },
    [removeFromCartFunc.fulfilled]: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((cart) => cart.id !== +payload )

    },
  }
});

export default cartSlice;