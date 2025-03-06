// TVNavbar.tsx
import React from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import UserProfile from './UserProfile';

const TVNavbar: React.FC = () => {

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-auto bg-white/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {
        /* Mobile Layout (3 sections) */
        }
        <div className="lg:hidden flex flex-col">
          {/* First section: Logo, Search, Profile */}
          <div className={`flex items-center justify-between py-2 transition-all duration-300 `}>
            <div className="flex-shrink-0">
              <Logo />
            </div>
            <div className="flex items-center gap-4">
              <SearchBar />
              <div className="flex items-center flex-wrap">
                <UserProfile  />
              </div>
            </div>
          </div>

          {/* Second section: Scrollable Navigation Links */}
          <div className="overflow-x-auto scrollbar-hide border-t border-gray-200/20">
            <div className="flex items-center py-2 px-1 space-x-4 min-w-max">
              <NavLinks />
            </div>
          </div>
        </div>

        {
        /* Desktop Layout (1 line) */
        }
        <div className="hidden lg:flex items-center justify-between h-16">
          <div className={`flex items-center gap-8 transition-all duration-300 `}>
            <Logo />
          </div>
          <div className="flex items-center gap-8">
            <NavLinks />
          </div>
          <div className={`flex items-center gap-6 transition-all duration-300 `}>
            <SearchBar />
            <div className="min-w-[120px]">
                <UserProfile />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TVNavbar;
