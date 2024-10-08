import {
  CalendarIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "../atoms/Dropdown";
import "../globals.css";

const FilterBar = ({ campaigns, onFilterChange, exportPDF, canExportPDF }) => {
  const [dateRange, setDateRange] = useState([
    new Date(2024, 7, 1),
    new Date(2024, 7, 6),
  ]);
  const [device, setDevice] = useState("All Devices");
  const [region, setRegion] = useState("All Regions");
  const [devices, setDevices] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    if (campaigns && campaigns.length > 0) {
      const uniqueDevices = new Set();
      const uniqueRegions = new Set();

      campaigns.forEach((campaign) => {
        campaign.adGroups.forEach((adGroup) => {
          adGroup.metrics.forEach((metric) => {
            uniqueDevices.add(metric.device);
            uniqueRegions.add(metric.location);
          });
        });
      });

      setDevices(["All Devices", ...Array.from(uniqueDevices)]);
      setRegions(["All Regions", ...Array.from(uniqueRegions)]);
    }
  }, [campaigns]);

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setDateRange([start, end]);
    onFilterChange({ dateRange: [start, end], device, region });
  };

  return (
    <div className="bg-white border-b border-gray-300 p-3 flex flex-wrap items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
      <div className="flex flex-wrap items-center space-x-4">
        <span className="text-xs font-light text-gray-700">Filter by:</span>

        <div className="relative inline-block text-left">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-gray-500" />
            <DatePicker
              selected={dateRange[0]}
              onChange={handleDateRangeChange}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              selectsRange
              dateFormat="yyyy-MM-dd"
              className="custom-datepicker-input"
            />
          </div>
        </div>

        <Dropdown
          title={
            <span className="flex items-center">
              <DevicePhoneMobileIcon className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-xs">{device}</span>
            </span>
          }
          items={devices}
          onSelect={(item) => {
            setDevice(item);
            onFilterChange({ dateRange, device: item, region });
          }}
        />

        <Dropdown
          title={
            <span className="flex items-center">
              <GlobeAltIcon className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-xs">{region}</span>
            </span>
          }
          items={regions}
          onSelect={(item) => {
            setRegion(item);
            onFilterChange({ dateRange, device, region: item });
          }}
        />
      </div>

      <div className="flex space-x-2">
        <button
          onClick={exportPDF}
          className={`bg-primary text-white px-4 py-2 rounded-md shadow-sm text-xs md:text-sm font-light ${
            canExportPDF
              ? "hover:bg-primary-dark"
              : "cursor-not-allowed opacity-50"
          }`}
          disabled={!canExportPDF}
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
