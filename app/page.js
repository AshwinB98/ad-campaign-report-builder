"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Spinner from "./atoms/common/Spinner";
import DroppableCanvas from "./components/DroppableCanvas";
import FilterBar from "./components/FilterBar";
import Sidebar from "./components/Sidebar";
import { useCampaignData } from "./hooks/useCampaignData";
import { exportPDF } from "./utils/ExportPdf";

export default function HomePage() {
  const { data: campaigns, loading, error } = useCampaignData();
  const [filters, setFilters] = useState({
    dateRange: [new Date(2024, 7, 1), new Date(2024, 7, 6)],
    device: "All Devices",
    region: "All Regions",
  });
  const [charts, setCharts] = useState([]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <ExclamationCircleIcon className="h-24 w-24 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Page Not Working</h2>
        <p className="text-lg">{error.message}. Please try again later</p>
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
            exportPDF={() => exportPDF(charts)}
            canExportPDF={charts.length > 0}
          />
          <div className="flex-1 flex">
            <DroppableCanvas
              filters={filters}
              campaigns={campaigns}
              charts={charts}
              setCharts={setCharts}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
