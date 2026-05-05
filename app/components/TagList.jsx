import { useEffect, useState } from "react";
import { icons } from "../constants/icons";
import TagSelect from "./TagSelect";
import { useTagActions } from "../context/TagActionsContext";

export default function TagList({ queryList, post }) {
  const tags = post?.tags.split(" ");
  const { tagListVisible, setTagListVisible, setSelectedTag, setTagSelectVisible } = useTagActions();

  useEffect(() => {
    if (tagListVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [tagListVisible]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${tagListVisible ? "opacity-100  max-h-96 pointer-events-auto  " : "  pointer-events-none  translate-y-60  max-h-0 "} transition-all duration-400 overflow-hidden ease-in-out  md:p-4 bg-black rounded-xl max-w-150  border border-gray-200/20  `}>
   
      {!post ? (
        <div>loading Tags</div>
      ) : (
        <div className='flex flex-col gap-2  p-4 md:p-2  justify-center items-center'>
          <div className='flex items-center justify-between  border-b border-gray-200/20 gap-2 w-full'>
            <div className='flex gap-2'>
              <h1 className='border rounded-xl text-sm md:text-base border-gray-200/20 p-2 text-gray-400 hover:bg-gray-200/20 cursor-pointer mb-2 '>
                Score : {post.score}
              </h1>
              {post.source && (
                <a href={post.source} target='_blank' rel='noopener noreferrer'>
                  <h1 className='border text-sm md:text-base  rounded-xl border-gray-200/20 p-2 text-gray-400 hover:bg-gray-200/20 cursor-pointer mb-2 underline '>
                    Source
                  </h1>
                </a>
              )}
            </div>
            <button onClick={() => setTagListVisible(false)}>
              <img className='invert-75 w-5 h-5 ' src={icons.cross} alt={icons.cross} />
            </button>
          </div>

          <div className='flex flex-wrap w-full max-h-70 overflow-auto gap-2 rounded-xl     '>
            {tags.map((tag, index) => {
              if (tag.trim()) {
                const taginQueryList = queryList.find((item) => item.name === tag.trim());
                return (
                  <button
                    onClick={() => {
                      setSelectedTag(tag);
                      setTagSelectVisible(true);
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
      )}

         {/* <div className="w-1/4 bg-white/50 h-2 rounded-xl m-auto"></div> */}
      
    </div>
  );
}
