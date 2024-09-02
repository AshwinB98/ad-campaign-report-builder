import "chart.js/auto";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDrop } from "react-dnd";

const DroppableCanvas = ({ metrics, onDrop, activeTool, campaigns }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "METRIC",
    drop: (item) => onDrop(item.metric),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (metrics.length > 0 && activeTool === "chart") {
      const data = calculateChartData(metrics, campaigns);
      setChartData(data);
    } else {
      setChartData(null);
    }
  }, [metrics, activeTool, campaigns]);

  const calculateChartData = (selectedMetrics, campaigns) => {
    const labels = [];
    const datasets = selectedMetrics.map((metric) => ({
      label: metric.name,
      data: [],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
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

  return (
    <div ref={drop} className={`flex-1 p-4 ${isOver ? "bg-blue-100" : ""}`}>
      <h2 className="text-xl font-bold mb-4">Report Canvas</h2>

      {chartData && (
        <div className="bg-white p-4 rounded-xs shadow-lg max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-4">
            {metrics.map((metric) => metric.name).join(", ")}
          </h3>
          <Bar
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DroppableCanvas;
