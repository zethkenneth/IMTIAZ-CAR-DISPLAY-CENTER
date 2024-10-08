"use client";

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "@components/sidebar";
import HomeDashboard from "./Home/page";
import Inventory from "./inventory/page";
import { MoonIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import Guide from "./guide/page";
import About from "./about/page";
import Services from "./services/page";
import Products from "./products/page";
import MenuCartButton from "@components/MenuCartButton";
import Transaction from "./transaction/page";
import Notification from "@components/notifications";
import { Flex, IconButton } from "@chakra-ui/react";

function Page() {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Start with sidebar open
  const [isSidebarMini, setSidebarMini] = useState(false); // Change to true for mini view

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleMiniSidebar = () => {
    setSidebarMini(!isSidebarMini);
  };

  return (
    <Router>
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
                _hover={{ bg: "transparent" }}
                _onClick={() => onOpen()}
              />
            </Flex>
          </div>

          {/* Main content */}
          <main className="flex-1 p-5 bg-gray-100 overflow-scroll">
            <Routes>
              <Route path="/dashboard/" element={<HomeDashboard />} />
              <Route path="/dashboard/about" element={<About />} />
              <Route path="/dashboard/services" element={<Services />} />
              <Route path="/dashboard/guide" element={<Guide />} />
              <Route path="/dashboard/inventory" element={<Inventory />} />
              <Route path="/dashboard/products" element={<Products />} />
              <Route path="/dashboard/transaction" element={<Transaction />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default Page;
