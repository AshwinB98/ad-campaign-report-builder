import { XMarkIcon } from "@heroicons/react/24/solid";
import "chart.js/auto";
import { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useDrop } from "react-dnd";

const DroppableCanvas = ({ onDrop, activeTool, campaigns }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "METRIC",
    drop: (item) => onDropMetric(item.metric),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [charts, setCharts] = useState([]);

  const onDropMetric = (metric) => {
    if (activeTool === "chart") {
      const newChart = {
        id: Date.now(),
        metric,
        type: "Bar",
        data: calculateChartData([metric], campaigns),
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

  const calculateChartData = (selectedMetrics, campaigns) => {
    const labels = [];
    const datasets = selectedMetrics.map((metric) => ({
      label: metric.name,
      data: [],
      backgroundColor: [
        "rgba(255, 165, 0, 0.4)",
        "rgba(34, 139, 34, 0.4)",
        "rgba(30, 144, 255, 0.4)",
        "rgba(255, 99, 132, 0.4)",
        "rgba(255, 205, 86, 0.4)",
      ],
      borderColor: [
        "rgba(255, 165, 0, 1)",
        "rgba(34, 139, 34, 1)",
        "rgba(30, 144, 255, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 205, 86, 1)",
      ],
      borderWidth: 1,
    }));

    campaigns.forEach((campaign) => {
      labels.push(campaign.name);

      selectedMetrics.forEach((selectedMetric, index) => {
        let totalValue = 0;
        campaign.adGroups.forEach((adGroup) => {
          adGroup.metrics.forEach((metric) => {
            const metricName = selectedMetric.name.toLowerCase();
            if (metric[metricName] !== undefined) {
              totalValue += metric[metricName];
            }
          });
        });
        datasets[index].data.push(totalValue);
      });
    });

    return {
      labels,
      datasets,
    };
  };

  const renderChart = (chart) => {
    const ChartComponent =
      chart.type === "Bar" ? Bar : chart.type === "Line" ? Line : Pie;

    const chartOptions =
      chart.type === "Pie"
        ? {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "right",
              },
            },
          }
        : {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          };

    return (
      <div
        className={chart.type === "Pie" ? "h-96 w-96 mx-auto" : "w-full"}
        style={chart.type === "Pie" ? { position: "relative" } : {}}
      >
        <ChartComponent data={chart.data} options={chartOptions} />
      </div>
    );
  };

  return (
    <div
      ref={drop}
      className={`flex-1 p-4 overflow-auto ${isOver ? "bg-blue-100" : ""}`}
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <h2 className="text-xl font-bold mb-4">Report Canvas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {charts.map((chart, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg relative"
          >
            <div className="cursor-pointer absolute top-4 right-4">
              <XMarkIcon
                onClick={() => removeChart(chart.id)}
                className="h-5 w-5"
              />
            </div>
            <h3 className="text-lg font-semibold mb-4">{chart.metric.name}</h3>

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

            {renderChart(chart)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DroppableCanvas;
