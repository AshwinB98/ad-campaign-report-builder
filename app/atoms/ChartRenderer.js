import "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";
import chartOptions from "../utils/ChartOptions";

const ChartRenderer = ({ chart, onDrillDown }) => {
  const ChartComponent =
    chart.type === "Bar" ? Bar : chart.type === "Line" ? Line : Pie;
  const handleElementClick = (event, elements) => {
    if (elements.length > 0 && chart.type !== "Pie") {
      const index = elements[0]?.index;

      const label = chart?.data?.labels?.[index];
      const selectedCampaignId = chart?.data?.campaignIds?.[index];

      if (label !== undefined && selectedCampaignId !== undefined) {
        onDrillDown(chart.metric, label, selectedCampaignId);
      }
    }
  };

  return (
    <div
      className={chart.type === "Pie" ? "h-96 w-96 mx-auto" : "w-full"}
      style={chart.type === "Pie" ? { position: "relative" } : {}}
    >
      <ChartComponent
        data={chart.data}
        options={chartOptions(chart.type, handleElementClick)}
        width={null}
        height={null}
        className="h-full w-full"
      />
    </div>
  );
};

export default ChartRenderer;
