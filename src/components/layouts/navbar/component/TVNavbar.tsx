// TVNavbar.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';
import Cookies from 'js-cookie';
import LoginButton from '../../../UI/Login Button/LoginButton';
import PcProfile from '../../../UI/userProfile/ProfileDropDown';

const TVNavbar: React.FC = () => {
  const location = useLocation();
  // Initialize the state based on the current cookie.
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));

  // When the location changes, re-read the token cookie.
  useEffect(() => {
    setIsLoggedIn(!!Cookies.get('token'));
  }, [location]);

  // Optionally, you can also pass a callback to update the login status.
  const updateLoginStatus = () => {
    setIsLoggedIn(!!Cookies.get('token'));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-auto bg-white/20 backdrop-blur-xl ">
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo and Nav Links */}
          <div className="flex items-center gap-4">
            <div className="block xl:hidden relative z-[60] isolate">
              <MobileMenu />
            </div>
            <Logo />
            <div className="hidden xl:block">
              <NavLinks />
            </div>
          </div>

          {/* Right Section: Search, Mobile Menu and Profile */}
          <div className="flex items-center gap-6">
            <div className="w-full max-w-[200px] md:max-w-xs">
              <SearchBar />
            </div>

            <div className="min-w-[120px] hidden xl:block">
              {isLoggedIn ? (
                // Optionally, you can pass updateLoginStatus so that ProfileDropDown can update the parent's state when logging out.
                <PcProfile onLogout={updateLoginStatus} />
              ) : (
                // If you want to update login status after a successful login, you can pass the callback here.
                <LoginButton onLogin={updateLoginStatus} />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TVNavbar;
