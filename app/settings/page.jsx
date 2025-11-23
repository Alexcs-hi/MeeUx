

function settings() {
  return (
    <div className="p-4 flex  flex-col gap-4 w-full lg:w-1/2 md:w-2/3 mx-auto" >
      <div className=" border-gray-300/20 bg-gray-600/20 border rounded-md p-4 flex flex-col gap-4 ">
        <h1 className="text-2xl ">Theme</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-gray-300">Select your desired theme</h1>
          <button className="cursor-pointer p-2 border-gray-200/20 rounded border hover:bg-gray-200/20 transition">Dark</button>
          <button className="cursor-pointer p-2 border-gray-200/20 rounded border hover:bg-gray-200/20 transition">Light</button>
        </div>
      </div>

      <div className=" border-gray-300/20 bg-gray-600/20 border rounded-md p-4 flex flex-col gap-4 ">
        <h1 className="text-2xl ">API KEY</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-gray-300">Enter your API key</h1>
          <input className="border-gray-200/20 border p-2 outline-0 " type="text" />
          <button className="cursor-pointer p-2 border-gray-200/20 rounded border hover:bg-gray-200/20 transition">Submit</button>
        </div>
        <p className="text-gray-400 text-sm italic truncate">Example : &user_id=3854015&api_key=2266c0a9205c124f0bc781ce80735efdf671883bd25f944ff5903cb48fbff25ea7e71fc77e97b77f8c886505803a59904ecd0c3836605dada8d82530f6ee28a1</p>
      </div>


      <div className=" border-gray-300/20 bg-gray-600/20 border rounded-md p-4 flex flex-col gap-4 ">
        <h1 className="text-2xl ">Excluded Tags</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-gray-300">Enter tags that you want to exclude by default</h1>
          <input className="border-gray-200/20 border p-2 outline-0 w-full" type="text" />
          <button className="cursor-pointer p-2 border-gray-200/20 rounded border hover:bg-gray-200/20 transition">Submit</button>
        </div>
        <p className="text-gray-400 text-sm italic">Note : Add a comma after each tag</p>
      </div>

      <h1>Note: This is a work in progress page and none of the featurs work as of now...</h1>
    </div>
  )
}

export default settings