import { useSort } from '../context/SortContext';
import DropDown from './DropDown/DropDown'
 
import { scoreOptions } from "../utils/options";
import { ratingOptions } from "../utils/options";   
import { uploadOptions } from "../utils/options";


function SortBar() {

  const {setScore , setRating , setUpload , score , rating , upload ,  hydrated} = useSort();

  

 if (!hydrated) return null;

const selectedScore =
  scoreOptions.find(opt => opt.value == score)?.name || "Score";

const selectedRating =
  ratingOptions.find(opt => opt.value == rating)?.name || "Rating";

const selectedUpload =
  uploadOptions.find(opt => opt.value == upload)?.name || "Upload";

 
 

    return (
        <div className="flex flex-col gap-2  ">
            <h1 className="text-gray-300 md:text-sm  text-xs   ">Sort By :</h1>
            <div className="flex flex-wrap gap-2 border-t pt-4 border-gray-200/20 text-gray-400">

            <DropDown setSortableValue={setScore} name={selectedScore} content={scoreOptions} />
            <DropDown setSortableValue={setRating} name={selectedRating} content={ratingOptions} />
            <DropDown setSortableValue={setUpload} name={selectedUpload} content={uploadOptions} />
           
 

            </div>
        </div>
    )
}

export default SortBar