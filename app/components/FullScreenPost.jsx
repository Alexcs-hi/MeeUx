import { useEffect, useState } from "react";
import { icons } from "../constants/icons";
import ShareButton from "./PostActions/ShareButton";
import DownloadButton from "./PostActions/DownloadButton";
import FavoriteButton from "./PostActions/FavoriteButton";
import PostButton from "./PostActions/PostButton";
import TagsButton from "./PostActions/TagsButton";
import { useSwipeable } from "react-swipeable";
import { useTagActions } from "../context/TagActionsContext";
import {useWindowSize} from "../hooks/useWindowSize"

function FullScreenPost({ posts, SetIsFullScreen, currentPost, setCurrentPost, setPageNumber, pageNumber }) {
  const windowSize = useWindowSize();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const post = posts[currentPost];
const isTallImage = post && windowSize.height > 0 
    ? post.height >= (windowSize.height * 6) 
    : false;
 const {setSelectedPost} = useTagActions();
const handlers = useSwipeable({
     
    onSwipedUp: () => {
      displayNext();
    },
     
    onSwipedDown: () => {
      displayPrev();  
    },
    delta: 50,  
    preventScrollOnSwipe: true, 
    trackMouse: true,  
  });

  useEffect(() => {
    function handleKeyDown(e) {

      if (e.repeat) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        displayNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        displayPrev();
      } else if (e.key === "Escape") {
        SetIsFullScreen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPost, posts.length, pageNumber]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    setLoaded(false);
    setError(false);
    setSelectedPost(post);
  }, [currentPost]);

  function displayNext() {
    if (currentPost >= posts.length - 1) { 
      setPageNumber(pageNumber + 1);
    } else {
      setCurrentPost(currentPost + 1);
    }
  }

  function displayPrev() {
    if (currentPost > 0) {
      setCurrentPost(currentPost - 1);
    }
  }

  

  return (
    <div className='fixed flex items-center justify-between  top-0 z-40 bg-black w-full h-full'>
 
      <div className='absolute top-5 right-5 z-50'>
        <button onClick={() => SetIsFullScreen(false)}>
          <img
            className='rotate-90 invert w-8 h-8 hover:bg-gray-200/20 transition duration-200 rounded-xl p-2 active:scale-95'
            src={icons.cross}
            alt="Close"
          />
        </button>
      </div>

    
      <div {...handlers} 
  style={{ touchAction: 'pan-x' }}  className={`flex-1 relative h-screen w-full overflow-auto no-scrollbar flex justify-center ${isTallImage ? 'items-start' : 'items-center'}`}>
        
        {!post ? (
          <div className='flex flex-col items-center justify-center space-y-4 h-full w-full'>
            <p className='text-white/70 font-semibold animate-pulse'>Loading...</p>
          </div>
        ) : (
          
        
          <div className={`grid place-items-center ${isTallImage ? "w-full" : "max-w-full"}`}>
            
          
            {!loaded && !error && (
              <div className='col-start-1 row-start-1 w-full h-full bg-gray-600/20 animate-pulse rounded-lg' />
            )}

            {!error ? (
              post.file_url.slice(-4) === ".mp4" ? (
                <video
                  onLoadedData={() => setLoaded(true)}
                  onError={() => setError(true)}
                  src={post.file_url}
                  poster={post.sample_url}
                  controls
                  autoPlay
                  style={{ aspectRatio: `${post.width} / ${post.height}` }}
                  className={` col-start-1 row-start-1 transition-opacity duration-500 max-w-full ${isTallImage ? "h-auto w-full" : "max-h-screen object-contain"} ${loaded ? "opacity-100" : "opacity-0"}`}
                />
              ) : (
                <img
                draggable={false}
                  loading='lazy'
                  decoding='async'
                  onError={() => setError(true)}
                  onLoad={() => setLoaded(true)}
                  style={{ aspectRatio: `${post.width} / ${post.height}` }}
                  className={`col-start-1 row-start-1 transition-opacity duration-500 max-w-full ${isTallImage ? "h-auto w-full" : "max-h-screen object-contain"} ${loaded ? "opacity-100" : "opacity-0"}`}
                  src={`https://image-proxy.alexcs-hello.workers.dev?url=${encodeURIComponent(post.file_url)}`}
                  alt={post.id}
                />
              )
            ) : (
              <div className='col-start-1 row-start-1 text-white'>Failed to load image/video</div>
            )}
            
          </div>
        )}
      </div>

    
      <div className='hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 flex-col justify-between items-center gap-4 overflow-visible border-gray-600/20 rounded-xl p-2 border bg-black/50 z-50'>
        <PostButton className='rotate-180' name='Previous' onClick={() => displayPrev()} src={icons.arrow_down} />
        <PostButton name='Next' onClick={() => displayNext()} src={icons.arrow_down} />
      </div>

  
      <div className='absolute bottom-8 right-1/2 translate-x-1/2 flex justify-between items-center gap-2 md:gap-4 overflow-visible border-gray-200/20 rounded-xl p-2 border bg-black/50 z-50 '>
        <ShareButton post={post} />
        <FavoriteButton post={post} />
        <DownloadButton post={post} />
        <TagsButton />
      </div>

    </div>
  );
}

export default FullScreenPost;