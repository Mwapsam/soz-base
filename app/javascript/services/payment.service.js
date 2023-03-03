import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const Payments = createAsyncThunk(
    'payment/createCheckout', async (payment) => {
        const checkout = await axios.post('/create-checkout-session', payment, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await checkout.data;
        return response;
    }
)

export const getSuccessInfo = createAsyncThunk(
    'payment/success', async (session_id) => {
        const checkout = await axios.get(`/success/${session_id}`, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await checkout.data;
        return response;
    }
)

export default Payments;