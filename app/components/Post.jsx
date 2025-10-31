"use client";
import { useState } from "react";



export default function Post({ post }) {
  const tags = post.tags.split(" ");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isTags, setIsTags] = useState(false);
  const url_end = post.file_url.slice(-4);
  const aspectRatio = post.height / post.width;
  const displayHeight = 640 * aspectRatio;
  return (
    <div className=" flex flex-col gap-2 p-4 border border-gray-400/30 rounded w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">

      {!loaded && !error && <div style={{ height: `${displayHeight}px` }} className="  w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl  bg-gray-600 animate-pulse" />}

      {!error ? (
        url_end == ".mp4" ? (
          <video
            onLoadedData={() => setLoaded(true)}
            src={post.file_url}
            controls
            className={`w-160  object-cover transition-opacity duration-500 
            ${loaded ? "opacity-100" : "opacity-0"
              }`}
          />) : (<img loading="lazy" onError={() => setError(true)} onLoad={() => setLoaded(true)}
            className={`w-160  object-cover transition-opacity duration-500 
            ${loaded ? "opacity-100" : "opacity-0"
              }`} src={post.file_url}
            alt={post.id} />)

      )

        :

        (<div className="w-160">failed to load image/video</div>)}





      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <button onClick={() => {
            navigator.clipboard.writeText(post.file_url).then(window.alert("Link Copied !")).catch((err) => { window.alert("Something Went Wrong", err) })
          }} className="cursor-pointer p-2 rounded hover:bg-gray-200/20 transition">
            <img className="w-8 grayscale invert brightness-1 " src="/share.png" alt="share_icon" />
          </button>

          <button onClick={() => {
            window.alert("working on this feature");
          }} className="cursor-pointer p-2 rounded hover:bg-gray-200/20 transition">
            <img className="w-8 invert" src="/heart.png" alt="heart_icon" />
          </button>

          <button onClick={() => {
            window.alert("You can right click to download the image for now ");

          }} className="cursor-pointer p-2 rounded hover:bg-gray-200/20 transition">
            <img className="w-8 invert" src="/download.png" alt="download_icon" />
          </button>

        </div>

        <button onClick={() => {
          setIsTags(prev => !prev)
        }} className="cursor-pointer p-2 rounded hover:bg-gray-200/20 transition">
          <img className="w-7 invert" src="/down-arrow.png" alt="arrow_down_icon" />
        </button>


      </div>


      <div className=" flex flex-wrap w-full  gap-2 ">{isTags && tags.map((tag) =>
        <button className=" cursor-pointer p-2 text-gray-400 border-gray-500 border rounded hover:bg-gray-200/20" key={tag}>{tag}</button>
      )}</div>

    </div>
  )
}