"use client";
import { createContext, useContext, useState  } from "react"

const ToolBarContext = createContext();

export function PostToolBarProvider({children}) {

    const [view , setView] = useState("list");

     
  return (
    <ToolBarContext.Provider value={{ view , setView }}>
        {children}
    </ToolBarContext.Provider>
  )
}

export default PostToolBarProvider

export const useToolBar = () => useContext(ToolBarContext);