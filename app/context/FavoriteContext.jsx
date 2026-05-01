"use client";
import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext(null);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading ,setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (post) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id == post.id)) return prev;
      return [...prev, post];
    });
  };

  const removeFavorite = (post) => {
    const updated = favorites.filter((item) => item.id != post.id);
    setFavorites(updated);
  };

  const removeAllFavorite = () => {
    setFavorites([]);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, removeAllFavorite , loading }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorite = () => useContext(FavoriteContext);
