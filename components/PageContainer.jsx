"use client";

import React, { useState } from "react";
import Sidebar from "@components/sidebar";
import { MoonIcon } from "@heroicons/react/24/outline";
import MenuCartButton from "@components/MenuCartButton";
import Notification from "@components/notifications";
import { Flex, IconButton } from "@chakra-ui/react";

function PageContainer({children}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Start with sidebar open
  const [isSidebarMini, setSidebarMini] = useState(false); // Change to true for mini view

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleMiniSidebar = () => {
    setSidebarMini(!isSidebarMini);
  };

  return (
    <>
      <div className="w-full flex h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} isMini={isSidebarMini} />

        <div
          className={`w-full flex-1 flex flex-col transition-all duration-300 ${
            isSidebarMini ? "ml-16" : "ml-64" // Adjust margin-left based on sidebar width
          }`}
        >
          {/* Navbar */}
          <div className="w-full bg-white p-4 flex justify-between items-center shadow-md">
            <button
              onClick={toggleMiniSidebar}
              className="text-2xl" // Hide on medium screens and up
            >
              ☰
            </button>
            <Flex>
              <Notification />
              <MenuCartButton />

              <IconButton
                border="none"
                icon={<MoonIcon className="h-6 w-6" />}
                variant="outline"
                rounded={25}
              />
            </Flex>
          </div>

          {/* Main content */}
          <main className="flex-1 p-5 bg-gray-100">
          {children}
          </main>
          
        </div>
      </div>
    </>
  );
}

export default PageContainer;
