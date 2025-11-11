"use client";
import useR34Posts from '../api/r34-api';
import {useToolBar} from '../context/PostToolBarContext';
function PostToolBar() {

  const {setView} = useToolBar();

  return (
    <div className=" hidden  sm:flex justify-end items-center border-b border-b-gray-200/10  p-2 mb-10 gap-2">
        <div className="flex items-center gap-2 ">
            <div className="flex gap-2 items-center p-2 border-gray-200/20 rounded border hover:bg-gray-200/20 transition">
                 <button onClick={() => setView("grid")} className="cursor-pointer">Grid</button>
                    <img className="invert-75 w-5" src="/grid_view.png" alt="grid_view" />
            </div>
            <div className="flex gap-2 items-center p-2 border-gray-200/20 rounded border hover:bg-gray-200/20 transition">
                          <button onClick={() => setView("list")} className="cursor-pointer">List</button>
                          <img className="invert-75 w-5" src="/list_view.png" alt="list_view" />
            </div>
        </div>

           
    
    </div>
  )
}

export default PostToolBar