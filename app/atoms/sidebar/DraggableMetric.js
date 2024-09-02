import {
  ChartBarIcon,
  CurrencyDollarIcon,
  CursorArrowRippleIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useDrag } from "react-dnd";

const metricIcons = {
  Impressions: EyeIcon,
  Clicks: CursorArrowRippleIcon,
  Conversions: CurrencyDollarIcon,
  Spend: CurrencyDollarIcon,
  CTR: ChartBarIcon,
  CPA: CurrencyDollarIcon,
};

const DraggableMetric = ({ metric }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "METRIC",
    item: { metric },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const IconComponent = metricIcons[metric.name] || ChartBarIcon;

  return (
    <div
      ref={drag}
      className={`mb-2 p-2 rounded-md bg-white border border-blue-500 text-gray-800 cursor-pointer flex items-center space-x-2 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <IconComponent className="h-4 w-4 text-blue-500" />
      <span className="text-xs font-medium">{metric.name}</span>
    </div>
  );
};

export default DraggableMetric;
