import React, { useEffect, useRef, useState } from 'react';
import PDF from '../icons/pdf.svg';
import Grid from '@mui/material/Grid2';
import Draggable from 'react-draggable';

const MainScreen = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [icons, setIcons] = useState([PDF]);
  const [positions, setPositions] = useState([{ x: 0, y: 0}]);

  const isInAnIcon = (x,y,index) => {
    if (x < 0 || x > width || y < 0 || y > height) {
      return false;
    }
    
    let ax = x - 8;
    let ay = y - 8;

    let inSquareX = (ax % (120 * (1 + index))) < 80;
    let inSquareY = (ay % (120)) < 80;

    return inSquareX && inSquareY;
  }

  const handleClick = (e) => {

    e = e || window.e;
    var target = e.srcElement;
    console.log([e.clientX, e.clientY]);
    var rect = target.getBoundingClientRect();
    console.log(rect.top, rect.left, rect.bottom, rect.right);
  }

  const snapToGrid = (x,y,index) => {
    const sx = Math.floor((x - 8) / (120 * (1 + index))) * 120;
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
    if (isInAnIcon(x, y, index)) {
      const newPosition = snapToGrid(x, y, index);
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
    window.addEventListener("click", handleClick);
    // remove the event listener before the component gets unmounted
    return () => window.removeEventListener("resize", getsize);
  }, [ref]);

  // TODO: maybe remove the array. With the Draggable, I can make it so I can just calculate the locations
  // of the grid, and make it snap to the nearest slot. No array needed
  // useEffect(() => {
  //   if (icons.length <= 4 && width > 0 && height > 0) {
  //     console.log("check")
  //     var a = new Array(Math.round(Math.floor((width + 40) / 120) * Math.floor((height - 40) / 120)) - icons.length).fill(null);
  //     setIcons((icons) => [...icons, ...a]);
  //   }
  // }, [height, width]);

  console.log(icons);

  return (
      <section ref={ref} className='w-full h-full absolute p-2' style={{ flexGrow: 1 }}>
        <Grid container spacing={5} className='w-full' column={16}>
            {icons.map((c, index) => {
              // if (c !== null) {
                return (
                    <Draggable position={positions[index]} onStop={(e, ui) => handleStop(e, ui, index)} onTouchEnd={(e, ui) => handleStop(e, ui, index)}>
                      <Grid item>
                        <div className='items-center justify-center align-middle flex-col w-20 h-20 text-white text-center'><img src={PDF} key={c} className='w-16 h-16 pointer-events-none block m-auto' /><div className='w-16 h-16 block m-auto'>My Resume</div></div>
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
            {/* <button onClick={() => {setIcons((icons) => [null, ...icons])}}>Press</button> */}
        </Grid>
      </section>
  )
}

export default MainScreen