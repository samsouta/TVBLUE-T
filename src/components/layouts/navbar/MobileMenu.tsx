import React, { useContext } from 'react';
import { List } from 'lucide-react';
import MobileMenuList from './MobileMenuList';
import { StateContext } from '../../../context/StateContext';

const MobileMenu: React.FC = () => {
     const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { isOpen, setIsOpen } = context;
    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-300 cursor-pointer hover:text-white"
            >
                <List className="h-6 w-6" />
            </button>

            {isOpen && (
                <MobileMenuList/>
            )}
        </div>
    )
}

export default MobileMenu