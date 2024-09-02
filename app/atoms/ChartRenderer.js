import "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";
import chartOptions from "../utils/ChartOptions";

const ChartRenderer = ({ chart }) => {
  const ChartComponent =
    chart.type === "Bar" ? Bar : chart.type === "Line" ? Line : Pie;

  return (
    <div
      className={chart.type === "Pie" ? "h-96 w-96 mx-auto" : "w-full"}
      style={chart.type === "Pie" ? { position: "relative" } : {}}
    >
      <ChartComponent data={chart.data} options={chartOptions(chart.type)} />
    </div>
  );
};

export default ChartRenderer;
