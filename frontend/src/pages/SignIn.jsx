import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Farm from '../assets/img/farm3.jpg'
import AnicoLogo from '../assets/img/ANICO_icon-admin.png'

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/signIn', {
                email: email,
                password: password,
            });
            toast.success("Sign in successful!", {
                autoClose: 1000,
                onClose: () => navigate('/shop') // Navigate to shop
            });
        } catch (error) {
            toast.error("Sign in failed. Please try again");
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center font-poppins"
            style={{
                backgroundImage: `linear-gradient(to right, #094517cc, #2D5732cc,rgba(68, 101, 61, 0.8),rgba(133, 156, 129, 0.8),rgba(168, 182, 166, 0.8)), url(${Farm})`,
                backgroundSize: 'cover, cover',
                backgroundPosition: 'center, center',
                backgroundRepeat: 'no-repeat, no-repeat'
            }}
        >
            <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
                {/* Left Section: Logo */}
                <div className="w-full md:w-2/5 flex items-center justify-center p-4 md:p-8 order-1 md:order-1 overflow-hidden">
                    <img 
                        src={AnicoLogo} 
                        alt="anico logo" 
                        className="w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] select-none drop-shadow-lg object-contain max-w-full h-auto md:ml-28 lg:ml-32"
                        style={{ width: '50%', height: 'auto' }}
                    />
                </div>

                {/* Right Section: Form */}
                <div className="w-full md:w-3/5 flex items-center justify-center p-4 sm:p-8 order-2 md:order-2">
                    <div className="bg-white/95 backdrop-blur-sm p-10 sm:p-12 md:p-14 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
                        <div className="space-y-1 mb-10">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 text-center tracking-tight" style={{ fontFamily: 'PoppinsB, Poppins, sans-serif' }}>
                                SIGN IN
                            </h2>
                            <p className="text-gray-500 text-center text-lg font-medium">
                                Welcome to ANICO!
                            </p>
                        </div>
                        <form onSubmit={handleSignIn} className="space-y-7">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-5 py-3.5 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#094517]/20 focus:border-[#094517] sm:text-sm bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400 transition duration-150"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="mt-1 block w-full px-5 py-3.5 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#094517]/20 focus:border-[#094517] sm:text-sm bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400 transition duration-150"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-150"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-[#094517] hover:bg-[#2D5732] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#094517] transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Sign In
                            </button>
                        </form>
                        <p className="mt-8 text-sm text-center text-gray-500">
                            New to anico?{' '}
                            <Link to="/signUp" className="font-semibold text-[#094517] hover:text-[#2D5732] hover:underline transition-colors duration-150">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
}

export default SignIn;