import React, { useState } from 'react';
import { List } from 'lucide-react';
import MobileMenuList from './MobileMenuList';

const MobileMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-300 cursor-pointer hover:text-white"
            >
                <List className="h-6 w-6" />
            </button>

            {isOpen && (
                <MobileMenuList isopen={isOpen}/>
            )}
        </div>
    )
}

export default MobileMenu