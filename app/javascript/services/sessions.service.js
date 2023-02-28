import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signupUser = createAsyncThunk('user/signup', async (user) => {
    try{
        const userSignup = await axios.post('/users', user);
        const res = await userSignup.data;
        return res;
    }catch(error){
        throw new Error(error.response.data.error)
    }
});

export const loginUser = createAsyncThunk('user/login', async (user) => {
    try{
        const userLogin = await axios.post('/sessions', user);
        const res = await userLogin.data;
        return res;
    }catch(error){
        throw new Error(error.response.data.error)
    }
});

export const logoutUser = createAsyncThunk('user/logout', async (id) => {
    try{
        const userLogout = await axios.delete(`/sessions/${id}`);
        const res = await userLogout.data;
        return res;
    } catch(error) {
        throw new Error(error)
    }
});

export const fetchUser = createAsyncThunk('user/getUser', async () => {
    try{
        const getUser = await axios.get('/getuser');
        const res = await getUser.data;
        if (getUser.status === 200) {
            return res;
          } else {
            return res.error;
          }
    } catch(e) {
        return e.error;
    }
});
 