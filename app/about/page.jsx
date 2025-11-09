import React from 'react'

function about() {
  return (
    <div className='p-4 flex flex-col items-center'>
      <h1 className='italic text-gray-400 '>First of all ,  if you're reading this , thank you very much for visiting! :D</h1>
      <div className='border border-gray-200/20  rounded  flex flex-col gap-4 p-2 w-full lg:w-1/2 md:w-2/3 mx-auto'>

        <h1 className='text-2xl'>About This Project</h1>
        <p className='text-gray-300'>i created this project to learn more about web dev  , its something that i have been working
          on for a couple of weeks also this project is heavily inspired by <a className='text-blue-400 underline' href="https://r34.app/">R34app</a>
        </p>
        <p className='text-gray-300'>I'm still a beginner trying to figure out how things work so yeah if there are issues i'll try to fix em if i can ig yea</p>
        <p className='text-gray-300'>If there are any features that you want or bugs that needs to be fixed you can DM me on discord : <strong>alexcs_ye</strong>   i'll try my best </p>
        <p className='text-gray-300'>Also , the code base is a mess rn </p>
        <p className='text-gray-300'>Ba byeee  ₍^. .^₎⟆</p>
      </div>
        
    </div>
  )
}

export default about