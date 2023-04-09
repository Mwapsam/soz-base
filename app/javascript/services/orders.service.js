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

export const fulfilOder = createAsyncThunk(
    'cart/fulfilOder', async (id) => {
        try{
            const order = await axios.post(`/order-fulfilment/${id}`, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            const response = await order.data;
            return response;
        }catch(error){
            // console.log(error);
            // throw new Error(error)
        }
    }
)