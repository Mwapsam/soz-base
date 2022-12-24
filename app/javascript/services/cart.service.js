import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addToCartFunc = createAsyncThunk(
    'cart/addToCart', async (cart) => {
        const cartItem = await axios.post(`/products/add_to_cart/${cart.id}`, cart, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await cartItem.data;
        return response;
    }
)

export const getCartFunc = createAsyncThunk(
    'cart/getCart', async () => {
        const cart = await axios.get('/products/get_cart', {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await cart.data;
        return response;
    }
)

export const removeFromCartFunc = createAsyncThunk(
    'cart/deleteFromCart', async (cart) => {
        const cartItem = await axios.delete(`/products/remove_from_cart/${cart.id}`, cart, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await cartItem.data;
        return response;
    }
)
