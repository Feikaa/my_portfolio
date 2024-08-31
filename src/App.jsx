import React from 'react'
import TaskBar from './sections/TaskBar'
import MainScreen from './sections/MainScreen'

const App = () => {
  return (
    <main className='bg-slate-800 w-full h-screen'>
      <MainScreen />
      <TaskBar />
    </main>
  )
}

export default App