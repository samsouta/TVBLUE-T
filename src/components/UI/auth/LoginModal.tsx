import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Film, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../redux/api/auth';
import { Alert } from '../alert/Alert';
import Cookies from 'js-cookie'; 


const LoginModal: React.FC = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('error');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, error }] = useLoginMutation();

    const nav = useNavigate()

    const showAlert = (type: 'success' | 'error' | 'info') => {
        setAlertType(type);
        setIsAlertOpen(true);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Call the login mutation
            const response = await login({ email, password }).unwrap();

            // Check the response status
            if (response.status === 'success') {
                showAlert('success')
                Cookies.set('token', response.token);
                Cookies.set('user', JSON.stringify(response.user));
                nav(`/`)
            } else {
                showAlert('error')
            }   
        } catch (err) {
            showAlert('error')
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="  p-8  w-full"
        >

            <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative"
                >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-[#7FADE0]" />
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2265A2] focus:border-transparent bg-[#EAF0F7] transition-all"
                        placeholder="Email address"
                        required
                    />
                </motion.div>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-[#7FADE0]" />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2265A2] focus:border-transparent bg-[#EAF0F7] transition-all"
                        placeholder="Password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5 text-[#7FADE0]" />
                        ) : (
                            <Eye className="h-5 w-5 text-[#7FADE0]" />
                        )}
                    </button>
                </motion.div>

                {/* <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-[#2265A2] focus:ring-[#2265A2]" />
                        <span className="ml-2 text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-[#2265A2] hover:text-[#062654] transition-colors">
                        Forgot password?
                    </a>
                </div> */}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-[#2265A2] text-white rounded-lg font-semibold hover:bg-[#062654] transition-colors"
                    disabled={isLoading} // Disable the button while loading
                >
                    {isLoading ? 'Logging in...' : 'Sign In'}
                </motion.button>

                <p className="text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to={`/register`}
                        className="text-[#2265A2] hover:text-[#062654] transition-colors font-semibold"
                    >
                        Sign up
                    </Link>
                </p>

                {/* Display any error message */}
                {error && (
                    <p className="text-center text-red-600 mt-4">
                        {error.message || 'An error occurred during login.'}
                    </p>
                )}
            </form>


            <Alert
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                title={
                    alertType === 'success'
                        ? 'Login Successful'
                        : alertType === 'error'
                            ? 'Error Login'
                            : 'Special Offer'
                }
                message={
                    alertType === 'success'
                        ? 'Thank you for your Login ! enjoy watching.'
                        : alertType === 'error'
                            ? 'Make sure your password & email :.). Please try again.'
                            : 'Discover our new collection of vintage gold pieces, now available for viewing.'
                }
                variant={alertType}
            />
        </motion.div>
    );
};

export default React.memo(LoginModal);
