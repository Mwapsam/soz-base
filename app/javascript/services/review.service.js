import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addReview = createAsyncThunk(
    'cart/addReview', async (review) => {
        try{
            const reviews = await axios.post(`/reviews`, review, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            const response = await reviews.data;
            return response;
        }catch(error){
            throw new Error(error.response.error.message)
        }
    }
)

export const fetchReviews = createAsyncThunk(
    'cart/fetchReview', async () => {
        try{
            const reviews = await axios.get(`/reviews`, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            const response = await reviews.data;
            return response;
        }catch(error){
            throw new Error(error.response.error.message)
        }
    }
)

