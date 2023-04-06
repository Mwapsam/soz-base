import { createSlice } from "@reduxjs/toolkit";
import { getAllTransactions } from "../services/transaction.service";

const initialState = {
    transactions: [],
    loading: false
  };
  
  const transactionsSlice = createSlice({
    name: "transaction",
    initialState,
    extraReducers: {
      [getAllTransactions.fulfilled]: (state, {payload}) => {
          state.transactions = payload;
          state.loading = 'succeeded'
      },
      [getAllTransactions.failed]: (state) => {
        state.loading = 'failed';
      },
      [getAllTransactions.pending]: (state) => {
        state.loading = 'pending';
    },
    }
  });
  
  export default transactionsSlice;