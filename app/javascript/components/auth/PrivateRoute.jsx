import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  return loginIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;