import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useGoogleLoginMutation } from '../../../services/api/auth/auth';
import TvLoader from '../loader/TvLoader';
import { Alert } from '../alert/Alert';

const GoogleAuth: React.FC = () => {
    const [googleLogin, { isLoading, data, error }] = useGoogleLoginMutation();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('error');

    // Show alert with the appropriate message based on the type
    const showAlert = (type: 'success' | 'error' | 'info') => {
        setAlertType(type);
        setIsAlertOpen(true);
    };

    const handleLoginSuccess = async (credentialResponse: any) => {
        try {
            // Send token to the backend to get the user data and token
            await googleLogin({ token: credentialResponse.credential }).unwrap();
        } catch (err) {
            console.error('Error during Google login:', err);
            showAlert('error');
        }
    };

    const handleLoginError = () => {
        console.log('Login Failed');
        showAlert('error');
    };

    // Set cookies when the login is successful
    useEffect(() => {
        if (data && data.token) {
            Cookies.set('token', data.token); // Store token in cookie
            Cookies.set('user', JSON.stringify(data.user)); // Store user data in cookie
            showAlert('success');
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            console.error('Login error:', error);
            showAlert('error');
        }
    }, [error]);

    return (
        <>
            <div>
                {isLoading ? (
                    <p><TvLoader /></p>
                ) : (
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                    />
                )}
                {error && <p>Error logging in. Please try again.</p>}
            </div>

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
                        ? 'Thank you for your login! Enjoy watching.'
                        : alertType === 'error'
                            ? 'Make sure your email and password are correct. Please try again.'
                            : 'Discover our new collection of vintage gold pieces, now available for viewing.'
                }
                variant={alertType}
            />
        </>
    );
};

export default GoogleAuth;
