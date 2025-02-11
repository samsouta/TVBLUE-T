import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../../../../context/StateContext';
import UserProfile from '../../../UI/userProfile/UserProfile';
import Cookies from 'js-cookie';
import { CircleX, LogOut as IconLogOut, Loader, User } from 'lucide-react';
import GenreButton from '../../../UI/catagoryBtn/GenreButton';
import { useGetAllgenreQuery } from '../../../../services/api/Genre/getAllGern';
import { GenreDataType } from '../../../../types/GenreDataType';
import { useLogOutMutation } from '../../../../services/api/auth/auth';
import { Alert } from '../../../UI/alert/Alert';

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

    const { data, isLoading } = useGetAllgenreQuery();
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
                }, 1000);
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
                className="fixed top-0 left-0 h-screen w-64 text-[var(--dark-blue)] opacity-100 bg-white/50 backdrop-blur-xl p-5 z-[150] shadow-lg"
            >
                <div className="flex flex-col h-full">
                    <div>
                        <div className=' flex items-center' >
                            <h2 className="text-2xl font-bold text-[var(--dark-blue)] kablammo mb-3">BLUETV</h2>
                            <div>
                                <CircleX className="w-8 h-8  absolute right-3 top-3 cursor-pointer" onClick={toggleSidebar} />
                            </div>
                        </div>
                        {isUserLoggedIn() ? (
                            <UserProfile />
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="flex flex-col items-center w-full gap-y-2 px-4 py-3 rounded-lg text-[var(--dark-blue)]  text-lg font-semibold montserrat "
                            >
                                <User className="text-[var(--dark-blue)] w-8 h-8" />
                                <span className=' text-sm poppins-semibold' >Login</span>
                            </button>


                        )}
                    </div>

                    <div className="space-y-5 mt-6 flex-grow">
                        <button
                            onClick={handleHome}
                            className="flex gap-x-2 items-center poppins-semibold text-[var(--dark-blue) cursor-pointer text-lg"
                        >
                            Home
                        </button>
                        {isLoading ? (
                            <div className="space-y-4">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="flex items-center gap-2 animate-pulse">
                                        <Loader className="w-5 h-5 text-[var(--dark-blue)] animate-spin" />
                                        <div className="h-4 bg-[var(--medium-blue)] rounded w-24"></div>
                                    </div>
                                ))}
                            </div>
                        ) : genreList?.length === 0 ? (
                            <p className="text-[var(--dark-blue)] text-center py-4">No genres available</p>
                        ) : (
                            genreList?.map((gen) => (
                                <GenreButton
                                    key={gen?.id}
                                    name={gen?.name}
                                    tag={gen?.sub_genres}
                                />
                            ))
                        )}
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
