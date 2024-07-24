// components/FilterOptions.js

'use client'; // This directive ensures the component is client-side

import React from 'react';

export default function FilterOptions({ filters, onFilterChange }) {
  const handleChange = (e) => {
    onFilterChange(e.target.name);
  };

  return (
    <div className="flex gap-5 mb-6">
      {filters.map((filter) => (
        <label key={filter.name} className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            name={filter.name}
            onChange={handleChange}
          />
          {filter.label}
        </label>
      ))}
    </div>
  );
}
