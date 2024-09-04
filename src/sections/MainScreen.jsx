import React, { useEffect, useRef, useState } from 'react';
import PDF from '../icons/pdf.svg';
import Grid from '@mui/material/Grid2';

const MainScreen = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [icons, setIcons] = useState([PDF]);

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

  useEffect(() => {
    console.log(ref.current.offsetWidth);
    if (icons.length === 1 && width > 0 && height > 0) {
      var a = new Array(Math.round((width / 118.47619) * (height / 127.2)) - 2).fill(null);
      setIcons((icons) => [...icons, ...a]);
    }
  }, [height, width]);

  return (
      <section ref={ref} className='w-full h-full absolute p-2' style={{ flexGrow: 1 }}>
        <Grid container spacing={5} className='w-full' column={16}>
            {icons.map((c) => {
            return (
              <Grid item>
                {c !== null ? <div className='items-center justify-center align-middle flex-col w-20 h-20 text-white text-center'><img src={PDF} key={c} className='w-16 h-16' /><div className='w-16 h-16'>My Resume</div></div> : <div className='w-20 h-20'></div>}
              </Grid>)
            })}
            {/* <button onClick={() => {setIcons((icons) => [null, ...icons])}}>Press</button> */}
        </Grid>
      </section>
  )
}

export default MainScreen