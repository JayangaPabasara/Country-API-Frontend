import React, { useEffect, useState } from "react";
import { useFavorite } from "../context/FavoriteContext";
import axios from "axios";
import { HeartOff } from "lucide-react";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { TiArrowBack } from "react-icons/ti";
import CountryCard from "../components/CountryCard";

const Favorites = () => {
  const { favorites } = useFavorite();
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all(
          favorites.map((code) =>
            axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
          )
        );
        const data = responses.map((res) => res.data[0]);
        setFavoriteCountries(data);
      } catch (err) {
        console.error("Failed to fetch country details", err);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchCountries();
    } else {
      setFavoriteCountries([]);
      setLoading(false);
    }
  }, [favorites]);

  return (
    <div className="min-h-screen px-4 py-8 max-w-7xl mx-auto dark:bg-gray-900">
      {/* Back Button */}
      <div className="flex items-center gap-90 flex-wrap mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 mb-4 sm:mb-0"
        >
          <TiArrowBack className="text-2xl mr-2" />
          Back
        </button>

        <h1
          className="text-3xl font-bold sm:text-left text-white w-full sm:w-auto"
          data-aos="fade-down"
        >
          ❤️ Your Favorite Countries ❤️
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <BeatLoader color="#4f46e5" size={60} />
        </div>
      ) : favoriteCountries.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center text-center py-20 text-gray-500"
        >
          <HeartOff size={60} className="mb-4 text-red-400" />
          <p className="text-lg">
            You haven't added any favorite countries yet.
          </p>
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-5 rounded"
          >
            Back To Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteCountries.map((country, index) => (
            <div
              key={country.cca2}
              className="transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CountryCard country={country} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
