import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signup, Login, Dashboard, Wrapper, Products, List, Show } from '../pages/index';

const App = () => {
  const DashboardComponent = Wrapper(Dashboard)
  const ProductsComponent = Wrapper(Products)
  const ListComponent = Wrapper(List)
  const ShowComponent = Wrapper(Show)
  return (
    <Routes>
        <Route path='/register' element={<Signup/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<DashboardComponent />} />
        <Route path='/products' element={<ProductsComponent/>} />
        <Route path='/products/:product' element={<ShowComponent/>} />
        <Route path='/list' element={<ListComponent/>} />
    </Routes>
  );
};

export default App;