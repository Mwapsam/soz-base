import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postAddress = createAsyncThunk('address/postAddress', async (address) => {
    const response = await axios.post('/create-address', address);
    const res = await response.data;
    return res;
});

export const updateAddress = createAsyncThunk('address/updateAddress', async ({id, data}) => {
    const response = await axios.put(`/addresses/${id}`, data);
    const res = await response.data;
    return res;
});