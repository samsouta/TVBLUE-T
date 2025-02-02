import React, { useContext } from 'react';
import MobileMenuList from './MobileMenuList';
import { HiOutlineMenu } from "react-icons/hi";

import { StateContext } from '../../../../context/StateContext';

const MobileMenu: React.FC = () => {
     const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { isOpen, setIsOpen } = context;
    return (
        <div  >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-300 cursor-pointer hover:text-white"
            >
                <HiOutlineMenu className="h-8 w-8" />
            </button>

            {isOpen && (
                <MobileMenuList/>
            )}
        </div>
    )
}

export default MobileMenu