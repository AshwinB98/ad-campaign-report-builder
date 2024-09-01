"use client";

import {
  ChartBarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCampaignData } from "../hooks/useCampaignData";

const Sidebar = () => {
  const { data, loading, error } = useCampaignData();
  const router = useRouter();
  const [isCampaignsCollapsed, setIsCampaignsCollapsed] = useState(false);

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
      <div className="mb-4">
        {" "}
        <h2 className="text-lg font-bold">Dashboard</h2>
      </div>
      <nav>
        <ul>
          {/* Overall Section */}
          <li className="mb-2">
            {" "}
            <Link
              href="/"
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                router.pathname === "/"
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <HomeIcon className="h-5 w-5 font-semibold" />{" "}
              <span className="text-sm font-semibold">Overall</span>{" "}
            </Link>
          </li>

          {/* Campaigns Section */}
          <li className="mb-2">
            <div
              className="flex items-center justify-between p-2 cursor-pointer transition-colors duration-300"
              onClick={() => setIsCampaignsCollapsed(!isCampaignsCollapsed)}
            >
              <div className="flex items-center space-x-2">
                <ChartBarIcon className="h-5 w-5 font-semibold" />{" "}
                <span className="text-sm font-semibold">Campaigns</span>{" "}
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
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
