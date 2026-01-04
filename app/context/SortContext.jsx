"use client";
import { createContext, useContext, useEffect, useState } from "react";

const SortContext = createContext(null);

export function SortProvider({ children }) {
  const [rating, setRating] = useState("");
  const [score, setScore] = useState("");
  const [upload, setUpload] = useState("");
  
const [hydrated, setHydrated] = useState(false); 

useEffect(() => {
  setHydrated(true)
}, [])


  return (
    <SortContext.Provider value={{ rating, setRating, score, setScore, upload, setUpload , hydrated , setHydrated }}>
      {children}
    </SortContext.Provider>
  );
}

export const useSort = () => useContext(SortContext);
