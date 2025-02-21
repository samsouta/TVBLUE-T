import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useLogOutMutation } from '../../../../services/api/auth/auth';
import { Alert } from '../../../UI/alert/Alert';
import Cookies from 'js-cookie';
import { User2 } from 'lucide-react';

interface UserData {
    name: string;
    email: string;
    avatar?: string;
}

const DEFAULT_AVATAR = 'https://i.pinimg.com/736x/76/da/dc/76dadcae2845339368c408ae67b6585d.jpg';

const UserProfile: React.FC = () => {
    const navigate = useNavigate();
    const [logOut] = useLogOutMutation();

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [alertType, setAlertType] = useState<'success' | 'error'>('error');

    // Fix user data parsing with better error handling
    const getUserData = (): UserData | null => {
        try {
            const userCookie = Cookies.get('user');
            if (!userCookie) return null;

            const parsedUser = JSON.parse(userCookie);
            if (!parsedUser?.name || !parsedUser?.email) return null;

            return {
                name: parsedUser.name,
                email: parsedUser.email,
                avatar: parsedUser.avatar || DEFAULT_AVATAR
            };
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    };

    const token = Cookies.get('token');
    const user = getUserData();

    // Update user data when logging in or profile changes
    useEffect(() => {
        const currentUser = getUserData();
        if (token && !currentUser) {
            // If token exists but no user data, redirect to login
            navigate('/login');
        }
    }, [token]);

    const handleLogOut = async () => {
        if (!token) return;

        setIsLoggingOut(true);
        try {
            const response = await logOut(token).unwrap();
            if (response) {
                setAlertType('success');
                setIsAlertOpen(true);
                Cookies.remove('token');
                Cookies.remove('user');

                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        } catch (error) {
            setAlertType('error', error);
            setIsAlertOpen(true);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    // Add new state for menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const renderMobileView = () => (
        <div className="lg:hidden relative">
            <div
                onClick={() => token ? setIsMenuOpen(!isMenuOpen) : navigate('/login')}
                className="flex flex-col items-center cursor-pointer"
            >
                {user ? (
                    <img
                        src={user.avatar || DEFAULT_AVATAR}
                        alt={user.name}
                        className="w-9 h-9 rounded-full  border-2 border-green-500"
                    />
                ) : (
                    <div className="bg-gray-200/20 p-2 rounded-full">
                        <User2 className="text-xl text-white" />
                    </div>
                )}
            </div>
        </div>
    );

    const renderDesktopView = () => (
        <div className="hidden lg:block min-w-[100px]">
            {user ? (
                <div className="space-y-4">
                    <div 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-3 cursor-pointer">
                        <img
                            src={user.avatar || DEFAULT_AVATAR}
                            alt={user.name}
                            className="w-12 h-12 rounded-full border-2 border-green-500"
                        />
                        <div className="text-white">
                            <p className="text-lg font-semibold">{user.name}</p>
                            <p className="text-sm text-gray-300">{user.email}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    onClick={handleLogin}
                    className="w-full py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
                >
                    Sign in
                </button>
            )}
        </div>
    );

    return (
        <>
            {renderMobileView()}
            {renderDesktopView()}

            {/* Slide-out menu - Only shown when user is logged in */}
            {token && (
                <div
                    className={`absolute right-1 lg:right-10 top-14 lg:top-20 min-w-[200px] lg:min-w-[300px] p-4 rounded-lg shadow-lg bg-black/50 backdrop-blur-xl 
                    transform transition-all duration-300 ease-in-out z-50
                    ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
                >
                    {user && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="text-white">
                                    <p className="text-lg font-semibold">{user.name}</p>
                                    <p className="text-sm text-gray-300">{user.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogOut}
                                className="w-full py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-medium"
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? 'Signing out...' : 'Sign out'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            <Alert
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                title={alertType === 'success' ? 'Sign out Successful' : 'Sign out Failed'}
                message={
                    alertType === 'success'
                        ? 'Thank you for visiting! See you again.'
                        : 'Unable to sign out. Please try again.'
                }
                variant={alertType}
            />
        </>
    );
};

export default UserProfile;