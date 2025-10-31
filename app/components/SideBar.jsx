"use client";
import SearchBar from "./SearchBar"
import { useSideBar } from "../context/SideBarToggle"
import { useSearch } from "../context/SearchContext";
import { useEffect } from "react";



export default function SideBar() {

  const { visible, toggleSideBar } = useSideBar();
  const { isSearched, setIsSearched } = useSearch();


  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);


  return (
    <>
      {visible && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
        />
      )}
      <div className={` transition duration-400 z-40 flex flex-col items-center justify-between border-l border-gray-600 rounded  p-4 fixed  right-0 w-99 h-screen bg-black 
        ${visible ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col gap-4 items-center w-full">
          <div className="flex w-full">
            <button onClick={() => toggleSideBar()} className="rounded p-2 cursor-pointer hover:bg-gray-200/20 transition ">
              <img className="invert w-7 " src="/cross.png" alt="cross_icon" />
            </button>
          </div>

          <h1 className="font-bold text-3xl">Search</h1>
          <SearchBar />

        </div>

        <div className="w-full flex flex-col gap-2">
          <p className="text-sm font-light text-gray-200/50">You can click on the tag to remove it </p>
          <button onClick={() => {
            toggleSideBar();
            setIsSearched(true);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }} className="flex-1 cursor-pointer border border-gray-600/50 rounded-xl p-2 w-full hover:bg-gray-200/20 transition ">Search
          </button>
        </div>

      </div>
    </>
  )
}