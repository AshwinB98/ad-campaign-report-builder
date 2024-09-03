import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import DroppableCanvas from "../../app/components/DroppableCanvas";

jest.mock("../../app/atoms/canvas/ChartCard", () => ({ chart }) => (
  <div>
    {chart.metric.name}
    <select defaultValue="Bar">
      <option value="Bar">Bar</option>
      <option value="Line">Line</option>
      <option value="Pie">Pie</option>
    </select>
  </div>
));
jest.mock("../../app/hooks/useDrilldownData", () => () => jest.fn());
jest.mock("../../app/hooks/useContainerDimensions", () => () => 1000);
jest.mock("../../app/hooks/useDropMetricHandler", () => jest.fn());

describe("DroppableCanvas", () => {
  const mockCampaigns = [
    {
      campaignId: 1,
      name: "Campaign 1",
      adGroups: [
        {
          metrics: [
            {
              date: "2024-08-01",
              device: "Mobile",
              location: "US",
              spend: 100,
              conversions: 10,
            },
          ],
        },
      ],
    },
  ];

  const mockFilters = {
    dateRange: [new Date(2024, 7, 1), new Date(2024, 7, 6)],
    device: "All Devices",
    region: "All Regions",
  };

  const mockCharts = [
    {
      id: "1",
      metric: { name: "Spend" },
      data: {
        labels: ["Campaign 1"],
        datasets: [{ backgroundColor: "#000000", borderColor: "#ffffff" }],
      },
    },
  ];

  let mockSetCharts;

  beforeEach(() => {
    mockSetCharts = jest.fn();
  });

  it("renders the droppable canvas without charts", () => {
    render(
      <DndProvider backend={TestBackend}>
        <DroppableCanvas
          campaigns={mockCampaigns}
          filters={mockFilters}
          charts={[]}
          setCharts={mockSetCharts}
        />
      </DndProvider>
    );

    expect(
      screen.getByText(
        "Drag and Drop the metrics to create a customized report"
      )
    ).toBeInTheDocument();
  });

  it("renders the droppable canvas with charts", () => {
    render(
      <DndProvider backend={TestBackend}>
        <DroppableCanvas
          campaigns={mockCampaigns}
          filters={mockFilters}
          charts={mockCharts}
          setCharts={mockSetCharts}
        />
      </DndProvider>
    );

    expect(screen.getByText("Spend")).toBeInTheDocument();
  });

  it("handles metric drop", () => {
    const { getByText } = render(
      <DndProvider backend={TestBackend}>
        <DroppableCanvas
          campaigns={mockCampaigns}
          filters={mockFilters}
          charts={mockCharts}
          setCharts={mockSetCharts}
        />
      </DndProvider>
    );

    const spendElement = getByText("Spend");

    fireEvent.dragStart(spendElement);
    fireEvent.dragEnter(spendElement);
    fireEvent.dragOver(spendElement);
    fireEvent.drop(spendElement);

    expect(mockSetCharts).toHaveBeenCalled();
  });

  it("removes a chart", () => {
    render(
      <DndProvider backend={TestBackend}>
        <DroppableCanvas
          campaigns={mockCampaigns}
          filters={mockFilters}
          charts={mockCharts}
          setCharts={mockSetCharts}
        />
      </DndProvider>
    );

    fireEvent.click(screen.getByText("Spend"));
    expect(mockSetCharts).toHaveBeenCalledWith(expect.any(Function));
  });

  it("updates the chart type", () => {
    render(
      <DndProvider backend={TestBackend}>
        <DroppableCanvas
          campaigns={mockCampaigns}
          filters={mockFilters}
          charts={mockCharts}
          setCharts={mockSetCharts}
        />
      </DndProvider>
    );

    const select = screen.getByDisplayValue("Bar");
    expect(select).toBeInTheDocument();
    fireEvent.change(select, { target: { value: "Pie" } });

    expect(mockSetCharts).toHaveBeenCalledWith(expect.any(Function));
  });

  it("applies the correct chart colors on filter change", () => {
    render(
      <DndProvider backend={TestBackend}>
        <DroppableCanvas
          campaigns={mockCampaigns}
          filters={mockFilters}
          charts={mockCharts}
          setCharts={mockSetCharts}
        />
      </DndProvider>
    );

    expect(mockSetCharts).toHaveBeenCalledWith(expect.any(Function));
  });
});
