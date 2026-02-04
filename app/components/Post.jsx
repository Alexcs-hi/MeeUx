"use client";
import { useState } from "react";
import { saveFile } from "../utils/saveFile";
import { useFavorite } from "../context/FavoriteContext";


export default function Post({ post }) {
  const { favorites, addFavorite, removeFavorite } = useFavorite();
  const tags = post.tags.split(" ");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isTags, setIsTags] = useState(false);
  const url_end = post.file_url.slice(-4);


  
  
   
  return (
    <div  className=" relative h-fit flex flex-col  gap-2 p-2 lg:p-4 border border-gray-400/30 rounded-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-black/20">

    <div style={{
      aspectRatio: `${post.width} / ${post.height}`,
    }} className="flex-1 relative max-h-screen overflow-auto ">

       {!loaded && !error && <div className="  w-full  h-full  top-0 left-0 absolute  bg-gray-600/20   animate-pulse" />}

      {!error ? (
        url_end == ".mp4" ? (
          <video
            onLoadedData={() => setLoaded(true)}
            src={post.file_url}
            controls
            className={`  transition-opacity duration-500 
            ${loaded ? "opacity-100" : "opacity-0"
              }`}
          />) : (<img 
            
         loading="lazy"
         decoding="async" onError={() => setError(true)} onLoad={() => setLoaded(true)}
            className={`   not-first-of-type:    transition-opacity duration-500 
            ${loaded ? "opacity-100" : "opacity-0"
              }`} src={`https://image-proxy.alexcs-hello.workers.dev?url=${encodeURIComponent(post.file_url)}`}
            alt={post.id} />)

      )

        :

        (<div>failed to load image/video</div>)}


    </div>


      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <button onClick={() => {
            navigator.clipboard.writeText(post.file_url).then(window.alert("Link Copied !")).catch((err) => { window.alert("Something Went Wrong", err) })
          }} className="cursor-pointer p-2 rounded hover:bg-gray-200/20 transition">
            <img className="w-6 md:w-7 lg:w-8 grayscale invert brightness-1 " src="/share.png" alt="share_icon" />
          </button>

          {favorites.some(f => f.id === post.id) ? (<button onClick={() => removeFavorite(post)} className='cursor-pointer p-2   rounded hover:bg-gray-200/20 transition'>
            <img className="w-6 md:w-7 lg:w-8 invert" src="/unfavorite.png" alt="unfavorite" />
          </button>) :
            <button onClick={() => {
              addFavorite(post);
            }} className="cursor-pointer p-2 rounded hover:bg-gray-200/20 transition active:scale-95">
              <img className="w-6 md:w-7 lg:w-8 invert" src="/heart.png" alt="heart" />
            </button>}


          <button onClick={() => {
            saveFile(post.file_url);
          }} className="cursor-pointer p-2 rounded hover:bg-gray-200/20 transition">
            <img className="w-6 md:w-7 lg:w-8 invert" src="/download.png" alt="download" />
          </button>


        </div>

        <button onClick={() => {
          setIsTags(prev => !prev)
        }} className="cursor-pointer p-2 rounded hover:bg-gray-200/20 transition active:scale-95">
          <img className="w-5 md:w-6 lg:w-7 invert" src="/arrow_down.png" alt="arrow_down" />
        </button>



      </div>


      <div className=" flex   flex-wrap w-full max-h-60 overflow-auto  gap-2 ">

        {isTags &&   <div className="flex w-5/6 border-b border-gray-200/20 gap-2">
            <h1 className="border rounded-xl border-gray-200/20 p-2 text-gray-400 hover:bg-gray-200/20 cursor-pointer mb-2 ">Score : {post.score }</h1>
          {post.source && 
            <a href={post.source} target="_blank">
              <h1 className="border rounded-xl border-gray-200/20 p-2 text-gray-400 hover:bg-gray-200/20 cursor-pointer mb-2 underline ">Source</h1>
            </a>}
          
        </div> }

       

        <div className="flex flex-wrap w-full gap-2">
            {isTags && tags.map((tag, index) =>
        <button className=" cursor-pointer p-2 text-gray-400 border-gray-200/20 border rounded-xl hover:bg-gray-200/20" key={`${tag}+${index}`}>{tag}</button>
      )}
        </div>

      </div>

    </div>
  )
}