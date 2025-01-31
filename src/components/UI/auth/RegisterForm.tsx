import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../services/api/auth/auth';
import { Alert } from '../alert/Alert';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('error');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '', // Changed to password_confirmation
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [register, { isLoading, isError, error }] = useRegisterMutation();


    const nav = useNavigate()


    const showAlert = (type: 'success' | 'error' | 'info') => {
        setAlertType(type);
        setIsAlertOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.password_confirmation) {
            setErrorMessage('Passwords do not match');
            return;
        }
        try {
            const response = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation:formData.password_confirmation
            }).unwrap();
            console.log('Registration successful:', response);
            showAlert('success')
            nav(`/login`)
        } catch (err) {
            console.error('Registration failed:', err);
            showAlert('error')
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrorMessage(''); // Clear error message on input change
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" "
        >

            <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-[#7FADE0]" />
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Username"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2265A2] focus:border-transparent transition-all duration-200 bg-[#EAF0F7] placeholder-gray-500"
                        required
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative"
                >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-[#7FADE0]" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email address"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2265A2] focus:border-transparent transition-all duration-200 bg-[#EAF0F7] placeholder-gray-500"
                        required
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative"
                >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-[#7FADE0]" />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2265A2] focus:border-transparent transition-all duration-200 bg-[#EAF0F7] placeholder-gray-500"
                        required
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative"
                >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-[#7FADE0]" />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password_confirmation" // Changed to password_confirmation
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2265A2] focus:border-transparent transition-all duration-200 bg-[#EAF0F7] placeholder-gray-500"
                        required
                    />
                </motion.div>

                {errorMessage && (
                    <p className="text-red-500 text-center">{errorMessage}</p>
                )}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-[#2265A2] text-white rounded-lg font-semibold hover:bg-[#062654] transition-colors duration-200"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registering...' : 'Sign Up'}
                </motion.button>

                {isError && (
                    <p className="text-red-500 text-center mt-2">
                        {error?.data?.message || 'Something went wrong'}
                    </p>
                )}
            </form>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-center text-gray-600"
            >
                Already have an account?{' '}
                <Link to="/login" className="text-[#2265A2] hover:text-[#062654] font-semibold">
                    Sign in
                </Link>
            </motion.p>

            {/* /// alert box */}

            <Alert
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                title={
                    alertType === 'success'
                        ? 'Register Successful'
                        : alertType === 'error'
                            ? 'Error Register'
                            : 'Special Offer'
                }
                message={
                    alertType === 'success'
                        ? 'Thank you for using app ! enjoy watching.'
                        : alertType === 'error'
                            ? ' Please try again.'
                            : 'Discover our new collection of vintage gold pieces, now available for viewing.'
                }
                variant={alertType}
            />
        </motion.div>
    );
};

export default RegisterForm;
