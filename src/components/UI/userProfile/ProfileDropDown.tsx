// ProfileDropDown.tsx
import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import UserProfile from './UserProfile';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useLogOutMutation } from '../../../services/api/auth/auth';
import { Alert } from '../alert/Alert';

interface ProfileDropDownProps {
    onLogout: () => void;
}

const PcProfile: React.FC<ProfileDropDownProps> = ({ onLogout }) => {
    const navigate = useNavigate();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logOut] = useLogOutMutation();
    const token = Cookies.get('token');

    const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('error');

    const handleLogOut = async () => {
        if (!token) return;
        console.log('it worked');
        setIsLoggingOut(true);
        try {
            // If your API expects the token as an object, you can pass { token }
            const response = await logOut(token).unwrap();
            if (response) {
                setAlertType('success');
                setIsAlertOpen(true);
                // Remove the cookies.
                Cookies.remove('token');
                Cookies.remove('user');
                // Update the parent login status.
                onLogout();
                // Navigate to home after a short delay.
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        } catch (error) {
            setAlertType('error');
            setIsAlertOpen(true);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="flex items-center">
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <button className="focus:outline-none">
                        <UserProfile />
                    </button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="User Actions"
                    className="w-[200px]"
                    // Use onAction to handle item selection.
                    onAction={(key) => {
                        if (key === 'logout') {
                            handleLogOut();
                        }
                    }}
                >
                    <DropdownItem key="logout" className="text-danger" color="danger">
                        <div className="flex items-center gap-2">
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Alert
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                title={alertType === 'success' ? 'Logout Successful' : 'Logout Failed'}
                message={
                    alertType === 'success'
                        ? 'Thank you for using the app! See you again.'
                        : 'Failed to logout. Please try again.'
                }
                variant={alertType}
            />
        </div>
    );
};

export default PcProfile;
