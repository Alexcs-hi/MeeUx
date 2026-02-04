"use client"

import {
  useState,
  useEffect
} from "react";

const base_url = "https://api.rule34.xxx/autocomplete.php?q=";


export default function useR34Search(query) {

  const [queries, setqueries] = useState([]);

  useEffect(() => {
    if (!query) {
      setqueries([]);
      return;
    }
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(`${base_url}${query}`, { signal: controller.signal });
        const data = await res.json();
        setqueries(data);
        
      } catch (err) {
        if (err.name != "AbortError") {
          console.error("Fetch Error :", err);
        }

      }

    }

    fetchData();


    return () => {
      controller.abort();
    };


  }, [query])





  return {
    queries
  }
}