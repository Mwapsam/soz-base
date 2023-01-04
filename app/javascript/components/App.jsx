import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Signup, Login, Dashboard, Wrapper, Products, List, Show, Cart, Checkout, Admin, Users, Sales, AdminProducts } from '../pages/index';

const App = () => {
  const ProductsComponent = Admin(Products)
  const SalesComponent = Admin(Sales)
  const UsersComponent = Admin(Users)
  const AdminProductsComponent = Admin(AdminProducts)
  const ListComponent = Wrapper(List)
  const ShowComponent = Wrapper(Show)
  const CartComponent = Wrapper(Cart)
  const CheckoutComponent = Wrapper(Checkout)
  
  return (
    <Routes>
        <Route path='/register' element={<Signup/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/products' element={<ProductsComponent/>} />
        <Route path='/products/:product' element={<ShowComponent/>} />
        <Route path='/list' element={<ListComponent/>} />
        <Route path='/cart' element={<CartComponent />} />
        <Route path='/checkout' element={<CheckoutComponent />} />
        <Route path='/sales' element={<SalesComponent />} />
        <Route path='/users' element={<UsersComponent />} />
        <Route path='/admin-products' element={<AdminProductsComponent />} />
    </Routes>
  );
};

export default App;