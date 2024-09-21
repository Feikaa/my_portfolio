import React, { useEffect, useRef, useState } from 'react';
import PDF from '../icons/pdf.svg';
import Folder from '../icons/folder.svg';
import Grid from '@mui/material/Grid2';
import Draggable from 'react-draggable';
import Window from './Window';
import { WindowType } from '../WindowTypes.jsx';

const MainScreen = (props) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [pressing, setPressing] = useState(false);
  const [icons, setIcons] = useState([PDF, Folder]);
  const [windowTypes, setWindowTypes] = useState([WindowType.Resume, WindowType.Folder]);
  const [names, setNames] = useState(["My Resume", "My Projects"]);
  const [positions, setPositions] = useState([{ x: 0, y: 0}, { x: 120, y: 0}]);
  const handleClose = props.handleClose;
  const openWindow = props.openWindow;
  const windows = props.windows;
  const updateWindow = props.updateWindow;
  const toggleMaximize = props.toggleMaximize;
  const toggleMinimize = props.toggleMinimize;
  const focusedWindow = props.focusedWindow;
  const bringToFront = props.bringToFront;

  const isInAnIcon = (x,y) => {
    if (x < 40 || x > width-40 || y < 0 || y > height-96) {
      return false;
    }
    
    let ax = x - 8;
    let ay = y - 8;

    let inSquareX = (ax % (120)) < 80;
    let inSquareY = (ay % (120)) < 80;

    return inSquareX && inSquareY;
  }

  const isOnAnIcon = (xy) => {
    for (const coords of positions) {
      if (coords.x === xy.x && coords.y === xy.y) {
        return true;
      }
    }
    return false;
  }

  const handleDblClick = (file) => {
    // if (!currentWindows.includes(file)) {
    //   setCurrentWindows((prev) => [...prev, file]);
    //   setMinimized((prev) => [...prev, false]);
    // }
    openWindow(file);
  }

  const snapToGrid = (x,y) => {
    const sx = Math.floor((x - 8) / (120)) * 120;
    const sy = Math.floor((y - 8) / (120)) * 120;

    return { x: sx, y: sy };
  }

  const handleStop = (e, ui, index) => {
    var x;
    var y;
    if (e instanceof MouseEvent) {
      x = e.clientX;
      y = e.clientY;
    } else if (e instanceof TouchEvent) {
      x = e.changedTouches[0].clientX;
      y = e.changedTouches[0].clientY;
    }
    if (isInAnIcon(x, y) && !isOnAnIcon(snapToGrid(x, y))) {
      const newPosition = snapToGrid(x, y);
      const updatedPositions = [...positions];
      updatedPositions[index] = newPosition;
      setPositions(updatedPositions);
    }
  }

  useEffect(() => {
    // when the component gets mounted
    setWidth(ref.current.offsetWidth - 16);
    setHeight(ref.current.offsetHeight - 16);
    // to handle page resize
    const getsize = () => {
      setWidth(ref.current.offsetWidth - 16);
      setHeight(ref.current.offsetHeight - 16);
    };
    window.addEventListener("resize", getsize);
    window.addEventListener("pointerdown", () => setPressing(true));
    window.addEventListener("pointerup", () => setPressing(false));
    // window.addEventListener("click", handleClick);
    // remove the event listener before the component gets unmounted
    return () => {
      window.removeEventListener("resize", getsize);
      window.removeEventListener("pointerdown", () => setPressing(true));
      window.removeEventListener("pointerup", () => setPressing(false));
    };
  }, [ref]);

  // useEffect(() => {
  //   console.log(pressing);
  // }, [pressing]);

  // TODO: maybe remove the array. With the Draggable, I can make it so I can just calculate the locations
  // of the grid, and make it snap to the nearest slot. No array needed
  // useEffect(() => {
  //   if (icons.length <= 4 && width > 0 && height > 0) {
  //     console.log("check")
  //     var a = new Array(Math.round(Math.floor((width + 40) / 120) * Math.floor((height - 40) / 120)) - icons.length).fill(PDF);
  //     var b = new Array(Math.round(Math.floor((width + 40) / 120) * Math.floor((height - 40) / 120)) - icons.length).fill(PDF);
  //     setIcons((icons) => [...icons, ...a]);
  //   }
  // }, [height, width]);

  return (
      <section ref={ref} className='w-full h-full absolute p-2' style={{ flexGrow: 1 }}>
        {/* TODO: Remove the grid because it automatically makes all the positions of the draggables 0,0, making any sort of movement with multiple icons impossible. instead im gonna manually set their positions as (8,8), (8,128), (8,248), etc. and add a new
                  row every x icons depending on the width */}
        <Grid container className='w-full' column={16}>
            {icons.map((c, index) => {
              // if (c !== null) {
                return (
                    <Draggable position={positions[index]} onStop={(e, ui) => handleStop(e, ui, index)} onTouchEnd={(e, ui) => handleStop(e, ui, index)}>
                      <Grid item>
                        <div onDoubleClick={() => {handleDblClick(windowTypes[index])}} tabIndex="0" className={`absolute items-center justify-center align-middle flex-col w-28 h-28 text-white text-center ${pressing ? '' : 'hover:bg-sky-500 focus-within:bg-blue-500'}`}><img src={icons[index]} key={c} className='w-16 h-16 pointer-events-none block m-auto' /><div className='text-sm w-16 h-8 block m-auto'>{names[index]}</div></div>
                      </Grid>
                  </Draggable>
                  )
              // } else {
              //   return (
              //   <Grid item>
              //     <div className='w-20 h-20 border'></div>
              //   </Grid>
              //   )
              // }
              }
              )}
            
            {windows.map((window) => {
              return (
                <Window name={window.id}
                        maximized={window.maximized} 
                        minimized={window.minimized} 
                        size={window.size}
                        position={window.position}
                        onMove={(newPosition) => updateWindow(window.id, { position: newPosition })} 
                        onResize={(newSize) => updateWindow(window.id, { size: newSize })} 
                        toggleMaximize={() => toggleMaximize(window.id)} 
                        toggleMinimize={() => toggleMinimize(window.id)} 
                        width={width} 
                        handleClose={() => handleClose(window.id)}
                        bringToFront={() => bringToFront(window.id)}
                        focusedWindow={focusedWindow} />
              )
            })}
        </Grid>
      </section>
  )
}

export default MainScreen