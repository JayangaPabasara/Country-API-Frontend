import React, { useEffect, useState } from "react";
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

  const name = localStorage.getItem("username");

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      let response;

      if (searchTerm) {
        response = await axios.get(`${BASE_URL}/name/${searchTerm}`);
      } else if (regionFilter) {
        response = await axios.get(`${BASE_URL}/region/${regionFilter}`);
      } else {
        response = await axios.get(`${BASE_URL}/all`);
      }

      let data = response.data;

      if (languageFilter) {
        data = data.filter((country) =>
          country.languages
            ? Object.values(country.languages)
                .map((lang) => lang.toLowerCase())
                .includes(languageFilter.toLowerCase())
            : false
        );
      }

      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchCountries();
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchTerm, regionFilter, languageFilter]);

  return (
    <>
      <Header />
      <main className="p-4 md:p-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800 dark:text-gray-100">
          🌟 Hello {name}! 🌟 Explore Countries Around The World
        </h1>

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          regionFilter={regionFilter}
          setRegionFilter={setRegionFilter}
          languageFilter={languageFilter}
          setLanguageFilter={setLanguageFilter}
        />

        <CountryList countries={countries} loading={loading} error={error} />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
