import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "../context/FavoriteContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CountryCard = ({ country }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorite();
  const isFavorite = favorites.includes(country.cca2);
  const navigate = useNavigate();

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    if (isFavorite) {
      removeFavorite(country.cca2);
    } else {
      addFavorite(country.cca2);
    }
  };

  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    navigate("/details", { state: { country } });
  };

  return (
    <div
      title="Country"
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 hover:scale-105 transition-transform relative flex flex-col h-full cursor-pointer"
    >
      <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 mb-4">
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          className="w-full h-full object-contain rounded-md"
        />
        <button
          title="FavoriteBTN"
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 text-red-500 text-xl z-10"
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="flex-grow">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">
          {country.name.common}
        </h2>
        <p title="capital" className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          <span className="font-semibold">Capital:</span>{" "}
          {country.capital?.[0] || "N/A"}
        </p>
        <p title="region" className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          <span className="font-semibold">Region:</span> {country.region}
        </p>
        <p title="population" className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          <span className="font-semibold">Population:</span>{" "}
          {country.population.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;