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
        window.location.href = response
    }
)

export default Payments;