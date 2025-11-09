  "use client";

  import {
    useEffect,
    useState
  } from "react";

  // PASTE YOUR GENERATED KEY HERE AND DO NOT SHARE IT 
  const user_id_key = "YOU GENERATED KEY HERE";
  //--------------------------------------------


  const base_url = "https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1";
  const limit = 10;



  export default function useR34Posts(pageNumber, tags) {
    const [posts, setPosts] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);



    useEffect(() => {

      if (user_id_key === "") {
        window.alert("Please Paste the Genrated Key in app/api/r34-api.js")
        return;
      }

      setIsLoading(true);
      const fetchData = async () => {

        try {

          const res = await fetch(`${base_url}${user_id_key}&json=1&pid=${pageNumber}&limit=${limit}&tags=${tags}`);
          if (!res.ok) throw new Error(`HTTP error: ${res.status}`);


          let data;
          try {
            data = await res.json();
          } catch (err) {
            console.log("JSON ERROR :", err);
            data = null;
          }


          if (typeof data == "string") alert("You might have pasted wrong api key , please check");


          setPosts(prev => (pageNumber === 0 ? data : [...prev, ...data]));
          setHasMore(data.length === limit);

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