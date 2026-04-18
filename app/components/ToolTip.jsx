export default function ToolTip({label , children}) {
    return(
        <div className=" flex-none relative flex flex-col items-center group cursor-pointer ">
            {children}
        <h1
          className={`opacity-0 absolute -bottom-8  group-hover:opacity-100 transition text-xs bg-gray-200/20 p-1 rounded `}>
          {label}
        </h1>
        </div>
    )
}


