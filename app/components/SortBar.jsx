import { useSort } from '../context/SortContext'


function SortBar() {
    const { setRating, setScore, setUpload } = useSort();
    return (
        <div className="flex flex-col gap-2  ">
            <h1 className="text-gray-300    ">Sort By :</h1>
            <div className="flex flex-wrap gap-2 border-t pt-4 border-gray-200/20 text-gray-400">


                <select onChange={(e) => { setScore(e.target.value) }} className=" outline-none  border border-gray-200/20 rounded p-2 bg-black" name="Rating" >
                    <option value="">Score</option>
                    <option value="+sort%3ascore%3adesc+">Highest</option>
                    <option value="+sort%3ascore%3aasc+">Lowest</option>
                </select>

                <select onChange={(e) => { setRating(e.target.value) }} className="  outline-none border border-gray-200/20 rounded p-2 bg-black" name="Rating" >
                    <option value="">Rating</option>
                    <option value="+rating%3asafe+">Safe</option>
                    <option value="+rating%3aexplicit+">Explicit</option>
                    <option value="+rating%3aquestionable+">Questionable</option>
                </select>

                <select onChange={(e) => { setUpload(e.target.value) }} className="  outline-none border border-gray-200/20 rounded p-2 bg-black" name="Rating" >
                    <option value="">Uploaded</option>
                    <option value="+sort%3aupdated%3adesc+">Recently</option>
                    <option value="+sort%3aupdated%3aasc+">Oldest</option>
                </select>
            </div>
        </div>
    )
}

export default SortBar