"use client";
import { useState, useEffect, useContext } from "react";
import useR34Search from "../api/r34-search-api"
import Tag from "./Tag"
import { useSearch } from "../context/SearchContext";
import SortBar from './SortBar';

export default function SearchBar() {

  const { queryList, setQueryList } = useSearch();
  const [query, setQuery] = useState("");



  const { queries } = useR34Search(query);



  function handleQuery(e) {
    setQuery(e.target.value);
  }

  function handleDelete(index) {
    setQueryList(prev => prev.filter((_, i) => i !== index))
  };

  function toggleExcluded(index) {
    setQueryList(prev =>
      prev.map((tag, i) => i === index ? { ...tag, excluded: !tag.excluded } : tag
      ))
  }


  return (
    <div className="w-full flex flex-col gap-4 h-160 overflow-auto">
      <div className=" w-full ">
        <input onChange={(e) => {
          handleQuery(e)
        }} className="p-4 rounded-full border border-gray-600/50 w-full outline-0" type="text" placeholder="Search R34" />
      </div>

      {query && queries?.length > 0 && (
        <div className="flex flex-wrap max-h-40  overflow-auto z-50 absolute top-48 bg-black border rounded border-gray-200/50 mr-5">

          {queries.map((q, i) => (
            <div
              key={`${q.value}-${i}`}
              className=" p-2 rounded text-gray-400 transition  hover:bg-gray-200/20 cursor-pointer truncate"
              onClick={() => {
                setQueryList(prev => prev.some(item => item.name === q.value) ? prev : [...prev, { name: q.value, excluded: false }])
                setQuery("");
              }}
            >
              {q.label}
            </div>
          ))}
        </div>
      )}


      <SortBar />

      {queryList && queryList.length > 0 && (
        <h1 className="text-gray-300">Selected Tags</h1>
      )}


      {queryList && queryList?.length > 0 && (

        <div className="flex border-t pt-4 border-gray-400/30 gap-2 flex-wrap  max-h-60  overflow-auto">

          {queryList.map((q, index) => (

            <Tag isExcluded={q.excluded} setExcluded={() => toggleExcluded(index)} onDelete={() => handleDelete(index)} key={index} name={q.name} />
          ))}

        </div>

      )}


      {queryList && queryList.length > 0 && (
        <button onClick={() => {
          setQueryList([])
        }} className="text-gray-400 p-2 mt-2 border border-gray-200/20 rounded-xl hover:bg-gray-200/20 transition">Clear All</button>
      )}

    </div>

  )
}   