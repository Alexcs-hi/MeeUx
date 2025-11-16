
function DropDownContent({children , open}) {

  return (
    <div className= {` z-50  absolute flex flex-col items-center mt-2 border border-gray-200/20 rounded transition-opacity p-1 backdrop-blur-xs bg-black/40   ${open ? "opacity-100 pointer-events-auto "  : "opacity-0 pointer-events-none"}`}>{children}</div>
  )
}

export default DropDownContent