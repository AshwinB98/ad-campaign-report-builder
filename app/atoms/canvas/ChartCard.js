import { updateChartColors } from "@/app/utils/ChartOptions";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { ChromePicker } from "react-color";
import ChartRenderer from "./ChartRenderer";

const ChartCard = ({
  chart,
  removeChart,
  updateChartType,
  handleGoBack,
  handleDrillDown,
  setCharts,
}) => {
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);
  const [bgColor, setBgColor] = useState(
    chart.data.datasets[0].backgroundColor
  );
  const [borderColor, setBorderColor] = useState(
    chart.data.datasets[0].borderColor
  );

  const handleBgColorChange = (color) => {
    setBgColor(color.hex);
    updateChartColors(chart.id, color.hex, borderColor, setCharts);
  };

  const handleBorderColorChange = (color) => {
    setBorderColor(color.hex);
    updateChartColors(chart.id, bgColor, color.hex, setCharts);
  };

  return (
    <div className="relative bg-white p-4 border border-gray-200 rounded-md shadow-lg h-full overflow-hidden">
      <div className="absolute top-2 right-2">
        <XMarkIcon
          onClick={() => removeChart(chart.id)}
          className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-800"
        />
      </div>

      <div className="drag-handle cursor-move mb-4 text-center text-xs text-gray-500">
        Drag to move
      </div>

      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        {chart.metric.name}
      </h3>

      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            value={chart.type}
            onChange={(e) => updateChartType(chart.id, e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700"
          >
            <option value="Bar">Bar</option>
            <option value="Line">Line</option>
            <option value="Pie">Pie</option>
          </select>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-600">BG</span>
            <div className="relative">
              <div
                className="w-8 h-5 rounded cursor-pointer border border-gray-300"
                style={{ backgroundColor: bgColor }}
                onClick={() => setShowBgColorPicker(!showBgColorPicker)}
              ></div>
              {showBgColorPicker && (
                <div
                  className="absolute z-10 mt-2"
                  onMouseLeave={() => setShowBgColorPicker(false)}
                >
                  <ChromePicker
                    color={bgColor}
                    onChangeComplete={handleBgColorChange}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-600">B</span>
            <div className="relative">
              <div
                className="w-8 h-5 rounded cursor-pointer border border-gray-300"
                style={{ backgroundColor: borderColor }}
                onClick={() => setShowBorderColorPicker(!showBorderColorPicker)}
              ></div>
              {showBorderColorPicker && (
                <div
                  className="absolute z-10 mt-2"
                  onMouseLeave={() => setShowBorderColorPicker(false)}
                >
                  <ChromePicker
                    color={borderColor}
                    onChangeComplete={handleBorderColorChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {chart.originalData && (
          <div
            onClick={() => handleGoBack(chart.id)}
            className="flex items-center text-blue-500 cursor-pointer"
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
