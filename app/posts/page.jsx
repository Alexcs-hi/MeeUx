 
import ClientPosts from "./ClientPosts"
import { Suspense } from "react";

function posts() {
 
  

  return (
   <div className="flex flex-col min-h-screen">


<div className="flex-1">
    <Suspense fallback={null}>
      <ClientPosts />
    </Suspense>
</div>


 
  <details className="mx-auto mb-10  max-w-xl text-xs text-gray-400">
    <summary className="cursor-pointer list-none text-center opacity-60 hover:opacity-100">
      <h1 className="inline">About MeeUx</h1>
    </summary>
  <p className="mt-3 text-center leading-relaxed">
  MeeUx is a modern Rule34 and hentai browser built for fast and simple exploration of rule34 and hentai content. 
  It lets users search, filter, and browse posts by tags, ratings, and sorting options with a clean, responsive interface 
  on both desktop and mobile. Discover, refine searches, and explore large collections of hentai and rule34 content efficiently with MeeUx.
</p>

    
  </details>
 



      
      </div>
  )
}

export default posts