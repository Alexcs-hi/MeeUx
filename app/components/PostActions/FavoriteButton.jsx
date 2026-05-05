import { icons } from "../../constants/icons.js";
import { useFavorite } from "../../context/FavoriteContext";
import PostButton from "./PostButton";


export default function FavoriteButton({post}){
    const { favorites, addFavorite, removeFavorite } = useFavorite();

    return (
          favorites.some((f) => f.id === post.id) ? (
                    <PostButton name='Unfavorite' onClick={() => removeFavorite(post)} src={icons.unfavorite} />
                  ) : (
                    <PostButton name='Favorite' onClick={() => addFavorite(post)} src={icons.heart} />
          )
        
    )
}