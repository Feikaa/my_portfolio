import React from 'react';
import { Rnd } from 'react-rnd';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Resume from '../pdfs/Resume.pdf';
import '../WindowTypes.jsx';

function Window(props) {

  const maximized = props.maximized;
  const minimized = props.minimized;
  const onMove = props.onMove;
  const onResize = props.onResize;
  const toggleMinimize = props.toggleMinimize;
  const toggleMaximize = props.toggleMaximize;
  const handleClose = props.handleClose;
  const name = props.name;
  const size = props.size;
  const position = props.position;
  const width = props.width;
  const focusedWindow = props.focusedWindow;
  const bringToFront = props.bringToFront;
  const isPhone = width <= 768;

  const handleDragStop = (e, d) => {
    onMove({ x: d.x, y: d.y });
  }

  const handleResizeStop = (e, d, r, delta, p) => {
    // console.log(r);
    onResize({
      width: r.style.width,
      height: r.style.height,
    });

    onMove({
      x: p.x,
      y: p.y
    });
  }

  return (
    <div className='w-full absolute -translate-x-2 -translate-y-2 overflow-hidden pointer-events-none' style={{ height: `calc(100vh - 56px)`, display: minimized ? 'none' : 'block', zIndex: focusedWindow === name ? 3 : 1 }}>
    <Rnd className='flex bg-white border-2 flex-col pointer-events-auto' 
     size={isPhone ? { width: '100vw', height: '100vh' } : maximized ? { width: '100vw', height: '100vh' } : size}
     position={isPhone ? { x: 0, y: 0 } : maximized ? { x: 0, y: 0 } : position}
     maxHeight={'calc(100vh - 56px)'}
     onDragStop={handleDragStop}
     onResizeStop={handleResizeStop}
     minWidth={300} minHeight={300} dragHandleClassName='custom-header' bounds="parent" onMouseDown={bringToFront}>
      <div className='flex flex-col h-full border-2 border-solid relative'>
        <div className='px-4 py-2 cursor-move select-none flex items-center justify-center custom-header'>
          <span className='font-semibold'>{name}</span>
          {!isPhone ? <div className='flex space-x-2 ml-auto'>
          <button className='w-6 h-6 flex justify-center items-center hover:bg-blue-500 transition rounded' onClick={toggleMinimize}>_</button>
          <button className='w-6 h-6 flex justify-center items-center hover:bg-blue-500 transition rounded' onClick={toggleMaximize}>{maximized ? '🗗' : '🗖'}</button>
          <button className='w-6 h-6 flex justify-center items-center hover:bg-red-500 transition rounded' onClick={handleClose}>X</button>
          </div>
          :
          <div className='flex space-x-2 ml-auto'>
          <button className='w-6 h-6 flex justify-center items-center hover:bg-red-500 transition rounded cursor-pointer' onClick={handleClose}>X</button>
          </div>}
        </div>
        <div className='flex-grow overflow-hidden'>
          {/* <div className='bg-transparent z-10 top-0 bottom-0 right-0 left-0'> */}
            {name === "Resume" ?
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer fileUrl={Resume} defaultScale={SpecialZoomLevel.PageWidth} />
            </Worker>
            :
            "TODO"}
          {/* </div> */}
        </div>
      </div>

            {/* <iframe width="100%" height="100%" className='overflow-hidden' /> */}
    </Rnd>
    </div>
  )
}

export default Window