"use client";
import { useFavorite } from "../context/FavoriteContext";
import Post from "../components/Post";
import { icons } from "../constants/icons";
import { useTagActions } from "../context/TagActionsContext";
import TagList from "../components/TagList";
import TagSelect from "../components/TagSelect";
import { useSearch } from "../context/SearchContext";
import { useState } from "react";
import FullScreenPost from "../components/FullScreenPost";
function favorites() {
  const { favorites, removeAllFavorite, removeFavorite, loading } = useFavorite();
  const { queryList, pageNumber, setPageNumber } = useSearch();
  const {
    selectedPost,
    tagListVisible,
    setTagListVisible,
    setTagSelectVisible,
    tagSelectVisible,
    isFullScreen,
    setIsFullScreen,
  } = useTagActions();
  const [currentPost, setCurrentPost] = useState(0);
  if (loading) {
    return <div></div>;
  }

  if (favorites.length <= 0)
    return (
      <div className={` fade-up flex flex-1  h-[80vh] justify-center items-center `}>
        <div className='flex flex-col items-center gap-2 '>
          <img
            className='w-20 h-20 bg-gray-600/20 rounded-xl p-4 invert border border-gray-600/20   '
            src={icons.heart}
            alt='heart'
          />
          <h1>No Favorites Yet ?</h1>
          <p className='text-sm text-gray-400 italic'>Go Explore and heart some posts !</p>
        </div>
      </div>
    );
  return (
    <div className='flex flex-1 flex-col items-center gap-4 mt-4 '>
      {isFullScreen && (
        <FullScreenPost
          onClickTag={() => {
            setTagListVisible(true);
          }}
          posts={favorites}
          SetIsFullScreen={setIsFullScreen}
          currentPost={currentPost}
          setCurrentPost={setCurrentPost}
          favorite={true}
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

      <button
        className='p-2  border border-gray-200/20 rounded-xl  hover:bg-gray-200/20 transition'
        onClick={() => removeAllFavorite()}>
        Remove All
      </button>

      <div className='flex flex-1 flex-col items-center gap-4'>
        {favorites.map((post, index) => (
          <div key={post.id}>
            <Post SetIsFullScreen={setIsFullScreen} setCurrentPost={setCurrentPost} currentPost={index} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default favorites;
