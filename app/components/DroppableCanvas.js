import { InboxIcon } from "@heroicons/react/24/outline"; // Using InboxIcon as a dropbox icon
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import ChartRenderer from "../atoms/ChartRenderer";
import useChartData from "../hooks/useChartData";

const DroppableCanvas = ({ activeTool, campaigns, filters }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "METRIC",
    drop: (item) => onDropMetric(item.metric),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [charts, setCharts] = useState([]);
  const calculateChartData = useChartData();

  const onDropMetric = (metric) => {
    if (activeTool === "chart") {
      const newChart = {
        id: Date.now(),
        metric,
        type: "Bar",
        data: calculateChartData([metric], campaigns, filters),
      };
      setCharts((prevCharts) => [...prevCharts, newChart]);
    }
  };

  const removeChart = (id) => {
    setCharts((prevCharts) => prevCharts.filter((chart) => chart.id !== id));
  };

  const updateChartType = (id, type) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) => (chart.id === id ? { ...chart, type } : chart))
    );
  };

  useEffect(() => {
    if (charts.length > 0) {
      setCharts((prevCharts) =>
        prevCharts.map((chart) => ({
          ...chart,
          data: calculateChartData([chart.metric], campaigns, filters),
        }))
      );
    }
  }, [filters, campaigns]);

  return (
    <div
      ref={drop}
      className={`flex-1 p-4 overflow-auto ${isOver ? "bg-blue-100" : ""}`}
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      {charts.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full text-gray-500">
          <InboxIcon className="h-24 w-24 mb-4" />
          <p className="text-lg font-semibold">
            Drag and Drop the metrics to create a customized report
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {charts.map((chart, index) => (
            <div
              key={index}
              className="bg-white p-6 border border-gray-300 rounded-sm shadow-sm relative"
            >
              <div className="cursor-pointer absolute top-4 right-4">
                <XMarkIcon
                  onClick={() => removeChart(chart.id)}
                  className="h-5 w-5"
                />
              </div>
              <h3 className="text-lg font-semibold mb-4">
                {chart.metric.name}
              </h3>

              <div className="mb-4">
                <select
                  value={chart.type}
                  onChange={(e) => updateChartType(chart.id, e.target.value)}
                  className="border border-gray-300 rounded p-1 text-sm"
                >
                  <option value="Bar">Bar</option>
                  <option value="Line">Line</option>
                  <option value="Pie">Pie</option>
                </select>
              </div>

              <ChartRenderer chart={chart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DroppableCanvas;
