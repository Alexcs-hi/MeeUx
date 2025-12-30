"use client";

import { useEffect, useState } from "react";

const limit = 20;

export default function useR34Posts(pageNumber, tags) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch("/api/r34", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pageNumber, tags }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        setPosts(prev =>
          pageNumber === 0 ? data.posts : [...prev, ...data.posts]
        );

        setHasMore(data.hasMore);
      } catch (err) {
        console.error(err);
        setPosts([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNumber, tags]);

  return { posts, loading, hasMore };
}
