import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signup, Login, Dashboard, Wrapper, Products, List, Show, Cart } from '../pages/index';
import { Success } from '../components';

const App = () => {
  const DashboardComponent = Wrapper(Dashboard)
  const ProductsComponent = Wrapper(Products)
  const ListComponent = Wrapper(List)
  const ShowComponent = Wrapper(Show)
  const CartComponent = Wrapper(Cart)
  const SuccessComponent = Wrapper(Success)
  return (
    <Routes>
        <Route path='/register' element={<Signup/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<DashboardComponent />} />
        <Route path='/products' element={<ProductsComponent/>} />
        <Route path='/products/:product' element={<ShowComponent/>} />
        <Route path='/list' element={<ListComponent/>} />
        <Route path='/cart' element={<CartComponent />} />
        <Route path='/success?session_id/:session_id' element={<SuccessComponent />} />
    </Routes>
  );
};

export default App;