import { useSort } from '../context/SortContext';
import DropDown from './DropDown/DropDown'
 

function SortBar() {

  const {setScore , setRating , setUpload} = useSort();

    const scoreOptions = [
  { name: "Score", value: "" },
  { name: "Highest", value: "+sort%3ascore%3adesc+" },
  { name: "Lowest", value: "+sort%3ascore%3aasc+" }
];

const ratingOptions = [
  { name: "Rating", value: "" },
  { name: "Safe", value: "+rating%3asafe+" },
  { name: "Explicit", value: "+rating%3aexplicit+" },
  { name: "Questionable", value: "+rating%3aquestionable+" }
];

const uploadOptions = [
  { name: "Uploaded", value: "" },
  { name: "Recently", value: "+sort%3aupdated%3adesc+" },
  { name: "Oldest", value: "+sort%3aupdated%3aasc+" }
];

    return (
        <div className="flex flex-col gap-2  ">
            <h1 className="text-gray-300  text-sm   ">Sort By :</h1>
            <div className="flex flex-wrap gap-2 border-t pt-4 border-gray-200/20 text-gray-400">

            <DropDown setSortableValue={setScore} name={scoreOptions[0].name} content={scoreOptions} />
            <DropDown setSortableValue={setRating} name={ratingOptions[0].name} content={ratingOptions} />
            <DropDown setSortableValue={setUpload} name={uploadOptions[0].name} content={uploadOptions} />
           
 

            </div>
        </div>
    )
}

export default SortBar