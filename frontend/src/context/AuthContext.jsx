import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const accessToken = sessionStorage.getItem('accessToken');
        const userRole = sessionStorage.getItem('userRole');
        const userEmail = sessionStorage.getItem('userEmail');

        if (accessToken && userRole && userEmail) {
            setAuth({ accessToken, role: userRole, email: userEmail });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            console.log('Attempting login with:', { email });
            const response = await axios.post('https://anico-api.vercel.app/api/users/signIn', {
                email,
                password,
            });

            console.log('Login response:', response.data);
            const { token, user } = response.data;
            
            // We need to get the user's role from the backend
            // This should be included in the signIn response
            // For now, we'll redirect to unauthorized if role is missing
            if (!user.role) {
                throw new Error('User role not found. Please contact support.');
            }
            
            // Store auth data in session storage
            sessionStorage.setItem('accessToken', token);
            sessionStorage.setItem('userRole', user.role);
            sessionStorage.setItem('userEmail', user.email);

            // Update auth context
            setAuth({ accessToken: token, role: user.role, email: user.email });
            
            return { success: true, role: user.role };
        } catch (error) {
            // Log the complete error details
            console.error('Login error details:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                responseData: JSON.stringify(error.response?.data, null, 2),
                requestConfig: {
                    url: error.config?.url,
                    method: error.config?.method,
                    headers: error.config?.headers,
                    requestData: JSON.parse(error.config?.data || '{}')
                }
            });

            // Also log the raw error for debugging
            console.error('Raw error object:', error);
            throw error;
        }
    };

    const logout = () => {
        // Clear session storage
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('userEmail');
        
        // Clear auth context
        setAuth({});
    };

    const value = {
        auth,
        setAuth,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext; 