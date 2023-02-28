import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PrivateRoute from '../components/auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import { Signup, Login, Dashboard, Wrapper, Products, List, Show, Cart, Checkout, Admin, Users, Sales, AdminProducts, Orders, Contacts } from '../pages/index';

const App = () => {
  const ProductsComponent = Admin(Products)
  const SalesComponent = Admin(Sales)
  const UsersComponent = Admin(Users)
  const AdminProductsComponent = Admin(AdminProducts)
  const OrdersComponent = Admin(Orders)
  const ListComponent = Wrapper(List)
  const ShowComponent = Wrapper(Show)
  const CartComponent = Wrapper(Cart)
  const CheckoutComponent = Wrapper(Checkout)
  const ContactsComponent = Wrapper(Contacts)
  const DashboardComponent = Admin(Dashboard)

  const stripePromise = loadStripe('pk_test_51LP099CM7tFJZpiAxrpf09Plnqbhhbcx2vIzGxj4nmDaV5BxMVmS0TEdrSNMEDXK27gzgV6n4B77bjPdhvfGF98Q005LvNF8et');
  
  return (
    <Routes>
        <Route path='/register' element={<Signup/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<AdminRoute><DashboardComponent /></AdminRoute>} />
        <Route path='/products' element={<ProductsComponent/>} />
        <Route path='/products/:product' element={<ShowComponent/>} />
        <Route path='/' element={<ListComponent/>} />
        <Route path='/cart' element={<CartComponent />} />
        <Route path='/contact' 
        element={
        <ContactsComponent />} />
        <Route path='/checkout' element={
        <PrivateRoute>
          <Elements stripe={stripePromise}>
            <CheckoutComponent />
          </Elements>
        </PrivateRoute>
        } />
        <Route path='/sales' element={<AdminRoute><SalesComponent /></AdminRoute>} />
        <Route path='/users' element={<AdminRoute><UsersComponent /></AdminRoute>} />
        <Route path='/admin-products' element={<AdminRoute><AdminProductsComponent /></AdminRoute>} />
        <Route path='/orders' element={<AdminRoute><OrdersComponent /></AdminRoute>} />
    </Routes>
  );
};

export default App;