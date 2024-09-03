"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Spinner from "./atoms/common/Spinner";
import DroppableCanvas from "./components/DroppableCanvas";
import FilterBar from "./components/FilterBar";
import Sidebar from "./components/Sidebar";
import { useCampaignData } from "./hooks/useCampaignData";

export default function HomePage() {
  const { data: campaigns, loading, error } = useCampaignData();
  const [filters, setFilters] = useState({
    dateRange: [new Date(2024, 7, 1), new Date(2024, 7, 6)],
    device: "All Devices",
    region: "All Regions",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="50" color="blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error loading campaigns: {error.message}
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gray-100">
          <FilterBar
            campaigns={campaigns || []}
            onFilterChange={handleFilterChange}
          />
          <div className="flex-1 flex">
            <DroppableCanvas filters={filters} campaigns={campaigns} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
