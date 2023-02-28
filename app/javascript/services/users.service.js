import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/getUsers', async () => {
    try{
        const getUsers = await axios.get('/users');
        const res = await getUsers.data;
        if (getUsers.status === 200) {
            return res;
          } else {
            console.log(res);
            return res.error;
          }
    } catch(e) {
      console.log(e);
        throw new Error(e)
    }
});