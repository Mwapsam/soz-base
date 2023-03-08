import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import { Signup, Login, Dashboard, Wrapper, Products, List, Show, Cart, Checkout, Admin, Users, Sales, AdminProducts, Orders, Contacts, Success, CheckoutQuest, PrivacyPolicy, DeliveryPolicy, TermsConditions } from '../pages/index';

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
  const SuccessComponent = Wrapper(Success)
  const PrivacyPolicyComponent = Wrapper(PrivacyPolicy)
  const DeriveryComponent = Wrapper(DeliveryPolicy)
  const TermsConditionsComponent = Wrapper(TermsConditions)
  const CheckoutQuestComponent = Wrapper(CheckoutQuest)
  const DashboardComponent = Admin(Dashboard)
  
  return (
    <Routes>
        <Route path='/register' element={<Signup/>} />
        <Route path='/privacy-policy' element={<PrivacyPolicyComponent />} />
        <Route path='/delivery-policy' element={<DeriveryComponent />} />
        <Route path='/terms-and-conditions' element={<TermsConditionsComponent />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<AdminRoute><DashboardComponent /></AdminRoute>} />
        <Route path='/products' element={<ProductsComponent/>} />
        <Route path='/products/:product' element={<ShowComponent/>} />
        <Route path='/success/:session_id' element={<SuccessComponent/>} />
        <Route path='/' element={<ListComponent/>} />
        <Route path='/cart' element={<CartComponent />} />
        <Route path='/contact' 
        element={
        <ContactsComponent />} />
        <Route path='/checkout' element={
        <PrivateRoute>
            <CheckoutComponent />
        </PrivateRoute>
        } />
        <Route path='/checkout-quest' element={
            <CheckoutQuestComponent />
        } />
        <Route path='/sales' element={<AdminRoute><SalesComponent /></AdminRoute>} />
        <Route path='/users' element={<AdminRoute><UsersComponent /></AdminRoute>} />
        <Route path='/admin-products' element={<AdminRoute><AdminProductsComponent /></AdminRoute>} />
        <Route path='/orders' element={<AdminRoute><OrdersComponent /></AdminRoute>} />
    </Routes>
  );
};

export default App;