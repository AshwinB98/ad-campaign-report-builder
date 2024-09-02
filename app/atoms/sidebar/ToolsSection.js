import {
  CreditCardIcon,
  PresentationChartLineIcon,
  WrenchIcon,
} from "@heroicons/react/24/solid";

const ToolsSection = ({ activeTool, setActiveTool }) => {
  return (
    <li className="mt-2">
      <div className="flex items-center p-2">
        <WrenchIcon className="h-5 w-5 font-semibold text-gray-700" />
        <span className="text-sm font-semibold ml-2">Tools</span>
      </div>
      <div className="flex space-x-2 mt-1 pl-8">
        <div
          className={`cursor-pointer p-1 rounded-lg ${
            activeTool === "chart"
              ? "border-2 border-blue-500"
              : "hover:border-2 hover:border-blue-500"
          }`}
          onClick={() => setActiveTool("chart")}
        >
          <PresentationChartLineIcon className="h-6 w-6 text-gray-700" />
        </div>
        <div
          className={`cursor-pointer p-1 rounded-lg ${
            activeTool === "card"
              ? "border-2 border-blue-500"
              : "hover:border-2 hover:border-blue-500"
          }`}
          onClick={() => setActiveTool("card")}
        >
          <CreditCardIcon className="h-6 w-6 text-gray-700" />
        </div>
      </div>
    </li>
  );
};

export default ToolsSection;
