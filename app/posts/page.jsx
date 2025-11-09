"use client";
import { useEffect, useState , useRef, useCallback } from "react";
import  useR34Posts from "../api/r34-api";
import Post from "../components/Post";
import {useSearch} from "../context/SearchContext";
import {useSort} from "../context/SortContext";



export default function posts() {

  const {queryList , setQueryList , isSearched , setIsSearched} = useSearch();
   const {rating , score , upload} = useSort();
  const [pageNumber , setPageNumber ] = useState(0);
 const [tags , setTags] = useState("");


  const {posts , loading , hasMore }  = useR34Posts(pageNumber , tags);   
  const observer = useRef(null);
  const lastPostElement = useCallback(node => {   
    if (!hasMore) return;
    if (loading) return;
 
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting ){
        setPageNumber(prev => prev + 1);
      }
    } )
    if (node) observer.current.observe(node)
  }, [loading]);


  useEffect(() => {
    if (isSearched){
      setPageNumber(0) // Set page number back to 0 when searched 
      setTags(
      queryList
        .map(tag => (tag.excluded ? `-${tag.name}` : tag.name))
        .join("+")
    );
    setTags(prev => prev  +  rating + score + upload);

    setIsSearched(false);
    
    }

}, [isSearched]);

  

    return (
        <div className="flex flex-col items-center justify-between gap-4    ">
            { Array.isArray(posts) &&  posts.length > 0 ? ( posts.map((post , index) => (
              posts.length === index + 1 ?(
                <div key={`${post.file_url}+${index}`} ref={lastPostElement}> <Post key={post.id} post = {post} /></div>
               
              ) : ( 
                <Post key={post.id} post = {post} />
              )
           ))) : (<div>{!loading && hasMore && "You might have entered wrong api key , pls try again :3"}</div>)}

          <div>{loading && hasMore && "Loading ...." }</div>
          <div>{ !loading && !hasMore && posts.length <= 0 && "No posts found"}</div>
          <div className="p-2">{ !hasMore &&  !loading && "No More Posts found"}</div>
        </div>  
    );
}