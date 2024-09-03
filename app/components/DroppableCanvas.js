import { InboxIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ChartCard from "../atoms/canvas/ChartCard";
import useChartData from "../hooks/useChartData";
import useContainerDimensions from "../hooks/useContainerDimensions";
import useDrillDownData from "../hooks/useDrilldownData";
import useDropMetricHandler from "../hooks/useDropMetricHandler";

const DroppableCanvas = ({ campaigns, filters, charts, setCharts }) => {
  const containerRef = useRef(null);
  const containerWidth = useContainerDimensions(containerRef);
  const [layout, setLayout] = useState([]);
  const [chartColors, setChartColors] = useState({});
  const calculateChartData = useChartData();
  const calculateDrillDownData = useDrillDownData(campaigns);

  const handleDropMetric = useDropMetricHandler(
    containerWidth,
    setCharts,
    setLayout,
    calculateChartData,
    campaigns,
    filters
  );

  const [{ isOver }, drop] = useDrop({
    accept: "METRIC",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && containerRef.current) {
        const dropX =
          offset.x - containerRef.current.getBoundingClientRect().left;
        const dropY =
          offset.y - containerRef.current.getBoundingClientRect().top;
        handleDropMetric(item.metric, dropX, dropY);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const removeChart = (id) => {
    setCharts((prevCharts) => prevCharts.filter((chart) => chart.id !== id));
    setLayout((prevLayout) =>
      prevLayout.filter((item) => item.i !== String(id))
    );
    setChartColors((prevColors) => {
      const { [id]: _, ...remainingColors } = prevColors;
      return remainingColors;
    });
  };

  const updateChartType = (id, type) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) => (chart.id === id ? { ...chart, type } : chart))
    );
  };

  const handleGoBack = (id) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) => {
        if (chart.id === id && chart.originalData) {
          return {
            ...chart,
            data: chart.originalData,
            originalData: null,
          };
        }
        return chart;
      })
    );
  };

  const handleDrillDown = (metric, label, selectedCampaignId, chartId) => {
    if (
      metric.name.toLowerCase().includes("cpa") ||
      metric.name.toLowerCase().includes("ctr")
    ) {
      return;
    }

    setCharts((prevCharts) =>
      prevCharts.map((chart) => {
        if (chart.id === chartId && chart.type !== "Pie") {
          const drillDownData = calculateDrillDownData(
            metric,
            filters,
            selectedCampaignId
          );

          const customColors = chartColors[chartId];
          if (customColors) {
            drillDownData.datasets.forEach((dataset) => {
              dataset.backgroundColor = customColors.backgroundColor;
              dataset.borderColor = customColors.borderColor;
            });
          }

          return {
            ...chart,
            originalData: chart.originalData || chart.data,
            data: drillDownData,
          };
        }
        return chart;
      })
    );
  };

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  useEffect(() => {
    if (charts.length > 0) {
      setCharts((prevCharts) =>
        prevCharts.map((chart) => {
          const updatedData = calculateChartData(
            [chart.metric],
            campaigns,
            filters
          );

          const customColors = chartColors[chart.id];
          if (customColors) {
            updatedData.datasets.forEach((dataset) => {
              dataset.backgroundColor = customColors.backgroundColor;
              dataset.borderColor = customColors.borderColor;
            });
          }

          return {
            ...chart,
            data: updatedData,
          };
        })
      );
    }
  }, [filters, campaigns]);

  return (
    <div
      ref={drop}
      className={`flex-1 p-4 overflow-auto ${isOver ? "bg-blue-100" : ""}`}
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {charts.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-gray-500">
            <InboxIcon className="h-24 w-24 mb-4" />
            <p className="text-lg font-semibold">
              Drag and Drop the metrics to create a customized report
            </p>
          </div>
        ) : (
          <GridLayout
            className="layout"
            layout={layout}
            cols={Math.floor(containerWidth / 100)}
            rowHeight={30}
            width={containerWidth}
            onLayoutChange={onLayoutChange}
            draggableHandle=".drag-handle"
            compactType="vertical"
            isResizable={true}
            isDraggable={true}
          >
            {charts.map((chart) => (
              <div
                key={chart.id}
                id={`chart-${chart.id}`}
                data-grid={layout.find((item) => item.i === String(chart.id))}
              >
                <ChartCard
                  chart={chart}
                  removeChart={removeChart}
                  updateChartType={updateChartType}
                  handleGoBack={handleGoBack}
                  handleDrillDown={handleDrillDown}
                  setCharts={setCharts}
                  setChartColors={setChartColors}
                />
              </div>
            ))}
          </GridLayout>
        )}
      </div>
    </div>
  );
};

export default DroppableCanvas;
