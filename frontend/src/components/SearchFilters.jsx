import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchFilters = ({ searchTerm, setSearchTerm, regionFilter, setRegionFilter, languageFilter, setLanguageFilter }) => (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 w-full">
      <div className="relative w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 pr-10 w-full rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
        />
        <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white text-xl" />
      </div>
  
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Regions</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Oceania">Oceania</option>
        </select>
  
        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Languages</option>
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="spanish">Spanish</option>
          <option value="arabic">Arabic</option>
          <option value="chinese">Chinese</option>
        </select>
      </div>
    </div>
  );
  
  export default SearchFilters;
  