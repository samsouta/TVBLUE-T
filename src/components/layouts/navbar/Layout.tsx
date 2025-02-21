import React from 'react';
import TVNavbar from './component/TVNavbar';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <TVNavbar />
      <div className='mb-32 lg:mb-20' ></div>
      {/* Render child routes */}
      <main >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
