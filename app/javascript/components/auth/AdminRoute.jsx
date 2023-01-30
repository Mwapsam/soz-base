import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {

    return currentUser && loginIn ? children : <Navigate to="/login" />;
};

export default AdminRoute;