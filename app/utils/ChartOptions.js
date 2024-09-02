const chartOptions = (chartType) => {
  if (chartType === "Pie") {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
        },
      },
    };
  }

  return {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
};

export default chartOptions;
