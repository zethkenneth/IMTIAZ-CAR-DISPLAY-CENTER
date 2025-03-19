"use client";

import React, { useState } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import Sidebar from "@components/sidebar";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import MenuCartButton from "@components/MenuCartButton";
import Notification from "@components/notifications";

function PageContainer({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSidebarMini, setSidebarMini] = useState(false);

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
        marginLeft={isSidebarMini ? "64px" : "256px"}
        position="relative"
        maxWidth={`calc(100% - ${isSidebarMini ? "64px" : "256px"})`}
      >
        {/* Navbar */}
        <Box
          w="full"
          bg="white"
          py={2}
          px={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          boxShadow="md"
          position="sticky"
          top={0}
          zIndex={10}
        >
          <IconButton
            aria-label="Toggle Sidebar"
            icon={isSidebarMini ? <HamburgerIcon /> : <CloseIcon />}
            fontSize="20px"
            variant="ghost"
            onClick={toggleMiniSidebar}
            color="gray.600"
            _hover={{ bg: "gray.100" }}
          />
          <Flex alignItems="center" gap={4}>
            <Notification />
            <MenuCartButton />
          </Flex>
        </Box>

        {/* Main content */}
        <Box 
          as="main" 
          flex="1" 
          p={5} 
          bg="gray.100" 
          overflowY="auto"
          h="calc(100vh - 3.5rem)"
          w="full"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default PageContainer;
