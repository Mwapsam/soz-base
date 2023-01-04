import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk('product/getProducts', async () => {
    try{
        const products = await axios.get('/products');
        const res = await products.data;
        if (products.status === 200) {
            return res;
          } else {
            return res.error;
          }
    } catch(e) {
        return res.error;
    }
});

export const postProduct = createAsyncThunk('product/postProduct', 
    async (prod) => {
        const product = await axios.post('/products', prod);
        const res = await product.data;
        if (product.status === 200) {
            return res;
          } else {
            return res.error;
          }
    }
);

export const incrementFunc = createAsyncThunk('product/increment', 
    async (id) => {
        const product = await axios.post(`/increment-quantity/${id}`);
        const res = await product.data;
        return res;
    }
);

export const decrementFunc = createAsyncThunk('product/decrement', 
    async (id) => {
        const product = await axios.post(`/decrement-quantity/${id}`);
        const res = await product.data;
        return res;
    }
);
