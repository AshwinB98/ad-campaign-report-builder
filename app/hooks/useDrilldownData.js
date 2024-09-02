import { getBackgroundColor, getBorderColor } from "../utils/common";

const useDrillDownData = (campaigns) => {
  const calculateDrillDownData = (metric, filters, selectedCampaignId) => {
    const labels = [];
    const datasets = [
      {
        label: `Total ${metric.name}`,
        data: [],
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor(),
        borderWidth: 1,
      },
    ];

    const metricKey = metric.name.toLowerCase();
    const datesMap = {};

    const selectedCampaign = campaigns.find(
      (campaign) => campaign.campaignId === selectedCampaignId
    );

    if (!selectedCampaign) return { labels, datasets };

    selectedCampaign.adGroups.forEach(({ metrics }) =>
      metrics.forEach((m) => {
        if (isMetricMatchingFilters(m, filters)) {
          datesMap[m.date] = datesMap[m.date] || 0;

          if (m[metricKey] !== undefined) {
            datesMap[m.date] += m[metricKey] || 0;
          }
        }
      })
    );

    Object.entries(datesMap).forEach(([date, totalValue]) => {
      labels.push(date);
      datasets[0].data.push(totalValue);
    });

    return { labels, datasets };
  };

  return calculateDrillDownData;
};

export default useDrillDownData;

const isMetricMatchingFilters = ({ date, device, location }, filters) => {
  const metricDate = new Date(date);
  const { dateRange, device: filterDevice, region: filterRegion } = filters;

  return (
    metricDate >= new Date(dateRange[0]) &&
    metricDate <= new Date(dateRange[1]) &&
    (filterDevice === "All Devices" || device === filterDevice) &&
    (filterRegion === "All Regions" || location === filterRegion)
  );
};
