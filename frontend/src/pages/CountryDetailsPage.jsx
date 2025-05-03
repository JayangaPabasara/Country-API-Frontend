import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

const CountryDetailsPage = () => {
  const location = useLocation();
  const country = location.state?.country;
  const navigate = useNavigate();

  if (!country) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-xl">
        No country data provided.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-6 text-blue-600 hover:text-blue-800 dark:text-blue-400"
      >
        <TiArrowBack className="text-2xl mr-2" />
        Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-10 max-w-4xl mx-auto">
        {/* Flag & Name */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={country.flags?.svg}
            alt={`${country.name.common} Flag`}
            className="w-40 h-28 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {country.name?.common}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">
              Official Name: {country.name?.official}
            </p>
          </div>
        </div>

        {/* Country Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 mt-8 text-sm sm:text-base">
          <p>
            <span className="font-semibold">Capital:</span>{" "}
            {country.capital?.[0] || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Subregion:</span>{" "}
            {country.subregion || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Area:</span>{" "}
            {country.area.toLocaleString()} km²
          </p>
          <p>
            <span className="font-semibold">Timezones:</span>{" "}
            {country.timezones?.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Currencies:</span>{" "}
            {country.currencies
              ? Object.values(country.currencies)
                  .map((cur) => `${cur.name} (${cur.symbol})`)
                  .join(", ")
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Languages:</span>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A"}
          </p>
        </div>

        {/* Extra Info */}
        {country.independent !== undefined && (
          <p className="mt-6">
            <span className="font-semibold">Independence:</span>{" "}
            {country.independent ? "Yes" : "No"}
          </p>
        )}

        {country.coatOfArms?.svg && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Coat of Arms</h2>
            <img
              src={country.coatOfArms.svg}
              alt="Coat of Arms"
              className="w-32 h-32 mx-auto object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetailsPage;
