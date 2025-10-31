"use client";
import { createContext  , useState , useContext} from "react"

const SidebarContext = createContext();

export default function SideBarProvider({children}) {

  const [visible , setVisible] = useState(false);
  const toggleSideBar = () => setVisible(prev => !prev); 
  return (
    <SidebarContext.Provider value={{visible, toggleSideBar}}>
      {children}
    </SidebarContext.Provider>
  )
}


export const useSideBar = () => useContext(SidebarContext);
