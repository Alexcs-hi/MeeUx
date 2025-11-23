"use client";
import {useFavorite} from '../context/FavoriteContext';
import Post from '../components/Post';


function favorites() {
    const {favorites , removeAllFavorite , removeFavorite} = useFavorite();
    if (favorites.length <= 0 ) return ( 
    <div className=' flex flex-1  h-[80vh] justify-center items-center '>
        <div className='flex flex-col items-center gap-2 '>
          <img className='w-20 h-20 bg-gray-600/20 rounded-xl p-4 invert border border-gray-600/20   ' src="/heart.png" alt="heart" />
          <h1>No Favorites Yet ?</h1>
          <p className='text-sm text-gray-400 italic'>Go Explore and heart some posts !</p>
        </div>
      </div>  )
  return (
    <div className='flex flex-1 flex-col items-center gap-4 '>

      <button className='p-2  border border-gray-200/20 rounded hover:bg-gray-200/20 transition' onClick={() => removeAllFavorite()}>Remove All</button>

      <div className='flex flex-1 flex-col items-center gap-4'>
             {favorites.map((post) => (
        <div key={post.id}>
              <Post post = {post}/>
              
        </div>

      ))}

      </div>
 

    </div>
  )
}

export default favorites