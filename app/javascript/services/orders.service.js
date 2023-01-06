import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrders = createAsyncThunk(
    'cart/getOrders', async () => {
        const order = await axios.get('/transactions', {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await order.data;
        return response;
    }
)