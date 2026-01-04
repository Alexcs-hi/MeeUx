"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import useR34Posts from "../api/r34-api";
import Post from "../components/Post";
import { useSearch } from "../context/SearchContext";
import { useSort } from "../context/SortContext";
import { useToolBar } from '../context/PostToolBarContext';
import { useSearchParams } from "next/navigation";



import { scoreOptions } from "../utils/options";
import { ratingOptions } from "../utils/options";
import { uploadOptions } from "../utils/options";
import { useRouter } from "next/navigation";



export default function ClientPosts() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamTags = searchParams.get("tags");
  const scoreParams = searchParams.get("score");
  const ratingParams = searchParams.get("rating");
  const uploadParams = searchParams.get("upload");




  const [pageNumber, setPageNumber] = useState(0);
  const [tags, setTags] = useState("");


  const { queryList, setQueryList, isSearched, setIsSearched } = useSearch();

  const { rating, setRating, score, setScore, upload, setUpload } = useSort();
  const { posts, loading, hasMore } = useR34Posts(pageNumber, tags);


  const { view } = useToolBar();
  const observer = useRef(null);


  useEffect(() => {
    
    setScore("");
    setRating("");
    setUpload("");
    setQueryList([]);

 

    if (searchParamTags) {
      setQueryList(searchParamTags.trim().split(/[+\s]+/).map(
        tag => ({
          name: tag.startsWith("-") ? tag.slice(1) : tag,
          excluded: tag.startsWith('-') ? true : false,
        })
      ))
    }


    let new_score = '';
    let new_rating = '';
    let new_upload = '';

    if (scoreParams) {
      scoreOptions.forEach(option => {
        if (encodeURIComponent(scoreParams) == encodeURIComponent(option.value)) {

          setScore(option.value);
          new_score = option.value;
        }
      })
    }

    if (ratingParams) {


      ratingOptions.forEach(option => {


        if (encodeURIComponent(ratingParams) == encodeURIComponent(option.value)) {
          setRating(option.value);
          new_rating = option.value;
        }
      })
    }

    if (uploadParams) {
      uploadOptions.forEach(option => {
        if (encodeURIComponent(uploadParams) == encodeURIComponent(option.value)) { 
          setUpload(option.value);
          new_upload = option.value;
        }
      })
    }

    let finalTags = searchParamTags ?? "";
    if (new_score) finalTags += `+${encodeURIComponent(new_score)}`
    if (new_rating) finalTags += `+${encodeURIComponent(new_rating)}`
    if (new_upload) finalTags += `+${encodeURIComponent(new_upload)}`
 
    setTags(finalTags);   

  }, [searchParams]);


  useEffect(() => {

    if (!isSearched) return;
    let base = "";
    setPageNumber(0);
    if (queryList.length > 0) {
      base = queryList
        .map(tag => (tag.excluded ? `-${tag.name}` : tag.name))
        .join("+");
    
    }

 const params = new URLSearchParams();

if (base) params.set("tags", base);
if (rating) params.set("rating", rating);
if (score) params.set("score", score);
if (upload) params.set("upload", upload);

const url = `/posts${params.toString() ? `?${params.toString()}` : ""}`;

router.push(url);
setIsSearched(false);

  }, [isSearched])






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




  return (


    <div className="mt-0 sm:mt-7  " >



      <div className={`   ${view === "grid" ? "columns-1 sm:columns-2 md:columns-2 lg:columns-3  [&>div:not(:first-child)]:mt-5  " : " flex flex-col items-center gap-4 "}   overflow-hidden  `}  >

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