"use client";
import {useFavorite} from '../context/FavoriteContext';
import Post from '../components/Post';


function favorites() {
    const {favorites , removeAllFavorite , removeFavorite} = useFavorite();
    if (favorites.length <= 0 ) return (<div className='text-white flex flex-1 '><h1 className='m-auto'>No fovorites Yet</h1></div>)
  return (
    <div className='flex flex-1 flex-col items-center gap-4'>

      <button className='p-2 border border-gray-200/20 rounded hover:bg-gray-200/20 transition' onClick={() => removeAllFavorite()}>Remove All</button>

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