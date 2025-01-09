import React from 'react'
import LoginModal from '../components/UI/auth/LoginModal';
import GoogleAuth from '../components/UI/auth/GoogleAuth';

const Login: React.FC = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            
        >
            <div className="absolute inset-0 " />
            <div className="relative z-10 bg-[var(--dark-blue)] p-5 rounded-lg">
                <LoginModal />
                <GoogleAuth/>
            </div>
        </div>
    )
}

export default Login