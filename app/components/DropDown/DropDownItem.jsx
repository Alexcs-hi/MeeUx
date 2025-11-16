
function DropDownItem({name , toggleOpen , onClick }) {
  return (
    <div onClick={() => {toggleOpen() , onClick()}}    className='cursor-pointer text-sm hover:bg-gray-200/20  rounded transition p-2 w-full h-full  '>{name}</div>
  )
}

export default DropDownItem