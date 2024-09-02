const useChartData = () => {
  const calculateChartData = (selectedMetrics, campaigns, filters) => {
    const { dateRange, device, region } = filters;
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
      let includeCampaign = false;
      const filteredMetrics = [];

      campaign.adGroups.forEach((adGroup) => {
        adGroup.metrics.forEach((metric) => {
          const metricDate = new Date(metric.date);
          const inDateRange =
            metricDate >= new Date(dateRange[0]) &&
            metricDate <= new Date(dateRange[1]);
          const matchesDevice =
            device === "All Devices" || metric.device === device;
          const matchesRegion =
            region === "All Regions" || metric.location === region;

          if (inDateRange && matchesDevice && matchesRegion) {
            includeCampaign = true;
            filteredMetrics.push(metric);
          }
        });
      });

      if (includeCampaign) {
        labels.push(campaign.name);

        selectedMetrics.forEach((selectedMetric, index) => {
          let totalValue = 0;

          filteredMetrics.forEach((metric) => {
            const metricName = selectedMetric.name.toLowerCase();
            if (metric[metricName] !== undefined) {
              totalValue += metric[metricName];
            }
          });

          datasets[index].data.push(totalValue);
        });
      }
    });

    return {
      labels,
      datasets,
    };
  };

  return calculateChartData;
};

export default useChartData;
