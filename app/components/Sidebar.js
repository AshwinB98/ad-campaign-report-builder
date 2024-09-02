"use client";

import { usePathname } from "next/navigation";
import MetricsList from "../atoms/sidebar/MetricsList";
import NavSection from "../atoms/sidebar/NavSection";
import SidebarHeader from "../atoms/sidebar/SideBarHeader";
import ToolsSection from "../atoms/sidebar/ToolsSection";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white text-gray-800 h-screen p-4 border-r border-gray-300">
      <SidebarHeader />
      <nav>
        <ul>
          <NavSection
            href="/"
            icon="home"
            label="Overview"
            isActive={pathname === "/"}
          />
          <ToolsSection />
          <MetricsList />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
