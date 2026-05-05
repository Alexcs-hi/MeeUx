import { useSearch } from "../context/SearchContext";
import { useEffect, useState } from "react";
import { icons } from "../constants/icons";
import { useTagActions } from "../context/TagActionsContext";
import { useRouter, useSearchParams } from "next/navigation";

function TagSelectButton({ onClick, className, name }) {
  return (
    <button
      className={` ${className} border border-gray-200/20  p-2 rounded-xl text-sm transition-all duration-200 bg-black/25 active:scale-95`}
      onClick={() => onClick()}>
      {name}
    </button>
  );
}

export default function TagSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTagsParam = searchParams.get("tags") || "";

  const { selectedTag, setTagSelectVisible, tagSelectVisible, setTagListVisible } = useTagActions();
  const [baseURL, setBaseURL] = useState("");
 
  const isTagInUrl = currentTagsParam.includes(selectedTag?.trim());

  useEffect(() => {
    setBaseURL(window.location.origin);
  }, []);

 
  function updateTags(action, excluded = false) {
    setTagSelectVisible(false);
    setTagListVisible(false);

  
    let currentTags = currentTagsParam ? currentTagsParam.split(/[+\s]+/) : [];

 
    if (action === "add") {
      const newTag = excluded ? `-${selectedTag}` : selectedTag;
      if (!currentTags.includes(newTag)) currentTags.push(newTag);
    } else if (action === "remove") {
      currentTags = currentTags.filter((t) => t !== selectedTag && t !== `-${selectedTag}`);
    }

 
    const newTagsString = currentTags.join("+");
    const params = new URLSearchParams(searchParams.toString());

    if (newTagsString) {
      params.set("tags", newTagsString);
    } else {
      params.delete("tags");
    }
 
    router.push(`/posts?${params.toString()}`);
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={` ${
        tagSelectVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }  border border-gray-200/40 rounded-xl p-4 flex-col gap-6 w-fit flex justify-around items-center bg-black/75  transition-all duration-300 ease-in-out`}>
      <div className='flex justify-between w-full gap-2'>
        <h1 className=' text-base md:text-lg '>{selectedTag}</h1>
        <button
          onClick={() => {
            setTagSelectVisible(false);
          }}>
          <img
            src={icons.cross}
            alt={icons.cross}
            className='invert  w-6 h-6 hover:bg-gray-400 transition duration-200 rounded p-1 '
          />
        </button>
      </div>
      <div className='flex w-full gap-2'>
        {/* Add Tag To the list button */}
        {!isTagInUrl && (
          <TagSelectButton
            name='Add Tag'
            onClick={() => {
              updateTags("add", false);
            }}
            className=' hover:bg-green-400/20 '
          />
        )}
        {/* ERclude Tag To the list button */}
        {!isTagInUrl && (
          <TagSelectButton
            name='Exclude Tag'
            onClick={() => {
              updateTags("add", true);
            }}
            className='hover:bg-red-500/20 '
          />
        )}

        {/* Open selected tag in new window  */}
        <TagSelectButton
          name='Open In New Tab'
          onClick={() => {
            setTagSelectVisible(false);
            window.open(`${baseURL}/posts?tags= ${selectedTag}`, "_blank").focus();
          }}
          className='hover:bg-blue-500/20 '
        />
        {/*Remove tag from the list */}
        {isTagInUrl && (
          <TagSelectButton
            name='Remove Tag'
            onClick={() => {
              updateTags("remove");
            }}
            className='hover:border-red-900'
          />
        )}
      </div>
    </div>
  );
}
