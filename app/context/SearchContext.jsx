"use client";
import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);

export  function SearchProvider({ children }) {
  const [queryList, setQueryList] = useState([]);
  const [isSearched , setIsSearched] = useState(false)
  return (
    <SearchContext.Provider value={{ queryList, setQueryList , isSearched  , setIsSearched}}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
