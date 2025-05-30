import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { auth } = useAuth();
    const location = useLocation();

    // If not authenticated, redirect to login
    if (!auth.accessToken) {
        return <Navigate to="/signIn" state={{ from: location }} replace />;
    }

    // If role-based access is required and user's role is not allowed
    if (allowedRoles.length > 0 && !allowedRoles.includes(auth.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute; 