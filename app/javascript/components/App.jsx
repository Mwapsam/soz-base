import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signup, Login, Dashboard, Wrapper, Products } from '../pages/index';

const App = () => {
  const DashboardComponent = Wrapper(Dashboard)
  return (

    <Routes>
        <Route path='/register' element={<Signup/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<DashboardComponent />} />
        <Route path='/products' element={<Products/>} />
    </Routes>

  );
};

export default App;