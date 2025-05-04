// Imports essential React hooks and components from libraries
import React, { useState } from "react";
import { FiSearch, FiGlobe, FiX } from "react-icons/fi";
import { MdTranslate, MdCurrencyExchange } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { IoFilter } from "react-icons/io5";

// Component to handle search term and filters (region, language, currency)
const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  regionFilter,
  setRegionFilter,
  languageFilter,
  setLanguageFilter,
  currencyFilter,
  setCurrencyFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setRegionFilter("");
    setLanguageFilter("");
    setCurrencyFilter("");
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchTerm || regionFilter || languageFilter || currencyFilter;

  return (
    <div className="mb-8 w-full">
      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 pr-10 w-full rounded-lg border border-blue-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all dark:bg-gray-800 dark:text-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <IoIosCloseCircle size={20} />
            </button>
          )}
          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400 text-xl" />
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2 min-w-[180px]">
          <FiGlobe className="text-xl text-blue-500 dark:text-blue-400" />
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border border-blue-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all w-full bg-white dark:bg-gray-800 dark:text-white appearance-none cursor-pointer"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%232563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>\')',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              paddingRight: "30px",
            }}
          >
            <option value="">All Regions</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {/* Language Filter */}
        <div className="flex items-center gap-2 min-w-[180px]">
          <MdTranslate className="text-xl text-blue-500 dark:text-blue-400" />
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border border-blue-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all w-full bg-white dark:bg-gray-800 dark:text-white appearance-none cursor-pointer"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%232563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>\')',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              paddingRight: "30px",
            }}
          >
            <option value="">All Languages</option>
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
            <option value="arabic">Arabic</option>
            <option value="chinese">Chinese</option>
          </select>
        </div>

        {/* Currency Filter */}
        <div className="flex items-center gap-2 min-w-[180px]">
          <MdCurrencyExchange className="text-xl text-blue-500 dark:text-blue-400" />
          <select
            value={currencyFilter}
            onChange={(e) => setCurrencyFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border border-blue-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all w-full bg-white dark:bg-gray-800 dark:text-white appearance-none cursor-pointer"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%232563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>\')',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              paddingRight: "30px",
            }}
          >
            <option value="">All Currencies</option>
            <option value="usd">USD - US Dollar</option>
            <option value="eur">EUR - Euro</option>
            <option value="gbp">GBP - British Pound</option>
            <option value="inr">INR - Indian Rupee</option>
            <option value="jpy">JPY - Japanese Yen</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors whitespace-nowrap font-medium dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-200"
          >
            <FiX className="text-lg" />
            Clear All
          </button>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 pr-16 w-full rounded-lg border border-blue-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all dark:bg-gray-800 dark:text-white shadow-md"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <IoIosCloseCircle size={20} />
            </button>
          )}
          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400 text-xl" />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md w-full"
          >
            <IoFilter />
            Filters
            {hasActiveFilters && (
              <span className="bg-white text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {(regionFilter ? 1 : 0) +
                  (languageFilter ? 1 : 0) +
                  (currencyFilter ? 1 : 0)}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors whitespace-nowrap font-medium dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-200 shadow-md"
            >
              <FiX className="text-lg" />
              Clear All
            </button>
          )}
        </div>

        {isOpen && (
          <div className="space-y-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md animate-fadeIn">
            {/* Region Filter */}
            <div className="flex items-center gap-2">
              <FiGlobe className="text-xl text-blue-500 dark:text-blue-400" />
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="px-4 py-3 rounded-lg border border-blue-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all w-full bg-white dark:bg-gray-800 dark:text-white appearance-none cursor-pointer"
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%232563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>\')',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                  paddingRight: "30px",
                }}
              >
                <option value="">All Regions</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>

            {/* Language Filter */}
            <div className="flex items-center gap-2">
              <MdTranslate className="text-xl text-blue-500 dark:text-blue-400" />
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="px-4 py-3 rounded-lg border border-blue-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all w-full bg-white dark:bg-gray-800 dark:text-white appearance-none cursor-pointer"
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%232563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>\')',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                  paddingRight: "30px",
                }}
              >
                <option value="">All Languages</option>
                <option value="english">English</option>
                <option value="french">French</option>
                <option value="spanish">Spanish</option>
                <option value="arabic">Arabic</option>
                <option value="chinese">Chinese</option>
              </select>
            </div>

            {/* Currency Filter */}
            <div className="flex items-center gap-2">
              <MdCurrencyExchange className="text-xl text-blue-500 dark:text-blue-400" />
              <select
                value={currencyFilter}
                onChange={(e) => setCurrencyFilter(e.target.value)}
                className="px-4 py-3 rounded-lg border border-blue-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all w-full bg-white dark:bg-gray-800 dark:text-white appearance-none cursor-pointer"
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%232563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>\')',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                  paddingRight: "30px",
                }}
              >
                <option value="">All Currencies</option>
                <option value="usd">USD - US Dollar</option>
                <option value="eur">EUR - Euro</option>
                <option value="gbp">GBP - British Pound</option>
                <option value="inr">INR - Indian Rupee</option>
                <option value="jpy">JPY - Japanese Yen</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
