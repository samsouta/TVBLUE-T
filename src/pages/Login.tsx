import React from 'react'
import LoginModal from '../components/UI/auth/LoginModal';
import GoogleAuth from '../components/UI/auth/GoogleAuth';

const Login: React.FC = () => {
    return (
        <div
            className=" flex items-center justify-center p-4"
            
        >
            <div className="absolute inset-0 " />
            <div className="relative z-10 bg-black/20 backdrop-blur-lg p-5 rounded-lg">
                <LoginModal />
                <GoogleAuth/>
            </div>
        </div>
    )
}

export default Login