import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHeart, FaUserAlt } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoLogInOutline, IoMenu, IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");
    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [location]);

  const handleHeartClick = () => {
    toast.error("You need to login to add items to the favorite.");
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate("/");
    setShowMobileMenu(false);
  };

  return (
    <div className="relative">
      <header className="text-center py-6 bg-blue-500 dark:bg-blue-800 text-white relative">
        <h1 className="flex items-center justify-center gap-5 text-3xl font-bold">
          <img src="./world.png" alt="eacrth image" className="w-8"/>Welcome to the
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 animate-gradient">
            GlobeTrove
          </span>
          <img src="./world.png" alt="eacrth image" className="w-8"/>
        </h1>

        {/* Desktop Icons */}
        {isLoggedIn ? (
          <div
            className="absolute right-10 top-6 hidden md:block"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="flex justify-end">
              <FaUserAlt
                aria-label="usericon"
                title={userName}
                className="text-2xl font-bold cursor-pointer"
              />
            </div>
            {showDropdown && (
              <div className="mt-2 w-40 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg z-50 p-2">
                <Link
                  to="/favorites"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  <FaHeart /> Favorites
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  <HiOutlineLogout /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="absolute right-10 top-6 gap-4 items-center hidden md:flex">
            <button
              onClick={handleLoginClick}
              title="Login"
              className="text-3xl hover:scale-110 transition-transform duration-150 cursor-pointer"
            >
              <IoLogInOutline />
            </button>
            <button
              onClick={handleHeartClick}
              title="Favorites"
              className="text-2xl hover:scale-110 transition-transform duration-150 cursor-pointer"
            >
              <FaHeart />
            </button>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <button
          className="absolute right-4 top-18 md:hidden text-3xl"
          onClick={() => setShowMobileMenu(true)}
        >
          <IoMenu />
        </button>
      </header>

      {/* Mobile Sidebar Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-64 bg-white dark:bg-gray-900 h-full shadow-lg p-6 relative">
            {/* Close Icon */}
            <button
              className="absolute text-white top-4 right-4 text-2xl"
              onClick={() => setShowMobileMenu(false)}
            >
              <IoClose />
            </button>

            {/* Menu Items */}
            <div className="mt-10 space-y-4">
              {isLoggedIn ? (
                <>
                  <div className="flex text-white items-center text-2xl gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                    <span title="UserIcon"><FaUserAlt/>{userName}</span> 
                  </div>
                  <Link
                    to="/favorites"
                    className="flex text-white items-center text-2xl gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <FaHeart /> Favorites
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex text-white items-center text-2xl gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <HiOutlineLogout /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleLoginClick();
                      setShowMobileMenu(false);
                    }}
                    className="flex text-white items-center text-2xl gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <IoLogInOutline /> Login
                  </button>
                  <button
                    onClick={() => {
                      handleHeartClick();
                      setShowMobileMenu(false);
                    }}
                    className="flex text-white items-center text-2xl gap-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <FaHeart /> Favorites
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
