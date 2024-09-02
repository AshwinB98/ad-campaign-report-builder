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

export default chartOptions;
