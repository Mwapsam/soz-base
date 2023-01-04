import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrders = createAsyncThunk(
    'cart/getOrders', async () => {
        const order = await axios.get('/get_orders', {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await order.data;
        return response;
    }
)