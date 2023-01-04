import { createSlice } from "@reduxjs/toolkit";
import { getTransactions, getAllTransactions } from "../services/transaction.service";

const initialState = {
    transaction: []
  };
  
  const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    extraReducers: {
      [getTransactions.fulfilled]: (state, {payload}) => {
          state.status = "Checkout completed!";
          state.transaction = payload;
      },
    }
  });
  
  export default transactionSlice;