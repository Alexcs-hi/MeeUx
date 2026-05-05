import PostButton from "./PostButton";
import {icons} from '../../constants/icons.js';
import { saveFile } from "../../utils/saveFile";

export default function DownloadButton({post}){
    return (
          <PostButton name='Download' onClick={() => saveFile(post.file_url)} src={icons.download} />
    )
}