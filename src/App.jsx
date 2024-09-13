import React, { useState } from 'react'
import TaskBar from './sections/TaskBar'
import MainScreen from './sections/MainScreen'

const App = () => {
  const [currentWindows, setCurrentWindows] = useState([]);
  const [minimized, setMinimized] = useState([]);

  return (
    <main className='bg-slate-800 w-full h-screen'>
      <MainScreen currentWindows={currentWindows} setCurrentWindows={setCurrentWindows} minimized={minimized} setMinimized={setMinimized} />
      <TaskBar currentWindows={currentWindows} minimized={minimized} setMinimized={setMinimized} />
    </main>
  )
}

export default App