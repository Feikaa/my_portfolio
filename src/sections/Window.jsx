import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Resume from '../pdfs/Resume.pdf';

function Window(props) {

  const [maximized, setMaximized] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [position, setPosition] = useState({ x: 100, y: 100});
  const currentWindows = props.currentWindows;
  const setCurrentWindows = props.setCurrentWindows;

  const toggleMaximized = () => {
    setMaximized(!maximized);
    console.log(Math.floor(width / 612))
  };

  const handleClose = () => {
    setCurrentWindows(l => l.filter(item => item !== "resume"))
  }

  const handleDragStop = (e, d) => {
    setPosition({ x: d.x, y: d.y });
  }

  const handleResizeStop = (e, d, r, delta, p) => {
    setSize({
      width: r.offsetWidth,
      height: r.offsetHeight
    });

    setPosition({
      x: p.x,
      y: p.y
    });
  }

  // TODO: on phone, the window will just take up the entire screen, since u cant drag and resize on mobile it seems
  return (
    <Rnd className='flex bg-white border-2 flex-col' 
     size={maximized ? { width: '100vw', height: '100vh' } : size}
     position={maximized ? { x: -8, y: -8 } : position}
     maxHeight={'calc(100vh - 56px)'}
     onDragStop={handleDragStop}
     onResizeStop={handleResizeStop}
     minWidth={300} minHeight={300} dragHandleClassName='custom-header'>
      <div className='flex flex-col h-full border-2 border-solid relative'>
        <div className='px-4 py-2 cursor-move select-none flex items-center justify-center custom-header'>
          <span className='font-semibold'>Resume</span>
          {<div className='flex space-x-2 ml-auto'>
          <button className='w-6 h-6 flex justify-center items-center hover:bg-blue-500 transition rounded'>_</button>
          <button className='w-6 h-6 flex justify-center items-center hover:bg-blue-500 transition rounded' onClick={toggleMaximized}>{maximized ? '🗗' : '🗖'}</button>
          <button className='w-6 h-6 flex justify-center items-center hover:bg-red-500 transition rounded' onClick={handleClose}>X</button>
          </div>}
        </div>
        <div className='flex-grow overflow-hidden'>
          {/* <div className='bg-transparent z-10 top-0 bottom-0 right-0 left-0'> */}
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer fileUrl={Resume} defaultScale={SpecialZoomLevel.PageWidth} />
            </Worker>
          {/* </div> */}
        </div>
      </div>

            {/* <iframe width="100%" height="100%" className='overflow-hidden' /> */}
    </Rnd>
  )
}

export default Window