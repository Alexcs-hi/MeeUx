import { icons } from "../../constants/icons.js";
import PostButton from "./PostButton";
export default function ShareButton({post}){
    return (
           <PostButton
                    name='Share'
                    onClick={() => {
                     navigator.clipboard
                      .writeText(post.file_url)
                      .then(() => window.alert("Link Copied!"))
                      .catch((err) => {
                        window.alert("Something Went Wrong: " + err);
                      });
                    }}
                    src={icons.share}
         />
    )
}