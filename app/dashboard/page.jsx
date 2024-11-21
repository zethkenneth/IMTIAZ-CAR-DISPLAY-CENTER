"use client";

import React, { useState } from "react";
import PageContainer from "@components/PageContainer";
import HomeDashboard from "./Home/page";

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
    <>
      <PageContainer>
        <HomeDashboard/>
      </PageContainer>
    </>
  );
}

export default Page;
