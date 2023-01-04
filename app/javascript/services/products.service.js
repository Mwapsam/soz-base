import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAdminProducts = createAsyncThunk('products/getAdminProducts', async () => {
    try{
        const products = await axios.get('/products/admin_products');
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