import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../reducers/users';
import { productSlice } from '../reducers/product';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer
  },
});
export default store;