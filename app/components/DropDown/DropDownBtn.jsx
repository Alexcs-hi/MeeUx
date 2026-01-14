
function DropDownBtn({children , open ,  toggleOpen}) {
  return (
    <div onClick={toggleOpen} className= {`md:text-sm   text-xs justify-between text-gray-400 cursor-pointer flex border-gray-200/20 border rounded-md p-2 items-center hover:bg-gray-200/20 transition ${open ? "border border-amber-200" : ""}` }>
    {children}
    <img className='w-3 h-3 md:w-4 md:h-4 invert-75 ml-2 ' src="/arrow_down.png" alt="arrow_down" />
    </div>
  )
}

export default DropDownBtn