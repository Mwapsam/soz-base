import { createSlice } from "@reduxjs/toolkit";
import { addToCartFunc, getCartFunc, incrementFunc, decrementFunc, removeFromCartFunc } from "../services/cart.service";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: "", 
  },
  reducers: {
    // reducers for handling synchronous actions can be added here
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartFunc.fulfilled, (state, { payload }) => {
        state.status = "Product added to cart!";
        state.cartItems.push(payload);
      })
      .addCase(getCartFunc.fulfilled, (state, { payload }) => {
        state.cartItems = payload;
      })
      .addCase(incrementFunc.fulfilled, (state, { payload }) => {
        const { id, total } = payload;
        const itemIndex = state.cartItems.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          const updatedItem = { ...state.cartItems[itemIndex], total };
          state.cartItems[itemIndex] = updatedItem;
        }
      })
      .addCase(decrementFunc.fulfilled, (state, { payload }) => {
        const { id, total } = payload;
        const itemIndex = state.cartItems.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          const updatedItem = { ...state.cartItems[itemIndex], total };
          state.cartItems[itemIndex] = updatedItem;
        }
      })
      .addCase(removeFromCartFunc.fulfilled, (state, { payload }) => {
        state.cartItems = state.cartItems.filter((cart) => cart.id !== +payload);
      });
  },
});

export default cartSlice;
