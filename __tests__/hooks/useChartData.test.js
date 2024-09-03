import useChartData from "../../app/hooks/useChartData";
import {
  calculateCPA,
  calculateCTR,
  getBackgroundColor,
  getBorderColor,
} from "../../app/utils/common";

jest.mock("../../app/utils/common", () => ({
  calculateCPA: jest.fn(),
  calculateCTR: jest.fn(),
  getBackgroundColor: jest.fn(),
  getBorderColor: jest.fn(),
}));

describe("useChartData", () => {
  const filters = {
    dateRange: [new Date(2024, 7, 1), new Date(2024, 7, 6)],
    device: "All Devices",
    region: "All Regions",
  };

  const campaigns = [
    {
      campaignId: "1",
      name: "Campaign 1",
      adGroups: [
        {
          metrics: [
            {
              date: "2024-08-02",
              spend: 100,
              conversions: 10,
              clicks: 50,
              impressions: 1000,
              device: "Mobile",
              location: "USA",
            },
            {
              date: "2024-08-03",
              spend: 200,
              conversions: 20,
              clicks: 100,
              impressions: 2000,
              device: "Desktop",
              location: "USA",
            },
          ],
        },
      ],
    },
    {
      campaignId: "2",
      name: "Campaign 2",
      adGroups: [
        {
          metrics: [
            {
              date: "2024-08-02",
              spend: 150,
              conversions: 15,
              clicks: 75,
              impressions: 1500,
              device: "Mobile",
              location: "Canada",
            },
          ],
        },
      ],
    },
  ];

  const selectedMetrics = [
    { name: "Spend" },
    { name: "Conversions" },
    { name: "Clicks" },
    { name: "Impressions" },
    { name: "CPA" },
    { name: "CTR" },
  ];

  beforeEach(() => {
    getBackgroundColor.mockReturnValue("rgba(0, 0, 0, 0.1)");
    getBorderColor.mockReturnValue("rgba(0, 0, 0, 0.5)");
    calculateCPA.mockReturnValue(10);
    calculateCTR.mockReturnValue(5);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return correct chart data", () => {
    const calculateChartData = useChartData();
    const chartData = calculateChartData(selectedMetrics, campaigns, filters);

    expect(chartData.labels).toEqual(["Campaign 1", "Campaign 2"]);
    expect(chartData.campaignIds).toEqual(["1", "2"]);
    expect(chartData.datasets).toHaveLength(selectedMetrics.length);

    chartData.datasets.forEach((dataset, index) => {
      expect(dataset.label).toEqual(selectedMetrics[index].name);
      expect(dataset.backgroundColor).toEqual("rgba(0, 0, 0, 0.1)");
      expect(dataset.borderColor).toEqual("rgba(0, 0, 0, 0.5)");
      expect(dataset.data).toHaveLength(2);
    });

    expect(chartData.datasets[0].data).toEqual([300, 150]);
    expect(chartData.datasets[1].data).toEqual([30, 15]);
    expect(chartData.datasets[2].data).toEqual([150, 75]);
    expect(chartData.datasets[3].data).toEqual([3000, 1500]);
    expect(chartData.datasets[4].data).toEqual([10, 10]);
    expect(chartData.datasets[5].data).toEqual([5, 5]);
  });

  it("should handle empty campaigns and metrics", () => {
    const calculateChartData = useChartData();
    const chartData = calculateChartData([], [], filters);

    expect(chartData.labels).toEqual([]);
    expect(chartData.datasets).toEqual([]);
    expect(chartData.campaignIds).toEqual([]);
  });

  it("should handle missing metric values", () => {
    const modifiedCampaigns = [
      {
        ...campaigns[0],
        adGroups: [
          {
            metrics: [
              {
                ...campaigns[0].adGroups[0].metrics[0],
                spend: null,
                conversions: null,
                clicks: null,
                impressions: null,
              },
            ],
          },
        ],
      },
    ];

    const calculateChartData = useChartData();
    const chartData = calculateChartData(
      selectedMetrics,
      modifiedCampaigns,
      filters
    );

    expect(chartData.labels).toEqual(["Campaign 1"]);
    expect(chartData.datasets[0].data).toEqual([0]); // Spend
    expect(chartData.datasets[1].data).toEqual([0]); // Conversions
    expect(chartData.datasets[2].data).toEqual([0]); // Clicks
    expect(chartData.datasets[3].data).toEqual([0]); // Impressions
  });
});
