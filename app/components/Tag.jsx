"use client";

export default function Tag({ name, onDelete, setExcluded, isExcluded }) {


    return (
        <div className=" cursor-pointer text-gray-400 flex items-center gap-2 border border-gray-400/30 rounded-xl p-2 h-11">

            <button onClick={onDelete}>
                <h1 className={`  text-xs md:text-sm cursor-pointer md:p-1 hover:bg-red-500/50  rounded ${isExcluded ? "line-through text-gray-400/70 " : ""}`}>{name}</h1>
            </button>

            <button className="cursor-pointer hover:bg-gray-200/30 p-1 md:p-2 rounded " onClick={setExcluded}>

                {isExcluded ? (<img className=" md:w-4 md:h-4 w-3 h-3 invert" src="/add.png" alt="add_icon" />) : (<img className=" md:w-4 md:h-4 w-3 h-3 invert" src="/line.png" alt="removed_icon" />)}

            </button>

        </div>
    )

}