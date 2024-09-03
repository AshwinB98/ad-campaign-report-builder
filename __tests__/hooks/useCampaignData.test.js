import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import { useCampaignData } from "../../app/hooks/useCampaignData";

jest.mock("axios");

describe("useCampaignData", () => {
  const mockData = {
    campaigns: [
      {
        campaignId: "cmp1",
        name: "Summer Sale 2024",
        adGroups: [
          {
            adGroupId: "ag1",
            name: "Google Ads - Search",
            metrics: [
              {
                date: "2024-08-01",
                device: "mobile",
                location: "USA",
                impressions: 15000,
                clicks: 1200,
                conversions: 100,
                spend: 500,
              },
            ],
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return data when the API call is successful", async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useCampaignData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockData.campaigns);
    expect(result.current.error).toBe(null);
  });

  it("should return an error when the API call fails", async () => {
    const errorMessage = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useCampaignData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBe(null);
    expect(result.current.error.message).toBe(errorMessage);
  });
});
