const chartOptions = (chartType, handleElementClick) => {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      if (handleElementClick && elements.length > 0) {
        handleElementClick(event, elements);
      }
    },
  };

  if (chartType === "Pie") {
    return {
      ...commonOptions,
      plugins: {
        legend: {
          position: "right",
        },
      },
    };
  }

  return {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
};

const updateChartColors = (
  chartId,
  backgroundColor,
  borderColor,
  setCharts,
  setChartColors
) => {
  setChartColors((prevColors) => ({
    ...prevColors,
    [chartId]: { backgroundColor, borderColor },
  }));

  setCharts((prevCharts) =>
    prevCharts.map((chart) =>
      chart.id === chartId
        ? {
            ...chart,
            data: {
              ...chart.data,
              datasets: chart.data.datasets.map((dataset) => ({
                ...dataset,
                backgroundColor,
                borderColor,
              })),
            },
          }
        : chart
    )
  );
};

export { chartOptions, updateChartColors };
