import { useSearch } from "../context/SearchContext";
import { useState } from "react";

import { icons } from "../constants/icons";

function TagSelectButton({ onClick, className, name }) {
  return (
    <button
      className={` ${className} border border-gray-200/20  p-2 rounded-xl text-sm transition-all duration-200 bg-black/25 active:scale-95`}
      onClick={() => onClick()}>
      {name}
    </button>
  );
}

export default function TagSelect({ label, closeTagSelect, isVisible }) {
  const baseURL = window.location.origin;

  const { queryList, setQueryList, setIsSearched ,  isSearched} = useSearch();
  
  const isTagInQueryList = queryList.find((tagObj) => tagObj.name === label.trim());

  function addOrExcludeTag(excluded) {
    if (!isTagInQueryList && label.trim()) {
      setQueryList((prev) => [...prev, { name: label, excluded: excluded }]);
    } 
  }

  function removeTag() {
    if (!label.trim()) return;

    if (isTagInQueryList) {
      setQueryList(queryList.filter((tagObj) => tagObj.name != label));
 
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={` ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }  border border-gray-200/40 rounded-xl p-4 flex-col gap-6 w-fit flex justify-around items-center bg-black/75  transition-all duration-300 ease-in-out`}>
      <div className='flex justify-between w-full gap-2'>
        <h1 className=' text-base md:text-lg '>{label}</h1>
        <button
          onClick={() => {

            closeTagSelect();
          }}>
          <img
            src={icons.cross}
            alt={icons.cross}
            className='invert  w-6 h-6 hover:bg-gray-400 transition duration-200 rounded p-1 '
          />
        </button>
      </div>
      <div className='flex w-full gap-2'>

        {!isTagInQueryList && (
          <TagSelectButton
            name='Add Tag'
            onClick={() => {
              closeTagSelect();
              addOrExcludeTag(false);
              setIsSearched(!isSearched);
            }}
            className='  hover:bg-green-400/20 '
          />
        )}

        {!isTagInQueryList && (
          <TagSelectButton
            name='Exclude Tag'
            onClick={() => {  
              closeTagSelect();
              addOrExcludeTag(true);
              setIsSearched(!isSearched);
            }}
            className='hover:bg-red-500/20 '
          />
        )}


         <TagSelectButton
            name='Open In New Tab'
            onClick={() => {  
              closeTagSelect();
              window.open(`${baseURL}/posts?tags=+${label}` , '_blank' ).focus();
            }}
            className='hover:bg-blue-500/20 '
          />

        {isTagInQueryList && (
          <TagSelectButton
            name='Remove Tag'
            onClick={() => {
              closeTagSelect();
              removeTag();
              setIsSearched(true);
            }}
            className='hover:border-red-900'
          />
        )}
      </div>
    </div>
  );
}
