import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTransactions = createAsyncThunk(
    'transactions/getTransactions', async () => {
        const transactions = await axios.get('/customers', {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await transactions.data;
        return response;
    }
)

export const getAllTransactions = createAsyncThunk(
    'transactions/getAllTransactions', async () => {
        const transactions = await axios.get('/all_transactions', {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await transactions.data;
        return response;
    }
)