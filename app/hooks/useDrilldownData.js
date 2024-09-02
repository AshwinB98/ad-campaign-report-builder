const useDrillDownData = (campaigns) => {
  const calculateDrillDownData = (metric, filters, selectedCampaignId) => {
    const labels = [];
    const datasets = [
      {
        label: `Total ${metric.name}`,
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
      },
    ];

    const metricKey = metric.name.toLowerCase();
    const datesMap = {};

    const selectedCampaign = campaigns.find(
      (campaign) => campaign.campaignId === selectedCampaignId
    );

    if (!selectedCampaign) {
      return { labels, datasets };
    }

    selectedCampaign.adGroups.forEach((adGroup) => {
      adGroup.metrics.forEach((m) => {
        const isWithinDateRange =
          new Date(m.date) >= new Date(filters.dateRange[0]) &&
          new Date(m.date) <= new Date(filters.dateRange[1]);

        const isDeviceMatch =
          filters.device === "All Devices" || m.device === filters.device;

        const isRegionMatch =
          filters.region === "All Regions" || m.location === filters.region;

        if (isWithinDateRange && isDeviceMatch && isRegionMatch) {
          if (!datesMap[m.date]) {
            datesMap[m.date] = 0;
          }
          if (m[metricKey] !== undefined) {
            datesMap[m.date] += m[metricKey];
          }
        }
      });
    });

    for (const [date, totalValue] of Object.entries(datesMap)) {
      labels.push(date);
      datasets[0].data.push(totalValue);
    }
    return { labels, datasets };
  };

  return calculateDrillDownData;
};

export default useDrillDownData;
