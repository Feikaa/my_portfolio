import React, { useState } from 'react';

const TaskBar = () => {
  const [search, setSearch] = useState('');

  return (
    <footer className='w-full h-14 bg-blue-600/60 sticky top-full p-2 items-center flex space-x-4'>
        <button className='w-10 h-10 rounded-lg bg-white/0 hover:bg-white/70 transition ease-in-out items-center justify-center flex font-bold shadow-md'>
            <p>PL</p>
        </button>

        <div className='relative'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
        <input type='text' placeholder='Search' value={search} onChange={(e) => {setSearch(e.target.value)}} className='flex font-medium items-center justify-center px-2 rounded-md py-1 ps-10' />
        </div>
    </footer>
  )
}

export default TaskBar