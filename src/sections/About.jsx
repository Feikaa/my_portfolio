import React from 'react'
import Me from '../icons/me.jpg';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAws, faReact, faJs, faNodeJs } from '@fortawesome/free-brands-svg-icons';
import { Tooltip, Typography } from '@mui/material';

function About() {

  return (
    <div className='p-2 font-light leading-6 tracking-wider mb-4'>
    <div>
      <img src={Me} height="336px" width="336px" className='float-right m-2 rounded-sm shadow-lg' />
    </div>
    <div>
        <h1 className='text-3xl font-bold mb-4'>Hi! I'm Paul.</h1>
        I grew up in Sarnia, Ontario. In school, I gravitated towards math, and spent a lot of my free time on the computer. I quickly learned how much I adored computers, and learned everything I could about them. In high school, I tried programming for the first
        time, along with basic HTML, which is when I seriously considered becoming a programmer, so I applied to McMaster University for a Computer Science major in 2018. During my first year in university, I took a programming class, and the satisfaction and joy I felt from creating my first program was when I knew I picked the right career path. From then
        on, my passion and love for creating things through programming has stayed strong.
        
        I studied Computer Science for 5 years and graduated in June 2023. I'm currently based in Ontario, Canada. I'm passionate about web development, with hands-on experience in React, JavaScript, TypeScript, and NodeJS. I am currently learning AWS, too! 
        I'm eager to begin my career and am open to roles in front-end, 
        back-end, or full-stack development. I am constantly looking to challenge myself by learning new skills, expanding my knowledge in web development, and applying my current skills and knowledge to any work/projects I do. Creating sleek, 
        user-friendly websites with highly functional, efficient, and robust backends, along with being able to build and see projects I participate in slowly come to life drives my passion and motivation as a web developer.
        <br />
        <div className='flex justify-center space-x-10 my-4'>
          <Tooltip title={
            <React.Fragment>
              <Typography variant="h6">Projects using React</Typography>
              <Typography variant='body1'>
                - <a href='https://github.com/Feikaa/runecrafter' target='_blank' className='text-blue-300 underline'>Runecrafter</a><br />
                - <a href='https://github.com/Feikaa/realm-harvest' target='_blank' className='text-blue-300 underline'>Realm Harvest</a><br />
                - <a href='https://github.com/Feikaa/my_portfolio' target='_blank' className='text-blue-300 underline'>This Portfolio!</a><br />
                </Typography>
            </React.Fragment>
          } placement='top' arrow>
          <div className='transition duration-300 ease-in-out transform hover:scale-110'>
            <FontAwesomeIcon icon={faReact} size="5x" className='text-cyan-400 hover:text-blue-600 hover:animate-shake' onClick={(e) => handleClick(e, 'react')} />
          </div>
          </Tooltip>

          <Tooltip title={
            <React.Fragment>
              <Typography variant="h6">Projects using JavaScript/TypeScript</Typography>
              <Typography variant='body1'>
                - <a href='https://github.com/Feikaa/runecrafter' target='_blank' className='text-blue-300 underline'>Runecrafter</a><br />
                <p className='indent-6 text-sm'>- JavaScript</p>
                - <a href='https://github.com/Feikaa/realm-harvest' target='_blank' className='text-blue-300 underline'>Realm Harvest</a><br />
                <p className='indent-6 text-sm'>- TypeScript</p>
                - <a href='https://github.com/Feikaa/my_portfolio' target='_blank' className='text-blue-300 underline'>This Portfolio!</a><br />
                <p className='indent-6 text-sm'>- JavaScript</p></Typography>
            </React.Fragment>
          } placement='top' arrow>
          <div className='transition duration-300 ease-in-out transform hover:scale-110'>
            <FontAwesomeIcon icon={faJs} size="5x" className='text-yellow-400 hover:text-yellow-600 hover:animate-shake' />
          </div>
          </Tooltip>

          <Tooltip title={
            <React.Fragment>
              <Typography variant="h6">Projects using NodeJS</Typography>
              <Typography variant='body1'>
                - <a href='https://github.com/Feikaa/realm-harvest' target='_blank' className='text-blue-300 underline'>Realm Harvest</a><br />
                - <a href='https://github.com/Feikaa/my_portfolio' target='_blank' className='text-blue-300 underline'>This Portfolio!</a><br />
              </Typography>
            </React.Fragment>
          } placement='top' arrow>
          <div className='transition duration-300 ease-in-out transform hover:scale-110'>
            <FontAwesomeIcon icon={faNodeJs} size="5x" className='text-lime-500 hover:text-lime-700 hover:animate-shake' />
          </div>
          </Tooltip>

          <Tooltip title={
            <React.Fragment>
              <Typography variant="h6">Projects using AWS</Typography>
              <Typography variant='body1'>
              - <a href='https://github.com/Feikaa/my_portfolio' target='_blank' className='text-blue-300 underline'>This Portfolio!</a><br />
                <p className='indent-6 text-sm'>- Route 53, S3, Cloudfront, API Gateway, and Lambda</p></Typography>
            </React.Fragment>
          } placement='top' arrow>
          <div className='transition duration-300 ease-in-out transform hover:scale-110'>
            <FontAwesomeIcon icon={faAws} size="5x" className='text-slate-800 hover:text-slate-900 hover:animate-shake' />
          </div>
          </Tooltip>
        </div>
        <br />
        In my free time, I enjoy playing video games, learning to speak new languages such as Korean and Japanese, and baking sweets!
    </div>
    </div>
  )
}

export default About