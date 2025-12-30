"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import useR34Posts from "../../api/r34-api";
import Post from "../../components/Post";
import { useSearch } from "../../context/SearchContext";
import { useSort } from "../../context/SortContext";
import { useToolBar } from '../../context/PostToolBarContext';
 
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";


export default function posts() {
  const Router = useRouter();

  const {paramTags} = useParams();
  const ParameterTags = decodeURIComponent(paramTags);
  console.log(ParameterTags);
  

  const { queryList, setQueryList, isSearched, setIsSearched } = useSearch();

  const { rating, setRating ,  score, setScore , upload , setUpload } = useSort();
  const [pageNumber, setPageNumber] = useState(0);
  const [tags, setTags] = useState("");
  const { view } = useToolBar();


  const { posts, loading, hasMore } = useR34Posts(pageNumber, tags);
  const observer = useRef(null);
  const lastPostElement = useCallback(node => {
    if (!hasMore) return;
    if (loading) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setPageNumber(prev => prev + 1);
        }, 150);

      }
    })
    if (node) observer.current.observe(node)
  }, [loading]);


useEffect(() => {
  if (paramTags == "all") return;

  const decoded = decodeURIComponent(paramTags);
  const parts = decoded.split("+").filter(Boolean);

  
  setRating("");
  setScore("");
  setUpload("");

  const tagParts = [];

  for (const part of parts) {
    if (part.startsWith("rating:")) {
      setRating("+" + encodeURIComponent(part) + "+");
    } 
    else if (part.startsWith("sort:score")) {
      setScore("+" + encodeURIComponent(part) + "+");
    } 
    else if (part.startsWith("sort:updated")) {
      setUpload("+" + encodeURIComponent(part) + "+");
    } 
    else {
      tagParts.push(part);
    }
  }

  setQueryList(
    tagParts.map(tag => ({
      name: tag.replace(/^[+-]/, ""),
      excluded: tag.startsWith("-"),
    }))
  );

  setTags(decoded);
  setPageNumber(0);
}, [paramTags]);



useEffect(() => {
  if (!isSearched) return;

  setPageNumber(0);

  const base = queryList
    .map(tag => (tag.excluded ? `-${tag.name}` : tag.name))
    .join("+");

  const finalTags = base + rating + score + upload;

  if (paramTags !== finalTags) {
    Router.push(`/posts/${finalTags}`);
  }

  setTags(finalTags);
  setIsSearched(false);
}, [isSearched]);


  // useEffect(() => {

  //   if (isSearched) {

  //     setPageNumber(0) // Set page number back to 0 when searched


  //      const base = queryList
  //     .map(tag => (tag.excluded ? `-${tag.name}` : tag.name))
  //     .join("+");
 
  //     const finalTags = base + rating + score + upload;
  //     const currentPath = Router.asPath;
  //     const newPath = `/posts/${finalTags}`;
  //     if (currentPath !== newPath) Router.push(newPath);

  //     setTags(finalTags);


  //     setQueryList(ParameterTags
  //       .split(/(?=[+-])/)
  //       .filter(Boolean)
  //       .map(tag => ({
  //         name: tag.replace(/^[+-]/, ""),
  //         excluded: tag.startsWith("-") ? true : false,
  //       })));

            
  //     setIsSearched(false);

  //   }

  // }, [isSearched]);
  



  return (


    <div className="mt-0 sm:mt-7" >

      <div className={` ${view === "grid" ? "columns-1 sm:columns-2 md:columns-2 lg:columns-3  [&>div:not(:first-child)]:mt-5  " : " flex flex-col items-center gap-4 "}   overflow-hidden`}  >

        {Array.isArray(posts) && posts.length > 0 ? (posts.map((post, index) => (
          posts.length === index + 3 ? (
            
            <div key={`${post.file_url}+${index}`} ref={lastPostElement}>
              <Post key={post.id} post={post} />
            </div>

          ) : (
            <Post key={`${post.file_url}+${index}`} post={post} />
          )
        ))) : (<div>{!loading && hasMore && "You might have entered wrong api key , pls try again :3"}</div>)}

        <div>{loading && hasMore && "Loading ...."}</div>
        <div>{!loading && !hasMore && posts.length <= 0 && "No posts found"}</div>
        <div className="p-2">{!hasMore && !loading && "No More Posts found"}</div>
      </div>

    </div>



  );
}