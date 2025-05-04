import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FavoriteContext = createContext();

const baseURL = process.env.REACT_APP_API_URL;

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(`${baseURL}/api/user/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(res.data.favorites);
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    }
  };

  const addFavorite = async (countryCode) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${baseURL}/api/user/favorite`,
        { countryCode },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFavorites((prev) => [...prev, countryCode]);
    } catch (err) {
      console.error("Add favorite failed", err);
    }
  };

  const removeFavorite = async (countryCode) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${baseURL}/api/user/favorite`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { countryCode },
      });
      setFavorites((prev) => prev.filter((code) => code !== countryCode));
    } catch (err) {
      console.error("Remove favorite failed", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, fetchFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
