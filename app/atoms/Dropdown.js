import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Dropdown = ({ title, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(title);

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-36">
      <div
        className="flex items-center justify-between cursor-pointer px-3 py-1 text-xs font-light text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedItem}</span>
        {isOpen ? (
          <ChevronUpIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
        ) : (
          <ChevronDownIcon
            className="h-4 w-4 text-gray-500"
            aria-hidden="true"
          />
        )}
      </div>
      {isOpen && (
        <div className="origin-top-right absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 border border-gray-300">
          <ul className="py-1">
            {items.map((item) => (
              <li
                key={item}
                onClick={() => handleSelect(item)}
                className="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
