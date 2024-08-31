import React from 'react'

const TaskBar = () => {
  return (
    <div className='h-screen justify-between flex-col flex'>
    <footer className='w-full h-14 bg-blue-600/80 sticky top-full p-2'>
        <button className=' w-10 h-10 rounded-lg bg-white/0 hover:bg-white/70 items-center justify-center flex font-bold shadow-md'>
            <p>PL</p>
        </button>
    </footer>
    </div>
  )
}

export default TaskBar