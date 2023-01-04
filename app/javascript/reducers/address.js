import { createSlice } from "@reduxjs/toolkit";
import { postAddress, updateAddress } from "../services/address.service";

const initialState = {
  address: []
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  extraReducers: {
    [postAddress.fulfilled]: (state, {payload}) => {
        state.status = "Address completed!";
        state.address = [...state.address, payload];
    },
    [updateAddress.fulfilled]: (state, {payload}) => {
      state.status = "Address completed!";
      state.address = [...state.address, payload];
  }, 
  }
});

export default addressSlice;