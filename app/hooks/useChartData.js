import {
  calculateCPA,
  calculateCTR,
  getBackgroundColor,
  getBorderColor,
} from "../utils/common";

const useChartData = () => {
  const calculateChartData = (selectedMetrics, campaigns, filters) => {
    const { dateRange, device, region } = filters;

    const datasets = selectedMetrics.map((metric) => ({
      label: metric.name,
      data: [],
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      borderWidth: 1,
    }));

    const result = campaigns.reduce(
      (acc, campaign) => {
        const { totalMetrics, hasData } = campaign.adGroups.reduce(
          (adGroupAcc, adGroup) => {
            const filteredMetrics = adGroup.metrics.filter((metric) =>
              isMetricMatchingFilters(metric, dateRange, device, region)
            );

            return filteredMetrics.reduce(
              (metricsAcc, metric) => ({
                totalMetrics: aggregateMetrics(metricsAcc.totalMetrics, metric),
                hasData: true,
              }),
              adGroupAcc
            );
          },
          {
            totalMetrics: {
              spend: 0,
              conversions: 0,
              clicks: 0,
              impressions: 0,
            },
            hasData: false,
          }
        );

        if (hasData) {
          acc.labels.push(campaign.name);
          acc.campaignIds.push(campaign.campaignId);
          updateDatasetData(datasets, selectedMetrics, totalMetrics);
        }

        return acc;
      },
      { labels: [], campaignIds: [] }
    );

    return {
      labels: result.labels,
      datasets,
      campaignIds: result.campaignIds,
    };
  };

  return calculateChartData;
};

export default useChartData;

const isMetricMatchingFilters = (metric, dateRange, device, region) => {
  const metricDate = new Date(metric.date);
  const inDateRange =
    metricDate >= new Date(dateRange[0]) &&
    metricDate <= new Date(dateRange[1]);
  const matchesDevice = device === "All Devices" || metric.device === device;
  const matchesRegion = region === "All Regions" || metric.location === region;

  return inDateRange && matchesDevice && matchesRegion;
};

const aggregateMetrics = (totalMetrics, metric) => ({
  spend: totalMetrics.spend + (metric.spend || 0),
  conversions: totalMetrics.conversions + (metric.conversions || 0),
  clicks: totalMetrics.clicks + (metric.clicks || 0),
  impressions: totalMetrics.impressions + (metric.impressions || 0),
});

const updateDatasetData = (datasets, selectedMetrics, totalMetrics) => {
  selectedMetrics.forEach((selectedMetric, index) => {
    let value = 0;
    const metricName = selectedMetric.name.toLowerCase();

    if (metricName.includes("cpa")) {
      value = calculateCPA(totalMetrics.spend, totalMetrics.conversions);
    } else if (metricName.includes("ctr")) {
      value = calculateCTR(totalMetrics.clicks, totalMetrics.impressions);
    } else if (metricName.includes("spend")) {
      value = totalMetrics.spend;
    } else if (metricName.includes("conversions")) {
      value = totalMetrics.conversions;
    } else if (metricName.includes("clicks")) {
      value = totalMetrics.clicks;
    } else if (metricName.includes("impressions")) {
      value = totalMetrics.impressions;
    }

    datasets[index].data.push(value);
  });
};
