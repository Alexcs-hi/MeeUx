"use client";
import { useRouter } from "next/navigation";
import { useSideBar } from "../context/SideBarToggle";

export default function NavBar() {

    const router = useRouter();

    const { visible, toggleSideBar } = useSideBar();

    function NavButton({ name, route }) {
        return (
            <button onClick={() => router.push(route)} className="cursor-pointer hover:border-b border-white">{name}</button>
        )
    }

    return (
        <div className=" z-1 sticky top-0 bg-black/50 backdrop-blur-2xl flex justify-between items-center p-2 lg:pl-20 lg:pr-20 border-b border-gray-400/30 mb-10 " >
            <button onClick={() => router.push("/")
            } className=" hover:bg-gray-200/20 p-2 rounded font-bold text-2xl cursor-pointer">MeeUx</button>

            <div className="flex gap-4 ">
                <NavButton route={"/"} name="Home" />
                <NavButton route={"/"} name="Posts" />
            </div>

            <div className="flex items-center gap-10 shrink-0">
                <button className=" cursor-pointer transition rounded-full p-2 hover:bg-gray-200/20" onClick={toggleSideBar}><img className="w-7 invert" src="/search.png" alt="search_btn" /></button>
                <button className=" cursor-pointer transition rounded-full p-2 hover:bg-gray-200/20" onClick={() => window.open("https://github.com/Alexcs-hi")} ><img className="w-8 invert" src="/github.png" alt="github_icon" /></button>
            </div>

        </div>
    )
};  