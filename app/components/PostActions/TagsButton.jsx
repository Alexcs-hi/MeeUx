import PostButton from "./PostButton";
import {icons} from '../../constants/icons.js';
import { useTagActions } from "../../context/TagActionsContext.jsx";
 

export default function TagsButton(){
    const {setTagListVisible} = useTagActions();
    return (
          <PostButton className="rotate-180 " name='Tags' onClick={() => {setTagListVisible(true    )}  } src={icons.arrow_down} />
    )
}