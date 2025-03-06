import React from 'react';
import { Link } from 'react-router-dom';

interface LoginButtonProps {
    onLogin?: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLogin }) => {
    const handleClick = () => {
        // If an onLogin callback is provided, call it.
        if (onLogin) {
            onLogin();
        }
    };

    return (
        <Link to={`/login`}>
            <button
                onClick={handleClick}
                className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a2aeff_0%,#3749be_50%,#a2aeff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#070e41] px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
                    Log In
                </span>
            </button>
        </Link>
    );
};

export default LoginButton;
