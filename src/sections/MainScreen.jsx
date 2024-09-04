import React, { useEffect, useRef, useState } from 'react';
import PDF from '../icons/pdf.svg';
import Grid from '@mui/material/Grid2';
import Draggable from 'react-draggable';

const MainScreen = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [icons, setIcons] = useState([PDF]);

  const [deltaPosition, setDeltaPosition] = useState([0, 0]);

  const handleDrag = (e, ui) => {
    setDeltaPosition([e.clientX, e.clientY]);
  };

  const handleStop = () => {
    console.log("stopped");
    console.log(deltaPosition);
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
    // remove the event listener before the component gets unmounted
    return () => window.removeEventListener("resize", getsize);
  }, [ref]);

  // TODO: maybe remove the array. With the Draggable, I can make it so I can just calculate the locations
  // of the grid, and make it snap to the nearest slot. No array needed
  useEffect(() => {
    if (icons.length === 1 && width > 0 && height > 0) {
      var a = new Array(Math.round(Math.floor((width + 40) / 120) * Math.floor((height - 40) / 120)) - icons.length).fill(null);
      setIcons((icons) => [...icons, ...a]);
    }
  }, [height, width]);

  return (
      <section ref={ref} className='w-full h-full absolute p-2' style={{ flexGrow: 1 }}>
        <Grid container spacing={5} className='w-full' column={16}>
            {icons.map((c) => {
            return (
              <Draggable onDrag={handleDrag} onStop={handleStop}>
              <Grid item>
                {c !== null ? <div className='items-center justify-center align-middle flex-col w-20 h-20 text-white text-center'><img src={PDF} key={c} className='w-16 h-16 pointer-events-none' /><div className='w-16 h-16'>My Resume</div></div> : <div className='w-20 h-20'></div>}
              </Grid>
              </Draggable>
              )})}
            {/* <button onClick={() => {setIcons((icons) => [null, ...icons])}}>Press</button> */}
        </Grid>
      </section>
  )
}

export default MainScreen