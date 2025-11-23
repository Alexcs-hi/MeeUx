"use client";
import SearchBar from "./SearchBar"
import { useSideBar } from "../context/SideBarToggle"
import { useSearch } from "../context/SearchContext";
import { useEffect } from "react";
import { useToolBar } from "../context/PostToolBarContext";



export default function SideBar() {

  const { visible, toggleSideBar } = useSideBar();
  const { isSearched, setIsSearched } = useSearch();
  const { setView } = useToolBar();



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
          className="fixed inset-0 bg-black/50 to-[#470a3d4d] backdrop-blur-sm z-10"
        />
      )}
      <div className={` bg-linear-to-b  from-[#000000] via-[#000000] to-[#85295b7a]   transition duration-400 z-40 flex flex-col items-center justify-between border-l border-gray-600 rounded  p-4 fixed  right-0  w-full md:w-99  lg:w-99 h-dvh overflow-auto  
        ${visible ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col gap-4 items-center w-full">
          <div className="flex w-full">
            <button onClick={() => toggleSideBar()} className="rounded p-2 cursor-pointer hover:bg-gray-200/20 transition ">
              <img className="invert w-7   " src="/cross.png" alt="cross" />
            </button>
          </div>

          <h1 className="font-bold text-3xl  ">Search</h1>

          <SearchBar />


        </div>

        <div className="w-full flex flex-col gap-2">

          <div className=" hidden sm:flex  items-center justify-between border border-gray-600/20 rounded-xl  bg-gray-600/20 p-2 gap-2">
            <button onClick={() => setView("list")} className="flex-1 flex flex-row gap-2 items-center  justify-center rounded-md transition active:scale-95  hover:bg-gray-200/20 p-1"><img className="w-5 h-5 invert-75" src="/list_view.png" alt="list_view" />List</button>
            <button onClick={() => setView("grid")} className="flex-1 flex flex-row gap-2 items-center justify-center  rounded-md transition active:scale-95  hover:bg-gray-200/20 p-1"><img className="w-5 h-5 invert-75" src="/grid_view.png" alt="grid_view" />Grid</button>

          </div>

          <p className="text-sm font-light text-gray-200/50">You can click on the tag to remove it </p>
          <button onClick={() => {
            toggleSideBar();
            setIsSearched(true);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }} className="  text-gray-300 cursor-pointer border border-gray-600/50 rounded-xl p-2 w-full hover:bg-gray-200/20 active:scale-95    transition  ">Search
          </button>
        </div>

      </div>
    </>
  )
}