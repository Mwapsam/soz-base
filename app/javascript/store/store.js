import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../reducers/users';
import { productSlice } from '../reducers/product';
import cartSlice from '../reducers/cart';
import paymentSlice from '../reducers/payments';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    payment: paymentSlice.reducer,
  },
});
export default store;