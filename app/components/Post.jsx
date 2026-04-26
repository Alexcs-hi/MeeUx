"use client";
import { useEffect, useState } from "react";
import { saveFile } from "../utils/saveFile";
import { useFavorite } from "../context/FavoriteContext";
import { icons } from "../constants/icons";
import ToolTip from "./ToolTip";
import TagSelect from "./TagSelect";
import { useSearch } from "../context/SearchContext";


 function PostButton({ name, onClick, src , className}) {
    return (
      <ToolTip label={name}>
        <button onClick={onClick} className={`cursor-pointer p-2 rounded-xl hover:bg-gray-200/20 transition`}>
          <img className={` ${className} w-5 md:w-5 lg:w-6  grayscale invert-75`} src={src} alt={name} />
        </button>
      </ToolTip>
    );
  }

export default function Post({ post }) {
  const { queryList } = useSearch();
  const { favorites, addFavorite, removeFavorite } = useFavorite();
  const tags = post.tags.split(" ");
  const [loaded, setLoaded] = useState(false);
  const [isTagSelectVisible, setIsTagSelectVisible] = useState(false);
  const [currentTagSelect, setCurrentTagSelect] = useState("");
  const [error, setError] = useState(false);
  const [isTags, setIsTags] = useState(false);
  const url_end = post.file_url.slice(-4);

 

  useEffect(() => {
    if (isTagSelectVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isTagSelectVisible]);

  function toggleTagSelect() {
    setIsTagSelectVisible(!isTagSelectVisible);
  }

  return (
    <div className=' relative h-fit flex flex-col  gap-2 p-2 lg:p-4 border border-gray-400/30 rounded-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-black/20'>
     
      {/* display the image / video of the post */}
      <div
        style={{
          aspectRatio: `${post.width} / ${post.height}`,
        }}
        className='flex-1 relative max-h-screen overflow-auto '>
        {!loaded && !error && (
          <div className='w-full h-full top-0 left-0 absolute bg-gray-600/20 animate-pulse'/>
        )}

        {!error ? (
          url_end == ".mp4" ? (
            <video
              onLoadedMetadata={() => setLoaded(true)}
              src={post.file_url}
              poster={post.sample_url  }
              controls
              className={`transition-opacity duration-500 
            ${loaded ? "opacity-100" : "opacity-0"}`}
            />
          ) : (
            <img  
              loading='lazy'
              decoding='async'
              onError={() => setError(true)}
              onLoad={() => setLoaded(true)}
              className={`    not-first-of-type:    transition-opacity duration-500 
            ${loaded ? "opacity-100" : "opacity-0"}`}
              src={`https://image-proxy.alexcs-hello.workers.dev?url=${encodeURIComponent(post.file_url)}`}
              alt={post.id}
            />
          )
        ) : (
          <div>failed to load image/video</div>
        )}
      </div>

      {/* display the posts buttons (share , download , favorite , tags) */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <PostButton
            name='Share'
            onClick={() => {
             navigator.clipboard
              .writeText(post.file_url)
              .then(() => window.alert("Link Copied!"))
              .catch((err) => {
                window.alert("Something Went Wrong: " + err);
              });
            }}
            src={icons.share}
          />

          {favorites.some((f) => f.id === post.id) ? (
            <PostButton name='Unfavorite' onClick={() => removeFavorite(post)} src={icons.unfavorite} />
          ) : (
            <PostButton name='Favorite' onClick={() => addFavorite(post)} src={icons.heart} />
          )}
          <PostButton name='Download' onClick={() => saveFile(post.file_url)} src={icons.download} />
        </div>

        <PostButton
        className = {`${isTags ? "rotate-180" : "rotate-0"} transform transition-transform duration-300`}
          name='Tags'
          onClick={() => {
            setIsTags((prev) => !prev);
          }}
          src={icons.arrow_down}
        />
      </div>

      {/* display the tags of a post */}
        <div
          onClick={toggleTagSelect}
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300
          ${
            isTagSelectVisible
              ? "opacity-100 backdrop-blur-md pointer-events-auto"
              : "opacity-0 backdrop-blur-0 pointer-events-none"
          }`}>
          <TagSelect isVisible={isTagSelectVisible} label={currentTagSelect} closeTagSelect={toggleTagSelect} />
        </div>

        <div
          className={`${isTags ? "opacity-100 translate-y-4 max-h-96 pointer-events-auto  " : "opacity-0 translate-y-0 pointer-events-none  max-h-0  "} transition-all duration-400 overflow-hidden ease-in-out flex flex-col gap-2`}>
          
          <div className='flex w-5/6 border-b border-gray-200/20 gap-2'>
            <h1 className='border rounded-xl text-sm md:text-base border-gray-200/20 p-2 text-gray-400 hover:bg-gray-200/20 cursor-pointer mb-2 '>
              Score : {post.score}
            </h1>
            {post.source && (
              <a href={post.source} target='_blank'>
                <h1 className='border text-sm md:text-base  rounded-xl border-gray-200/20 p-2 text-gray-400 hover:bg-gray-200/20 cursor-pointer mb-2 underline '>
                  Source
                </h1>
              </a>
            )}
          </div>

          <div className=' flex flex-wrap  relative  w-full max-h-60  overflow-auto  gap-2 mb-5 '>
            {tags.map((tag, index) => {
              if (tag.trim()) {
                const taginQueryList = queryList.find((item) => item.name === tag.trim());
                return (
                  <button
                    onClick={() => {
                      toggleTagSelect();
                      setCurrentTagSelect(tag);
                    }}
                    className={`${
                      taginQueryList ? (taginQueryList.excluded ? "bg-red-600/20" : "bg-green-600/20") : ""
                    } text-sm md:text-base cursor-pointer p-2 text-gray-400 border-gray-200/20 border rounded-xl hover:bg-gray-200/20 `}
                    key={`${tag}+${index}`}>
                    {tag}
                  </button>
                );
              }
            })}
          </div>
          
        </div>
       
    </div>
  );
}
