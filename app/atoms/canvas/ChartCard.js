import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import ChartRenderer from "./ChartRenderer";

const ChartCard = ({
  chart,
  removeChart,
  updateChartType,
  handleGoBack,
  handleDrillDown,
}) => {
  return (
    <div
      key={chart.id}
      className="bg-white p-6 border border-gray-300 rounded-sm shadow-sm relative h-full"
      style={{ overflow: "hidden" }}
    >
      <div className="cursor-pointer absolute top-4 right-4">
        <XMarkIcon onClick={() => removeChart(chart.id)} className="h-5 w-5" />
      </div>
      <div className="drag-handle cursor-move mb-2 text-center text-sm text-gray-500">
        Drag to move
      </div>
      <h3 className="text-lg font-semibold mb-4">{chart.metric.name}</h3>

      <div className="mb-4 flex justify-between items-center">
        <select
          value={chart.type}
          onChange={(e) => updateChartType(chart.id, e.target.value)}
          className="border border-gray-300 rounded p-1 text-sm"
        >
          <option value="Bar">Bar</option>
          <option value="Line">Line</option>
          <option value="Pie">Pie</option>
        </select>
        {chart.originalData && (
          <div
            onClick={() => handleGoBack(chart.id)}
            className="flex items-center cursor-pointer text-blue-500"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            <span className="text-sm">Back</span>
          </div>
        )}
      </div>

      <ChartRenderer
        chart={chart}
        onDrillDown={(metric, label, selectedCampaignId) =>
          handleDrillDown(metric, label, selectedCampaignId, chart.id)
        }
      />
    </div>
  );
};

export default React.memo(ChartCard);
