  "use client";

  import {
    useEffect,
    useState
  } from "react";
 
  const limit = 20;

  export default function useR34Posts(pageNumber, tags) {
    
    const [posts, setPosts] = useState([]); 
    const [loading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);


     // If you're using offline use this url and remove the below one
    // const credentials = process.env.R34_CREDENTIALS;
    // const url = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&pid=${pageNumber}&limit=${limit}&tags=${tags}&${credentials}`;


    //remove this url with the above one for offline use 
    const url = `https://fetch-posts.alexcs-hello.workers.dev/?query=${encodeURIComponent(tags)}&page=${pageNumber}&limit=${limit} `;

    useEffect(() => {


      setIsLoading(true);
      const fetchData = async () => {

        try {
            const res = await fetch(url);
           
        let data;

          try {
            data = await res.json();
          } catch (err) {
            console.log("JSON ERROR :", err);
            data = [];
          }


          if (typeof data == "string") return "You might have pasted wrong api key , please check";
         


          setPosts(prev => (pageNumber === 0 ? data : [...prev, ...data]));

          setHasMore(data.length === limit)

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