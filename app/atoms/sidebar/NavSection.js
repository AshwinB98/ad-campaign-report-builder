import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const iconComponents = {
  home: HomeIcon,
};

const NavSection = ({ href, icon, label, isActive }) => {
  const IconComponent = iconComponents[icon];

  return (
    <li className="mb-2">
      <Link
        href={href}
        className={`flex items-center space-x-2 p-2 rounded-lg bg-primary text-white`}
      >
        <IconComponent className="h-5 w-5" />
        <span className="text-sm font-semibold">{label}</span>
      </Link>
    </li>
  );
};

export default NavSection;
