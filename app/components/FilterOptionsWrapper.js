// components/FilterOptionsWrapper.js

'use client'; // Ensure this component is client-side

import React, { useState } from 'react';
import FilterOptions from './FilterOptions';

export default function FilterOptionsWrapper({ initialFilters }) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (filterName) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = prevFilters.includes(filterName)
        ? prevFilters.filter((filter) => filter !== filterName)
        : [...prevFilters, filterName];

      // Update the URL with the selected filters
      const newUrl = `/?query=${encodeURIComponent('')} &filters=${encodeURIComponent(updatedFilters.join(','))}`;
      window.history.replaceState(null, '', newUrl);
      
      return updatedFilters;
    });
  };

  return (
    <FilterOptions filters={initialFilters} onFilterChange={handleFilterChange} />
  );
}
