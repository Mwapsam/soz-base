import { createSlice } from '@reduxjs/toolkit';
import Payments, { getSuccessInfo } from '../services/payment.service';

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        payments: [],
        info: [],
        status: null
    },
    extraReducers: {
        [Payments.fulfilled]: (state, action) => {
            state.status = "Checkout completed!";
            state.payments = [...state.payments, action.payments];
        },
        [getSuccessInfo.fulfilled]: (state, action) => {
            state.status = "success!";
            state.info = action.payload;
        }
    }
});

export default paymentSlice;