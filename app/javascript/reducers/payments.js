import { createSlice } from '@reduxjs/toolkit';
import Payments from '../services/payment.service';

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        payments: [],
        status: null
    },
    extraReducers: {
        [Payments.fulfilled]: (state, action) => {
            state.status = "Checkout completed!";
            state.payments = [...state.payments, action.payments];
        }
    }
});

export default paymentSlice;