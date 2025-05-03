import { BeatLoader } from "react-spinners";
import CountryCard from "./CountryCard";

const CountryList = ({ countries, loading, error }) => {
    if (loading)
      return (
        <div className="flex justify-center items-center h-[50vh]">
          <BeatLoader color="#4f46e5" size={60} />
        </div>
      );
  
    if (error)
      return (
        <div className="text-center p-20 text-red-500">
          Error loading countries: {error.message}
        </div>
      );
  
    if (countries.length === 0)
      return (
        <div className="text-center text-gray-700 dark:text-white">
          No countries match your filters.
        </div>
      );
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {countries.map((country) => (
          <div key={country.cca3} data-aos="fade-up">
            <CountryCard country={country} />
          </div>
        ))}
      </div>
    );
  };
  
  export default CountryList;
  