"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import useR34Posts from "../utils/r34-api";
import Post from "../components/Post";
import { useSearch } from "../context/SearchContext";
import { useSort } from "../context/SortContext";
import { useToolBar } from "../context/PostToolBarContext";
import { useSearchParams } from "next/navigation";

import { scoreOptions } from "../utils/options";
import { ratingOptions } from "../utils/options";
import { uploadOptions } from "../utils/options";
import { useRouter } from "next/navigation";
import FullScreenPost from "../components/FullScreenPost";
import TagList from "../components/TagList";
import TagSelect from "../components/TagSelect";
import { useTagActions } from "../context/TagActionsContext";

export default function ClientPosts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamTags = searchParams.get("tags");
  const scoreParams = searchParams.get("score");
  const ratingParams = searchParams.get("rating");
  const uploadParams = searchParams.get("upload");
  
  const [postLoading , setPostLoading] = useState(false);

  
  const [tags, setTags] = useState("");
 

  // sets the current post index for fullScreen Mode
  const [currentPost, setCurrentPost] = useState(0);

  // sets the current post object for the clicked Post
  const [currentTagPost, setCurrentTagPost] = useState();

  //set the visibility of TagList
  const { tagListVisible, setTagListVisible, tagSelectVisible, setTagSelectVisible, selectedPost, setSelectedPost , isFullScreen , setIsFullScreen } =
    useTagActions();

  const { queryList, setQueryList, executeSearch , pageNumber , setPageNumber } = useSearch();

  const { rating, setRating, score, setScore, upload, setUpload } = useSort();
  const { posts, loading, hasMore, setIsLoading } = useR34Posts(pageNumber, tags);

  const { view } = useToolBar();
  const observer = useRef(null);

  useEffect(() => {
    setPostLoading(true);
    setIsFullScreen(false);
    setPageNumber(0);
    setScore("");
    setRating("");
    setUpload("");
    setQueryList([]);

    if (searchParamTags) {
      setQueryList(
        searchParamTags
          .trim()
          .split(/[+\s]+/)
          .map((tag) => ({
            name: tag.startsWith("-") ? tag.slice(1) : tag,
            excluded: tag.startsWith("-") ? true : false,
          })),
      );
    }

    let new_score = "";
    let new_rating = "";
    let new_upload = "";

    if (scoreParams) {
      scoreOptions.forEach((option) => {
        if (encodeURIComponent(scoreParams) == encodeURIComponent(option.value)) {
          setScore(option.value);
          new_score = option.value;
        }
      });
    }

    if (ratingParams) {
      ratingOptions.forEach((option) => {
        if (encodeURIComponent(ratingParams) == encodeURIComponent(option.value)) {
          setRating(option.value);
          new_rating = option.value;
        }
      });
    }

    if (uploadParams) {
      uploadOptions.forEach((option) => {
        if (encodeURIComponent(uploadParams) == encodeURIComponent(option.value)) {
          setUpload(option.value);
          new_upload = option.value;
        }
      });
    }

    let finalTags = searchParamTags ?? "";
    if (new_score) finalTags += `+${encodeURIComponent(new_score)}`;
    if (new_rating) finalTags += `+${encodeURIComponent(new_rating)}`;
    if (new_upload) finalTags += `+${encodeURIComponent(new_upload)}`;

    setTags(finalTags);
    setPostLoading(false);
  }, [searchParams]);


  const lastPostElement = useCallback(
    (node) => {
      if (!hasMore) return;
      if (loading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setPageNumber((prev) => prev + 1);
          }, 150);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <div className='mt-0 sm:mt-7  '>
      {isFullScreen && (
        <FullScreenPost
          onClickTag={() => {
            setTagListVisible(true);
          }}
          posts={posts}
          SetIsFullScreen={setIsFullScreen}
          currentPost={currentPost}
          setCurrentPost={setCurrentPost}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      )}

      <div
        onClick={() => setTagListVisible(false)}
        className={`  ${
          tagListVisible
            ? "opacity-100 backdrop-blur-md pointer-events-auto"
            : "opacity-0 backdrop-blur-0 pointer-events-none"
        }
          fixed inset-0 sm:p-20 z-40 flex items-end justify-center transition-all duration-300  `}>
        <TagList queryList={queryList} post={selectedPost} />
      </div>

      <div
        onClick={() => setTagSelectVisible(false)}
        className={`  ${
          tagSelectVisible
            ? "opacity-100 backdrop-blur-md pointer-events-auto"
            : "opacity-0 backdrop-blur-0 pointer-events-none"
        }
          fixed inset-0 z-50 flex items-center justify-center transition-all duration-300  `}>
        <TagSelect />
      </div>

      <div
        className={`  ${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : " flex flex-col items-center gap-4  overflow-hidden  "}  `}>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post, index) =>
            posts.length === index + 3 ? (
              <div key={`${post.file_url}+${index}`} ref={lastPostElement}>
                <Post
                  key={post.id}
                  post={post}
                  SetIsFullScreen={setIsFullScreen}
                  currentPost={index}
                  setCurrentPost={setCurrentPost}
                />
              </div>
            ) : (
              <Post
                key={`${post.file_url}+${index}`}
                post={post}
                SetIsFullScreen={setIsFullScreen}
                currentPost={index}
                setCurrentPost={setCurrentPost}
              />
            ),
          )
        ) : (
          <div>{!loading && hasMore && "You might have entered wrong api key , pls try again :3"}</div>
        )}

        <div>{(loading || postLoading) && "Loading ...."}</div>
        <div>{!loading && !hasMore && posts.length <= 0 && "No posts found"}</div>
        <div className='p-2'>{!hasMore && !loading && "No More Posts found"}</div>
      </div>
    </div>
  );
}
