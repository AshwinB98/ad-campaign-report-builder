import { useCallback } from "react";

const useDropMetricHandler = (
  containerWidth,
  setCharts,
  setLayout,
  calculateChartData,
  campaigns,
  filters
) => {
  return useCallback(
    (metric, x, y) => {
      const newChart = {
        id: Date.now(),
        metric,
        type: "Bar",
        data: calculateChartData([metric], campaigns, filters),
        originalData: null,
      };

      const cols = Math.floor(containerWidth / 100);
      const gridX = Math.floor((x / containerWidth) * cols);
      const gridY = Math.floor(y / 30);

      const defaultLayout = {
        i: String(newChart.id),
        x: gridX,
        y: gridY,
        w: 5,
        h: 10,
      };

      setCharts((prevCharts) => [...prevCharts, newChart]);
      setLayout((prevLayout) => [...prevLayout, defaultLayout]);
    },
    [
      containerWidth,
      setCharts,
      setLayout,
      calculateChartData,
      campaigns,
      filters,
    ]
  );
};

export default useDropMetricHandler;
