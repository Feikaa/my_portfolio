import React, { useState } from 'react'
import TaskBar from './sections/TaskBar'
import MainScreen from './sections/MainScreen'

const App = () => {
  const [windows, setWindows] = useState([]);
  const [focusedWindow, setFocusedWindow] = useState(null);

  const bringToFront = (id) => {
    setFocusedWindow(id);
  }

  const openWindow = (id) => {
    const windowExists = windows.some((window) => window.id === id);
    if (windowExists) {
      return;
    }

    setWindows((prev) => [
      ...prev,
      {
        id: id,
        minimized: false,
        maximized: false,
        position: { x: 100, y: 100 },
        size: { width: 600, height: 400 }
      }
    ])
  }

  const updateWindow = (id, newProps) => {
    setWindows((prev) => 
    prev.map((window) => 
    window.id === id ? { ...window, ...newProps } : window));
  }

  const toggleMaximize = (id) => {
    const currentWindow = windows.find((window) => window.id === id);
    updateWindow(id, { maximized: !currentWindow.maximized });
  };

  const toggleMinimize = (id) => {
    const currentWindow = windows.find((window) => window.id === id);
    updateWindow(id, { minimized: !currentWindow.minimized });
  };

  const handleClose = (id) => {
    setWindows((prev) => prev.filter((window) => window.id !== id));
  }

  return (
    <main className='bg-slate-800 w-full h-screen'>
      <MainScreen windows={windows} 
                  openWindow={openWindow} 
                  updateWindow={updateWindow} 
                  toggleMinimize={toggleMinimize} 
                  toggleMaximize={toggleMaximize} 
                  handleClose={handleClose}
                  focusedWindow={focusedWindow}
                  bringToFront={bringToFront} />
      <TaskBar windows={windows} toggleMinimize={toggleMinimize} focusedWindow={focusedWindow} bringToFront={bringToFront} />
    </main>
  )
}

export default App