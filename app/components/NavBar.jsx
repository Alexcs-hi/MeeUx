"use client";
import { useRouter } from "next/navigation";
import { useSideBar } from "../context/SideBarToggle";
import { useEffect, useState } from "react";
import {useWindowSize} from '../hooks/useWindowSize'
import {useWindowScroll} from '../hooks/useWindowScroll';

export default function NavBar() {

    const router = useRouter();
    const {height , width} = useWindowSize();
    const {direction} = useWindowScroll();

    const [isMounted, setIsMounted] = useState(false);

    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [scrolled , setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
                setScrolled(window.scrollY > 200);

        };

        window.addEventListener("scroll" , handleScroll);

        return () => window.removeEventListener("scroll" , handleScroll); 
    }, [] );
      
    const { toggleSideBar } = useSideBar();

    function NavButton({ name, route , image_src }) {
        return (
            <button onClick={() => router.push(route)} className=" flex-none  relative  active:scale-95 flex flex-col items-center  group  cursor-pointer p-2  rounded-xl hover:bg-gray-200/20 transition">
                <img className="md:w-7 md:h-7  w-6 h-6  invert  " src={image_src} alt="name" />
                <h1 className={`opacity-0 absolute -bottom-8  group-hover:opacity-100 transition text-xs bg-gray-200/20 p-1 rounded `}>{name}</h1>
            </button>
        )
    }

    if (isMounted && width <= 639){
        return( 
            <div className={` ${direction == "down" ? "translate-y-full" : "translate-y-0"}  transition   z-1  bg-black/50 backdrop-blur-2xl fixed bottom-0 left-0 w-full  flex justify-evenly items-center  h-16 `}>
                <button onClick={() => router.push("/")}
                className="hover:bg-gray-200/20  rounded-xl p-2 cursor-pointer active:scale-95 focus:bg-gray-600/30 transition"><img className="h-7 w-7 invert" src="/cat_paw.png" alt="cat_paw" />
                </button>

                <button onClick={toggleSideBar}                 
                 className="hover:bg-gray-200/20 rounded-xl p-2 cursor-pointer active:scale-95 focus:bg-gray-600/30 transition"><img className="h-7 w-7 invert" src="/search.png" alt="search" />
                 </button>

                <button onClick={() => router.push("/favorites")} 
                className="hover:bg-gray-200/20 rounded-xl p-2 cursor-pointer  active:scale-95 focus:bg-gray-600/30 transition"><img className="h-7 w-7 invert" src="/heart.png" alt="favorites" />
                </button>

                <button onClick={() => router.push("/settings")} 
                 className="hover:bg-gray-200/20 rounded-md p-2 cursor-pointer active:scale-95 focus:bg-gray-600/30 transition"><img className="h-7 w-7 invert" src="/cog.png" alt="settings" />
                 </button>

            </div>
        )  
    }
 

    return (
        <div className={`  ${direction == "down" ? "-translate-y-full" : "translate-y-0"} transition ease-out      backdrop-blur-2xl  shadow-[0_4px_30px_rgba(0,0,0,0.5)]    border-gray-400/30 z-1 fixed w-full top-0    flex justify-between items-center p-2 lg:pl-20 lg:pr-20 border-b     `}>
        <div className="flex-1 flex justify-start">
        <button className=" cursor-pointer transition rounded-full p-2 hover:bg-gray-200/20   active:scale-95    "
                onClick={() => window.open("https://github.com/Alexcs-hi")} >
        <img className="w-6 md:w-7 lg:w-8 invert" src="/github.png" alt="github_icon" />
        </button>
        </div>   
 
            <div className=" flex-1  justify-center flex">
                <button onClick={() => router.push("/")
            } className=" hover:bg-gray-200/20 p-2 rounded-sm font-bold md:text-xl lg:text-2xl cursor-pointer active:scale-90 transition group">
                MeeUx :3
                </button>
               
               
            </div>

            <div className="flex flex-1 justify-end gap-2">


                <div className="flex gap-4 overflow-visible border-gray-600/20 rounded-xl p-2 border bg-gray-600/20     ">
                <button onClick={toggleSideBar} className="flex-none rounded-xl hover:bg-gray-200/20 p-2 active:scale-95 transition relative flex flex-col items-center cursor-pointer group">
                 <h1 className={`opacity-0 absolute -bottom-8  group-hover:opacity-100 transition text-xs bg-gray-200/20 p-1 rounded `}>Search</h1>
                <img className="md:w-7 md:h-7  w-6 h-6 invert " src="/search.png" alt="search" />
                </button>
                <NavButton route={"/about"} name="About" image_src={"/about.png"} />
                <NavButton route={"/favorites"} name="Favorites" image_src={"/heart.png"} />
                <NavButton route={"/settings"} name="Settings" image_src={"/cog.png"} />
            </div>


            </div>

         

        </div>
    )
};  