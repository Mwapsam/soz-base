import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../reducers/users';
import { productSlice } from '../reducers/product';
import { ordersSlice } from '../reducers/orders';
import cartSlice from '../reducers/cart';
import paymentSlice from '../reducers/payments';
import addressSlice from '../reducers/address';
import transactionSlice from '../reducers/transaction';
import transactionsSlice from '../reducers/allTransactions';
import allUsersSlice from '../reducers/all_users';
import productsSlice from '../reducers/products';
import latestSlice from '../reducers/latest';
import reviewsSlice from '../reducers/reviews';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    payment: paymentSlice.reducer,
    address: addressSlice.reducer,
    order: ordersSlice.reducer,
    transaction: transactionSlice.reducer,
    transactions: transactionsSlice.reducer,
    allUsers: allUsersSlice.reducer,
    products: productsSlice.reducer,
    latest: latestSlice.reducer,
    reviews: reviewsSlice.reducer
  },
});
export default store;