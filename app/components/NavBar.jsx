"use client";
import { useRouter } from "next/navigation";
import { useSideBar } from "../context/SideBarToggle";
import { useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { useWindowScroll } from "../hooks/useWindowScroll";
import ToolTip from "./ToolTip";
import {icons} from "../constants/icons"
import {routes} from "../constants/routes"


  function NavButton({ name, onClick, image_src }) {
    return (
  <ToolTip label={name}>
      <button
        onClick = {onClick}
        className=' flex-none  active:scale-95 cursor-pointer p-2  rounded-xl hover:bg-gray-200/20 transition'>
       <img className='md:w-7 md:h-7  w-6 h-6  invert' src={image_src} alt='name' />
      </button>
    </ToolTip>
    );
  }


export default function NavBar() {
  const router = useRouter();
  const { height, width } = useWindowSize();
  const { direction } = useWindowScroll();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { toggleSideBar } = useSideBar();

  if (isMounted && width <= 639) {
    return (
      <div
        className={` ${direction == "down" ? "translate-y-full" : "translate-y-0"}  transition   z-1  bg-black/50 backdrop-blur-2xl fixed bottom-0 left-0 w-full  flex justify-evenly items-center  h-16 `}>
        <button
          onClick={() => router.push("/")}
          className='hover:bg-gray-200/20  rounded-xl p-2 cursor-pointer active:scale-95 focus:bg-gray-600/30 transition'>
          <img className='h-6 w-6 invert' src={icons.home} alt='cat_paw' />
        </button>

        <button
          onClick={toggleSideBar}
          className='hover:bg-gray-200/20 rounded-xl p-2 cursor-pointer active:scale-95 focus:bg-gray-600/30 transition'>
          <img className='h-6 w-6 invert' src={icons.search} alt='search' />
        </button>

        <button
          onClick={() => router.push("/favorites")}
          className='hover:bg-gray-200/20 rounded-xl p-2 cursor-pointer  active:scale-95 focus:bg-gray-600/30 transition'>
          <img className='h-6 w-6 invert' src={icons.heart} alt='favorites' />
        </button>

        <button
          onClick={() => router.push("/about")}
          className='hover:bg-gray-200/20 rounded-md p-2 cursor-pointer active:scale-95 focus:bg-gray-600/30 transition'>
          <img className='h-6 w-6 invert' src={icons.about} alt='about' />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`  ${direction == "down" ? "-translate-y-full" : "translate-y-0"} transition ease-out  backdrop-blur-2xl  shadow-[0_4px_30px_rgba(0,0,0,0.5)]    border-gray-400/30 z-1 fixed w-full top-0 flex justify-between items-center p-2 lg:pl-20 lg:pr-20 border-b     `}>
      <div className='flex-1 flex justify-start'>
         <NavButton   onClick={() => window.open("https://github.com/Alexcs-hi")}  name='Github' image_src={icons.github} />
      </div>

      <div className=' flex-1  justify-center flex'>
        <button
          onClick={() => router.push(routes.home)}
          className=' hover:bg-gray-200/20 p-2 rounded-sm font-bold md:text-xl lg:text-2xl cursor-pointer active:scale-90 transition group'>
          MeeUx :3
        </button>
      </div>

      <div className='flex flex-1 justify-end gap-2'>
        <div className='flex gap-4 overflow-visible border-gray-600/20 rounded-xl p-2 border bg-gray-600/20'>
          <NavButton  onClick={() => toggleSideBar()}  name='Search' image_src={icons.search} />
          <NavButton  onClick={() => router.push(routes.about)}  name='About' image_src={icons.about} />
          <NavButton  onClick={() => router.push(routes.favorites)} name='Favorites' image_src={icons.heart} />
          <NavButton  onClick={() => router.push(routes.settings)} name='Settings' image_src={icons.settings} />
        </div>
      </div>
    </div>
  );
}
