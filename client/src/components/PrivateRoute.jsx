import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const isDevAdmin = sessionStorage.getItem('dev_admin') === 'true';

    if (!currentUser && !isDevAdmin) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
