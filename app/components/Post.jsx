"use client";
import { useEffect, useState } from "react";
import { useFavorite } from "../context/FavoriteContext";
import { icons } from "../constants/icons";
import TagSelect from "./TagSelect";
import { useSearch } from "../context/SearchContext";
import ShareButton from "./PostActions/ShareButton";
import FavoriteButton from "./PostActions/FavoriteButton";
import DownloadButton from './PostActions/DownloadButton';
import PostButton from "./PostActions/PostButton";
import TagList from "./TagList";
import { useTagActions } from "../context/TagActionsContext";
import { useToolBar } from "../context/PostToolBarContext";


export default function Post({ post , SetIsFullScreen , setCurrentPost , currentPost , setCurrentTagPost , isFullScreen  }) {
  const [loaded, setLoaded] = useState(false);
const {setTagListVisible , selectedPost , setSelectedPost} = useTagActions();
  const [error, setError] = useState(false);
  const [isTags, setIsTags] = useState(false);
  const url_end = post.file_url.slice(-4);
   const { view } = useToolBar();

  function VideoPlayer({className}){
    return (
        <video
              onLoadedMetadata={() => setLoaded(true)}
              src={post.file_url}
              poster={post.sample_url  }
              controls  
              className={` ${className} transition-opacity duration-500 
            ${loaded ? "opacity-100" : "opacity-0"}`}
       />
    )
  }

  function ImageViewer({className}){
    return (
    <img  
            onClick={() => {
                   SetIsFullScreen(true);
                   setCurrentPost(currentPost)
            }}
              loading='lazy'
              decoding='async'
              onError={() => setError(true)}
              onLoad={() => setLoaded(true)}
              className={` ${className}    not-first-of-type:    transition-opacity duration-500 
            ${loaded ? "opacity-100" : "opacity-0"}`}
              src={`https://image-proxy.alexcs-hello.workers.dev?url=${encodeURIComponent(post.sample_url)}`}
              alt={post.id}
            />
    )
  }

  if (view === "grid") {
    return(
      <div  className={` ${isFullScreen ? ""  : "hover:z-1 hover:scale-101 hover:shadow-2xl" } group relative h-fit flex flex-col rounded-xl w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl  mb-2   transition duration-200 `}>
     <div
        style={{
          aspectRatio: `${post.width} / ${post.height}`,
        }}
        className='flex-1 relative max-h-screen overflow-auto '>
        {!loaded && !error && (
          <div className='w-full h-full top-0 left-0 absolute bg-gray-600/20 animate-pulse'/>
        )}

        <div className="flex p-2  items-start justify-end pointer-events-none  group-hover:opacity-100 opacity-0 absolute  w-full h-full bg-black/20 transition duration-200">
             <div className="flex bg-black/50 p-2 gap-2 pointer-events-auto rounded-xl overflow-hidden">
              <ShareButton  post={post}/>
              <FavoriteButton  post={post}/>
              <DownloadButton  post={post}/>
             </div>
       </div>

        {!error ? (
          url_end == ".mp4" ? (
            <VideoPlayer className = "overflow-hidden object-cover  rounded-lg" />
          ) : (
            <ImageViewer className = "object-cover overflow-hidden rounded-lg" />
          )
        ) : (
          <div>failed to load image/video</div>
        )}
      </div>
      </div>
    )
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
          <VideoPlayer />
          ) : (
            <ImageViewer />
          )
        ) : (
          <div>failed to load image/video</div>
        )}
      </div>

      {/* display the posts buttons (share , download , favorite , tags) */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
         <ShareButton post={post} />
          <FavoriteButton post={post}/>
          <DownloadButton post={post} />
        </div>

        <PostButton
        className = {`${isTags ? "rotate-180" : "rotate-0"} transform transition-transform duration-300`}
          name='Tags'
          onClick={() => {     
            setSelectedPost(post);
            setTagListVisible(true);           
          }}
          src={icons.arrow_down}
        />
      </div>
    </div>
  );
}
