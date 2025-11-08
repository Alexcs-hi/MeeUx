"use client";
import { createContext, useContext, useState } from "react";

const SortContext = createContext(null);

export function SortProvider({ children }) {
  const [rating, setRating] = useState("");
  const [score, setScore] = useState("");
  const [upload, setUpload] = useState("");
  return (
    <SortContext.Provider value={{ rating, setRating, score, setScore, upload, setUpload }}>
      {children}
    </SortContext.Provider>
  );
}

export const useSort = () => useContext(SortContext);
