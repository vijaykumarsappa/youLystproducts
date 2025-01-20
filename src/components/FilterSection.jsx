import { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaBatteryFull,
  FaTv,
  FaMemory,
  FaApple,
} from "react-icons/fa";

const FilterSection = ({ onFilterChange }) => {
  const [expanded, setExpanded] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleDropdown = (categoryName) => {
    setExpanded((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }));
  };

  const handleFilterChange = (category, value) => {
    const newFilters = {
      ...selectedFilters,
      [category]: value,
    };

    setSelectedFilters(newFilters);
    onFilterChange(newFilters); // Passing the updated filters
  };

  const resetFilters = () => {
    setSelectedFilters({}); // reseting filters
    onFilterChange({});
  };

  const categories = [
    {
      name: "Battery",
      icon: <FaBatteryFull className="text-blue-500" />,
      options: ["2000mAh", "3000mAh", "5000mAh"],
    },
    {
      name: "Screen Size",
      icon: <FaTv className="text-green-500" />,
      options: ["13-inch", "15-inch", "17-inch"],
    },
    {
      name: "RAM",
      icon: <FaMemory className="text-purple-500" />,
      options: ["8GB", "16GB", "32GB"],
    },
    {
      name: "Brand",
      icon: <FaApple className="text-red-500" />,
      options: ["Dell", "HP", "Apple"],
    },
  ];

  return (
    <div className="p-4 bg-gray-100 w-64">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      {categories.map((category) => (
        <div key={category.name} className="mb-4">
          {/* Category Header */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleDropdown(category.name)}
          >
            <div className="flex items-center space-x-2">
              {category.icon} {/* Category Icon */}
              <h3 className="font-medium">{category.name}</h3>
            </div>
            {expanded[category.name] ? <FaChevronUp /> : <FaChevronDown />}
          </div>

          {/* Dropdown Content */}
          {expanded[category.name] && (
            <div className="mt-2 pl-4">
              {category.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 py-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={category.name}
                    value={option}
                    checked={
                      selectedFilters[category.name.toLowerCase()] === option
                    }
                    onChange={() =>
                      handleFilterChange(category.name.toLowerCase(), option)
                    }
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Reset Filters Button */}
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md w-full hover:bg-red-600"
        onClick={resetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
