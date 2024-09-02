import {
  ChartBarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

const iconComponents = {
  home: HomeIcon,
  "chart-bar": ChartBarIcon,
};

const NavSection = ({
  href,
  icon,
  label,
  isActive,
  isCollapsible,
  isCollapsed,
  toggleCollapse,
  items = [],
}) => {
  const IconComponent = iconComponents[icon];
  const router = useRouter();

  return (
    <li className="mb-2">
      {href ? (
        <Link
          href={href}
          className={`flex items-center space-x-2 p-2 rounded-lg ${
            isActive
              ? "bg-primary text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <IconComponent className="h-5 w-5" />
          <span className="text-sm font-semibold">{label}</span>
        </Link>
      ) : (
        <div
          className="flex items-center justify-between p-2 cursor-pointer transition-colors duration-300"
          onClick={toggleCollapse}
        >
          <div className="flex items-center space-x-2">
            <IconComponent className="h-5 w-5" />
            <span className="text-sm font-semibold">{label}</span>
          </div>
          {isCollapsible &&
            (isCollapsed ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            ))}
        </div>
      )}

      {isCollapsible && !isCollapsed && (
        <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-screen">
          <ul className="mt-2 pl-4">
            {items.map((item, index) => (
              <li key={index} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    item.isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-sm font-light">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default NavSection;
