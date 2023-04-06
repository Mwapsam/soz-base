import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addToCartFunc = createAsyncThunk(
    'cart/addToCart', async (cart) => {
        try{
            const cartItem = await axios.post(`/products/add_to_cart/${cart.id}`, cart, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            const response = await cartItem.data;
            return response;
        }catch(error){
            throw new Error(error.response.error.message)
        }
    }
)

export const getCartFunc = createAsyncThunk(
    'cart/getCart', async () => {
        try{
            const cart = await axios.get('/products/get_cart', {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            const response = await cart.data;
            return response;
        }catch(error) {
            throw new Error(error.response.error.message)
        }
    }
)

export const removeFromCartFunc = createAsyncThunk(
    'cart/deleteFromCart', async (cart) => {
        try{
            const cartItem = await axios.post(`/products/remove_from_cart/${cart}`, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            return cart;
        }catch(error){
            throw new Error(error.response.error.message)
        }
    }
)

export const incrementFunc = createAsyncThunk('product/increment', 
    async (id) => {
        try{
            const product = await axios.post(`/increment-quantity/${id}`);
            const res = await product.data;
            return res;
        }catch(error) {
            throw new Error(error.response.error.message)
        }
    }
);

export const decrementFunc = createAsyncThunk('product/decrement', 
    async (id) => {
        try{
            const product = await axios.post(`/decrement-quantity/${id}`);
            const res = await product.data;
            return res;
        }catch(error) {
            throw new Error(error.response.error.message)
        }
    }
);