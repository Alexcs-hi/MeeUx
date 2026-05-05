"use client";
import { createContext, useContext, useState } from "react";
import { useSort } from "./SortContext";
import { useTagActions } from "./TagActionsContext";
import { useRouter } from "next/navigation";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const router = useRouter();
  const [queryList, setQueryList] = useState([]);
  const { rating, setRating, score, setScore, upload, setUpload } = useSort();
  const [pageNumber, setPageNumber] = useState(0);
  const { setTagListVisible, setIsFullScreen } = useTagActions();

  function executeSearch() {
    setIsFullScreen(false);
    setTagListVisible(false);
    setPageNumber(0);

    let base = "";

    if (queryList.length > 0) {
      base = queryList.map((tag) => (tag.excluded ? `-${tag.name}` : tag.name)).join("+");
    }

    const payload = {
      tags: base || null,
      rating: rating || null,
      score: score || null,
      upload: upload || null,
    };

    fetch("/api/logSearch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});

    const params = new URLSearchParams();

    if (base) params.set("tags", base);
    if (rating) params.set("rating", rating);
    if (score) params.set("score", score);
    if (upload) params.set("upload", upload);

    const url = `/posts${params.toString() ? `?${params.toString()}` : ""}`;

    setTimeout(() => {
      router.push(url);
    }, 450);
  }

  return (
    <SearchContext.Provider value={{ queryList, setQueryList, executeSearch, pageNumber, setPageNumber }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
