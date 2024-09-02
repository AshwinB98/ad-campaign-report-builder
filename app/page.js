"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DroppableCanvas from "./components/DroppableCanvas";
import FilterBar from "./components/FilterBar";
import Sidebar from "./components/Sidebar";
import { useCampaignData } from "./hooks/useCampaignData";

export default function HomePage() {
  const { data: campaigns, loading, error } = useCampaignData();
  const [filters, setFilters] = useState({
    campaign: "All Campaigns",
    dateRange: "Last Month",
    searchTerm: "",
  });

  const [metrics, setMetrics] = useState([]);
  const [activeTool, setActiveTool] = useState("chart");

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  if (error) {
    return <div>Error loading campaigns: {error.message}</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen">
        <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
        <div className="flex-1 flex flex-col bg-gray-100">
          <FilterBar
            campaigns={campaigns || []}
            onFilterChange={handleFilterChange}
          />
          <div className="flex-1 flex">
            <DroppableCanvas
              metrics={metrics}
              activeTool={activeTool}
              campaigns={campaigns}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
