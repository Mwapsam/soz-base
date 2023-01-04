import { createSlice } from "@reduxjs/toolkit";
import { getAllTransactions } from "../services/transaction.service";

const initialState = {
    transactions: []
  };
  
  const transactionsSlice = createSlice({
    name: "transaction",
    initialState,
    extraReducers: {
      [getAllTransactions.fulfilled]: (state, {payload}) => {
          state.status = "Checkout completed!";
          state.transactions = payload;
      },
    }
  });
  
  export default transactionsSlice;