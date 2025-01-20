import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../../../context/StateContext';
import UserProfile from '../../UI/userProfile/UserProfile';
import Cookies from 'js-cookie';
import { LogOut as IconLogOut, User } from 'lucide-react';
import GenreButton from './catagoryBtn/GenreButton';
import { useGetAllgenreQuery } from '../../../redux/api/getAllGern';
import { GenreDataType } from '../../../types/GenreDataType';
import { useLogOutMutation } from '../../../redux/api/auth';
import { Alert } from '../../UI/alert/Alert';

const MobileMenuList: React.FC = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('error');
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const token = Cookies.get('token');
    const nav = useNavigate();
    const [logOut] = useLogOutMutation();
    const context = useContext(StateContext);

    if (!context) {
        throw new Error('StateContext not found');
    }

    const { setTopVid, isOpen, setIsOpen } = context;

    const showAlert = (type: 'success' | 'error' | 'info') => {
        setAlertType(type);
        setIsAlertOpen(true);
    };

    const toggleSidebar = () => setIsOpen(!isOpen);

    const { data } = useGetAllgenreQuery();
    const genreList = data?.data as GenreDataType[];

    const isUserLoggedIn = () => !!token;

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: '-100%' }, // Moves off-screen to the left
    };

    const handleLogin = () => {
        nav('/login');
        toggleSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleHome = () => {
        nav('/home');
        toggleSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogOut = async () => {
        if (!token) {
            alert('No valid token found.');
            return;
        }

        setIsLoggingOut(true);
        try {
            const response = await logOut(token).unwrap();
            if (response) {
                showAlert('success');
                Cookies.remove('token');
                Cookies.remove('user');
                nav('/home');
                setTimeout(() => {
                    toggleSidebar();
                }, 2000);
            }
        } catch (error: any) {
            console.error('Error logging out:', error);
            if (error.originalStatus === 500) {
                alert('Server error occurred. Please try again later.');
            } else {
                alert('Failed to log out. Please try again.');
            }
            showAlert('error');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <>
            <motion.nav
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 left-0 h-full w-64 bg-[var(--medium-blue)] text-[var(--white)] p-5 shadow-xl z-[1000]"
            >
                <div className="flex flex-col h-full">
                    <div>
                        <h2 className="text-2xl font-bold kablammo mb-3">BlueTV</h2>
                        {isUserLoggedIn() ? (
                            <UserProfile />
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="flex flex-col items-center w-full gap-y-2 px-4 py-3 rounded-lg text-white text-lg font-semibold montserrat "
                            >
                                <User className="text-white w-8 h-8" />
                                <span className=' text-sm' >Login</span>
                            </button>


                        )}
                    </div>

                    <div className="space-y-5 mt-6 flex-grow">
                        <button
                            onClick={handleHome}
                            className="flex gap-x-2 items-center open-sans text-[--soft-blue] cursor-pointer text-lg"
                        >
                            Home
                        </button>
                        {genreList?.map((gen) => (
                            <GenreButton
                                key={gen?.id}
                                name={gen?.name}
                                tag={gen?.sub_genres}
                            />
                        ))}
                    </div>

                    {isUserLoggedIn() && (
                        <button
                            onClick={handleLogOut}
                            className="flex gap-x-2 items-center montserrat text-red-600 cursor-pointer text-lg"
                            disabled={isLoggingOut}
                        >
                            <IconLogOut />
                            {isLoggingOut ? 'Logging Out...' : 'Log Out'}
                        </button>
                    )}
                </div>
            </motion.nav>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Alert Box */}
            <Alert
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                title={
                    alertType === 'success'
                        ? 'LogOut Successful'
                        : alertType === 'error'
                            ? 'Error Register'
                            : 'Special Offer'
                }
                message={
                    alertType === 'success'
                        ? 'Thank you for using the app! Enjoy watching.'
                        : alertType === 'error'
                            ? 'Please try again.'
                            : 'Discover our new collection of vintage gold pieces, now available for viewing.'
                }
                variant={alertType}
            />
        </>
    );
};

export default React.memo(MobileMenuList);
