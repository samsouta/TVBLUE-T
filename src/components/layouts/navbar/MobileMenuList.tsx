import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { MenuItems } from '../../../data/navbar';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../../../context/StateContext';
import GategoryBtn from './catagoryBtn/Gategorybtn';


const MobileMenuList: React.FC = () => {
    const toggleSidebar = () => setIsOpen(!isOpen);
    const nav = useNavigate()

    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { setTopVid,isOpen, setIsOpen } = context;



    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: '100%' },
    };

    const menuItemVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: 20 },
    };

    const handleSidebar = (path: string, text: string) => {
        const formattedPath = path.split('/').pop();
        const formattedText = text.toLocaleLowerCase();

        if (formattedText === "home") {
            nav('/');
            toggleSidebar();
        } else if (formattedText === 'contact') {
            nav('/contact');
            toggleSidebar();
        } else if (formattedPath) {
            nav(`/home/${formattedPath}`);
            setTopVid(formattedPath);
            toggleSidebar();
        } else {
            console.error("Formatted path is undefined");
        }
    };



    return (
        <>
            <motion.nav
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 right-0 h-full w-64 bg-[var(--medium-blue)] text-[var(--white)] p-5 shadow-xl z-40"
            >
                <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold kablammo mb-10">BlueTV</h2>
                    <ul className="space-y-4 flex-grow">
                        {MenuItems.map((item, index) => (
                            <motion.li
                                key={item.text}
                                variants={menuItemVariants}
                                transition={{ delay: index * 0.2 }}
                            >
                                <a
                                    onClick={() => handleSidebar(item.path, item?.text)}
                                    className="flex open-sans text-[--soft-blue] text-md  hover:text-[--white] cursor-pointer items-center space-x-3 p-2 rounded-lg hover:bg-[var(--a-color)] transition-colors duration-300"
                                >
                                    <item.icon size={20} />
                                    <span>{item.text}</span>
                                </a>
                            </motion.li>
                        ))}
                        <div><GategoryBtn /></div>
                    </ul>
                    
                </div>
            </motion.nav>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    )
}

export default React.memo(MobileMenuList);