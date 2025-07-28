import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast'; // 1. Import

const SharedLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        {/* The Outlet component renders the current page (e.g., Dashboard, Create Pool) */}
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;