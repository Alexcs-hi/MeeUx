  "use client";

  import {
    useEffect,
    useState
  } from "react";

  import {fetchPosts} from '../actions/fetchPost';

  const limit = 10;



  export default function useR34Posts(pageNumber, tags) {
    
    const [posts, setPosts] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);



    useEffect(() => {


      setIsLoading(true);
      const fetchData = async () => {

        try {
          const res = await fetchPosts(pageNumber , tags , limit);

          if (typeof res == "string") {alert("You might have pasted wrong api key , please check"); return;};

          setPosts(prev => (pageNumber === 0 ? res : [...prev, ...res]));

          setHasMore(res.length === limit)

        } catch (err) {
          console.error("Fetch error:", err);
          setPosts([]);
          setHasMore(false)
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();

    }, [pageNumber, tags])

    return {
      posts,
      loading,
      hasMore
    }

  }