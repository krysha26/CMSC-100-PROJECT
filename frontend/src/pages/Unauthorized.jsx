import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Unauthorized = () => {
    const { auth, logout } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Access Denied
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        You don't have permission to access this page.
                    </p>
                </div>
                <div className="mt-8 space-y-4">
                    {auth.role ? (
                        <>
                            <p className="text-center text-sm text-gray-600">
                                Current role: <span className="font-semibold">{auth.role}</span>
                            </p>
                            <button
                                onClick={logout}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/signIn"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Sign In
                        </Link>
                    )}
                    <Link
                        to="/"
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized; 