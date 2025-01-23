import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';

const TVNavbar: React.FC = () => {
    // const [hideSearchIcon, setHideSearchIcon] = useState<boolean>(false);
    // const location = useLocation()
    // useEffect(() => {
    //     if (location.pathname === '/home') {
    //         setHideSearchIcon(true);
    //     } else {
    //         setHideSearchIcon(false);
    //     }
    // }, [location.pathname]);
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r bg-[var(--dark-blue)] border-b border-white/10">
            <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-x-4 h-16">
                    {/* Logo and Navigation Links */}
                    <div className="flex items-center gap-8 w-full sm:w-auto">
                        {/* Search Bar and Mobile Menu */}
                        <div className="flex items-center  justify-end  gap-4">
                            <div className="block xl:hidden">
                                <MobileMenu />
                            </div>

                            <div className=" absolute top-3  sm:top-3 right-2 md:right-28 md:block">
                                 <SearchBar />
                            </div>

                        </div>
                        <Logo />
                        {/* PC */}
                        <div className="hidden xl:flex">
                            <NavLinks />
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default TVNavbar;
