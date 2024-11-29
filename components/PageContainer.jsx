"use client";

import React, { useState } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import Sidebar from "@components/sidebar";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"; // Import CloseIcon
import MenuCartButton from "@components/MenuCartButton";
import Notification from "@components/notifications";

function PageContainer({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Start with sidebar open
  const [isSidebarMini, setSidebarMini] = useState(false); // Change to true for mini view

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleMiniSidebar = () => {
    setSidebarMini(!isSidebarMini);
  };

  return (
    <Box display="flex" w="full" h="100vh" overflow="hidden">
      <Sidebar isOpen={isSidebarOpen} isMini={isSidebarMini} />

      <Box
        w="full"
        flex="1"
        display="flex"
        flexDirection="column"
        transition="all 0.3s"
        ml={isSidebarMini ? "4rem" : "16rem"} // Adjust margin-left based on sidebar width
      >
        {/* Navbar */}
        <Box
          w="full"
          bg="white"
          py={2} // Adjust the height of the navbar
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          boxShadow="md"
        >
          <IconButton
            aria-label="Toggle Sidebar"
            icon={!isSidebarMini ? <CloseIcon /> : <HamburgerIcon />} // Conditionally render Hamburger or Close icon
            fontSize={!isSidebarMini?  "sm": "lg"}
            bg='transparent'
            onClick={toggleMiniSidebar} // Toggle sidebar state
            ml={2} // Left margin for the button
            _hover={{
            bg:'transparent'}}
          />
          <Flex alignItems='center' mr={5}>
            <Notification />
            <MenuCartButton />
          </Flex>
        </Box>

        {/* Main content */}
        <Box as="main" flex="1" p={5} bg="gray.100">
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default PageContainer;
