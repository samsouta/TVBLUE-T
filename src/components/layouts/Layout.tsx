import React from 'react';
import Footer from './component/Footer';
import { Outlet } from 'react-router-dom';
import TVNavbar from './component/TVNavbar';

const Layout: React.FC = () => {
  return (
    <div>
      <TVNavbar />
      <main className=' mt-32 lg:mt-20 mx-0 lg:mx-32 overscroll-x-auto' >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
