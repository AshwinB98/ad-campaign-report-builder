import DraggableMetric from "./DraggableMetric";

const MetricsList = ({ activeTool }) => {
  const metrics = [
    { id: "1", name: "Impressions" },
    { id: "2", name: "Clicks" },
    { id: "3", name: "Conversions" },
    { id: "4", name: "Spend" },
    { id: "5", name: "Click Through Rate(CTR)" },
    { id: "6", name: "Cost Per Acquisition(CPA)" },
  ];

  const displayMetrics =
    activeTool === "chart"
      ? metrics
      : metrics.map((metric) => ({
          ...metric,
          name: `Avg. ${metric.name}`,
        }));

  return (
    <div className="mt-4 pl-4">
      <h3 className="text-xs font-semibold text-gray-600 mb-2">Metrics</h3>
      <ul>
        {displayMetrics.map((metric) => (
          <li key={metric.id}>
            <DraggableMetric metric={metric} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MetricsList;
