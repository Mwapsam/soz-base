import React from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../../pages/hooks/useUser';

const PrivateRoute = ({ children }) => {
    const { user } = useUser();
  return user ? children : <Navigate to="/list" />;
};

export default PrivateRoute;