"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import MetricsList from "../atoms/sidebar/MetricsList";
import NavSection from "../atoms/sidebar/NavSection";
import SidebarHeader from "../atoms/sidebar/SideBarHeader";
import ToolsSection from "../atoms/sidebar/ToolsSection";
import { useCampaignData } from "../hooks/useCampaignData";

const Sidebar = ({ activeTool, setActiveTool }) => {
  const { data, loading, error } = useCampaignData();
  const [isCampaignsCollapsed, setIsCampaignsCollapsed] = useState(true);
  const pathname = usePathname();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading campaigns: {error.message}</div>;
  }

  if (!Array.isArray(data)) {
    return <div>No campaigns available</div>;
  }

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
          <NavSection
            label="Campaigns"
            icon="chart-bar"
            isCollapsible
            isCollapsed={isCampaignsCollapsed}
            toggleCollapse={() =>
              setIsCampaignsCollapsed(!isCampaignsCollapsed)
            }
            items={data.map((campaign) => ({
              href: `/campaign/${campaign.campaignId}`,
              label: campaign.name,
              isActive: pathname === `/campaign/${campaign.campaignId}`,
            }))}
          />
          <ToolsSection activeTool={activeTool} setActiveTool={setActiveTool} />
          <MetricsList activeTool={activeTool} />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
