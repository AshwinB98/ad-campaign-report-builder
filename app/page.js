"use client";

import { useState } from "react";
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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    //need to be complete based on the required data
  };

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  if (error) {
    return <div>Error loading campaigns: {error.message}</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1  bg-gray-100">
        <FilterBar
          campaigns={campaigns || []}
          onFilterChange={handleFilterChange}
        />
        <div className="mt-8">
          <h1 className="text-2xl font-bold">Campaign Dashboard</h1>
          <p>Use the filter bar to customize the view of your campaign data.</p>
        </div>
      </div>
    </div>
  );
}
