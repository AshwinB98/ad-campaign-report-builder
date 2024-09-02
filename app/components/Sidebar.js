"use client";

import {
  ChartBarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import {
  CreditCardIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DraggableMetric from "../atoms/DraggableMetric";
import { useCampaignData } from "../hooks/useCampaignData";

const Sidebar = () => {
  const { data, loading, error } = useCampaignData();
  const router = useRouter();
  const [isCampaignsCollapsed, setIsCampaignsCollapsed] = useState(false);
  const [activeTool, setActiveTool] = useState("chart");

  const metrics = [
    { id: "1", name: "Impressions" },
    { id: "2", name: "Clicks" },
    { id: "3", name: "Conversions" },
    { id: "4", name: "Spend" },
  ];

  // Modify metrics based on active tool
  const displayMetrics =
    activeTool === "chart"
      ? metrics
      : metrics.map((metric) => ({
          ...metric,
          name: `Avg. ${metric.name}`,
        }));

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
    <div className="w-64 bg-white text-gray-800 h-screen p-4 shadow-lg border border-gray-200">
      <div className="mb-10 flex items-center">
        <h2 className="text-2xl font-bold text-blue-500">TechAds.</h2>
      </div>
      <nav>
        <ul>
          {/* Overall Section */}
          <li className="mb-2">
            <Link
              href="/"
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                router.pathname === "/"
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <HomeIcon className="h-5 w-5 font-semibold" />
              <span className="text-sm font-semibold">Overall</span>
            </Link>
          </li>

          {/* Campaigns Section */}
          <li className="mb-2">
            <div
              className="flex items-center justify-between p-2 cursor-pointer transition-colors duration-300"
              onClick={() => setIsCampaignsCollapsed(!isCampaignsCollapsed)}
            >
              <div className="flex items-center space-x-2">
                <ChartBarIcon className="h-5 w-5 font-semibold" />
                <span className="text-sm font-semibold">Campaigns</span>
              </div>
              {isCampaignsCollapsed ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isCampaignsCollapsed ? "max-h-0" : "max-h-screen"
              }`}
            >
              <ul className="mt-2 pl-4">
                {data.map((campaign) => (
                  <li key={campaign.campaignId} className="mb-2">
                    <Link
                      href={`/campaign/${campaign.campaignId}`}
                      className={`flex items-center space-x-2 p-2 rounded-lg ${
                        router.pathname === `/campaign/${campaign.campaignId}`
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-sm font-semibold">
                        {campaign.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Tools Section */}
          <li className="mt-6">
            <div className="flex items-center p-2">
              <WrenchIcon className="h-5 w-5 font-semibold text-gray-700" />
              <span className="text-sm font-semibold ml-2">Tools</span>
            </div>

            <div className="flex space-x-2 mt-4 pl-8">
              <div
                className={`cursor-pointer p-1 rounded-lg ${
                  activeTool === "chart"
                    ? "border-2 border-blue-500"
                    : "hover:border-2 hover:border-blue-500"
                }`}
                onClick={() => setActiveTool("chart")}
              >
                <PresentationChartLineIcon className="h-6 w-6 text-gray-700" />
              </div>
              <div
                className={`cursor-pointer p-1 rounded-lg ${
                  activeTool === "card"
                    ? "border-2 border-blue-500"
                    : "hover:border-2 hover:border-blue-500"
                }`}
                onClick={() => setActiveTool("card")}
              >
                <CreditCardIcon className="h-6 w-6 text-gray-700" />
              </div>
            </div>

            <div className="mt-4 pl-4">
              <h3 className="text-xs font-semibold text-gray-600 mb-2">
                Metrics
              </h3>
              <ul>
                {displayMetrics.map((metric) => (
                  <li key={metric.id}>
                    <DraggableMetric metric={metric} />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
