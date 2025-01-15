import React from 'react';
import TVNavbar from './TVNavbar';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';

const LayoutVideo: React.FC = () => {
  return (
    <div>
      <TVNavbar />
      {/* Render child routes */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutVideo;
