import React, { useState } from "react";
import Navbar from "./components/Navbar";
import FilterSection from "./components/FilterSection";
import ProductListing from "./components/ProductListing";

const App = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(0);
  };

  return (
    <div className="flex flex-col h-screen">
      {/*  For Navigation bar */}
      <Navbar />
      <div className="flex flex-col lg:flex-row flex-1">
        {/* For Left side filter section */}
        <div className="w-full lg:w-1/4 bg-gray-100 p-4">
          <FilterSection onFilterChange={handleFilterChange} />
        </div>

        {/* For Right side product listing */}
        <div className="w-full lg:w-3/4 p-4">
          <ProductListing
            filters={filters}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
