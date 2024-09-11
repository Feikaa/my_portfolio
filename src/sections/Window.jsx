import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { Document, Page } from 'react-pdf';
import Resume from '../pdfs/Resume.pdf';

function Window() {
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({numPages}) => {
    setPageNumber(numPages);
  }

  return (
    <Rnd className='flex bg-white border-2 flex-col' default={{
        x: 100,
        y: 100,
        width: 640,
        height: 640,
    }} minWidth={300} minHeight={300}>
            <header className='h-8 flex items-center justify-center'>Header UI here</header>
            <iframe src={Resume} width="100%" height="100%" className='overflow-hidden' />
    </Rnd>
  )
}

export default Window