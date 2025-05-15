"use client";

import { useState } from "react";
import { Header } from "./LayoutComp/Header";
import { Sidebar } from "./LayoutComp/Sidebar";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <>
      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        toggleMobileSidebar={() => setMobileSidebar((prev) => !prev)}
      />
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          isMobileOpen={mobileSidebar}
          closeMobileSidebar={() => setMobileSidebar(false)}
        />
        <main
          className={`flex-1 p-4 bg-gray-100 transition-all duration-300 mt-10
          ${isSidebarOpen ? "md:ml-64" : "md:ml-20"} ml-0`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
