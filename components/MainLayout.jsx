// components/MainLayout.js
import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="w-full flex h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
