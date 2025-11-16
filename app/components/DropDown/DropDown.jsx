import { useState , useEffect , useRef} from "react"
import DropDownBtn from "./DropDownBtn"
import DropDownContent from "./DropDownContent"
import DropDownItem from "./DropDownItem";

 
function DropDown({name , content ,  setSortableValue}) {

   const [open , setOpen] = useState(false);
   const [dropDownName , setDropDownName] = useState(name);
   const DropDownRef = useRef();

   useEffect(() => {

    const handler = (event) => {
        if(DropDownRef.current && !DropDownRef.current.contains(event.target)){
            setOpen(false);
        }
    }

    document.addEventListener("click" , handler);

    return () => document.removeEventListener("click" ,  handler)

   }, [DropDownRef]);

   const toggleOpen = () => {
    setOpen(prev => !prev);     
   }

  return (
    <div ref={DropDownRef} className="relative">
        <DropDownBtn open={open} toggleOpen={toggleOpen} >
            {dropDownName}
        </DropDownBtn>

        <DropDownContent open={open}>
            {content.map((item) => (
                    <DropDownItem  key={item.name} onClick={() => {setDropDownName(item.name);  setSortableValue(item.value);}} toggleOpen={toggleOpen} name={item.name} />  
                ))}
        </DropDownContent>
    </div>
  )
}

export default DropDown