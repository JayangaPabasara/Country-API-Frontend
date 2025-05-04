import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import SearchFilters from "../components/SearchFilters";
import CountryList from "../components/CountryList";

const HomePage = () => {
  const BASE_URL = "https://restcountries.com/v3.1";

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");

  const name = localStorage.getItem("username") || "Explorer";

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const fetchCountries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let endpoint;

      // Determine which endpoint to use based on filters
      if (searchTerm) {
        endpoint = `${BASE_URL}/name/${encodeURIComponent(searchTerm)}`;
      } else if (regionFilter && regionFilter !== "All Regions") {
        endpoint = `${BASE_URL}/region/${encodeURIComponent(
          regionFilter.toLowerCase()
        )}`;
      } else if (currencyFilter && currencyFilter !== "All Currencies") {
        endpoint = `${BASE_URL}/all`;
      } else {
        endpoint = `${BASE_URL}/all`;
      }

      const response = await axios.get(endpoint);
      let filteredData = response.data;

      // Apply client-side filtering for languages and currencies
      if (languageFilter && languageFilter !== "All Languages") {
        filteredData = filteredData.filter((country) => {
          if (!country.languages) return false;

          const countryLanguages = Object.values(country.languages).map(
            (lang) => lang.toLowerCase()
          );

          return countryLanguages.some((lang) =>
            lang.includes(languageFilter.toLowerCase())
          );
        });
      }

      if (currencyFilter && currencyFilter !== "All Currencies") {
        filteredData = filteredData.filter((country) => {
          if (!country.currencies) return false;

          return Object.keys(country.currencies).some(
            (currencyCode) =>
              currencyCode.toLowerCase() === currencyFilter.toLowerCase()
          );
        });
      }

      setCountries(filteredData);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setError({
        message:
          error.response?.status === 404
            ? "No countries found matching your search criteria"
            : error.response?.data ||
              error.message ||
              "Failed to load countries",
      });
      setCountries([]); // Reset countries when there's an error
    } finally {
      setLoading(false);
    }
  }, [searchTerm, regionFilter, languageFilter, currencyFilter, BASE_URL]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchCountries();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [fetchCountries]);

  return (
    <>
      <Header />
      <main className="p-4 md:p-8 lg:p-10 bg-gradient-to-b from-blue-900 to-blue-800 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-xl md:text-2xl font-semibold text-center mb-8 text-white"
            data-aos="fade-up"
          >
            ⭐ Hello {name}! ⭐ Explore Countries Around The World
          </h2>

          <div data-aos="fade-up" data-aos-delay="200">
            <SearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              regionFilter={regionFilter}
              setRegionFilter={setRegionFilter}
              languageFilter={languageFilter}
              setLanguageFilter={setLanguageFilter}
              currencyFilter={currencyFilter}
              setCurrencyFilter={setCurrencyFilter}
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <CountryList
              countries={countries}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
