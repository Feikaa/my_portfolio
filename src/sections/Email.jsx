import React, { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'

function Email(props) {
    const form = useRef();
    const recaptcha = useRef();
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [message, setMessage] = useState("");
    const width = props.width;
    const height = props.height;
    const maximized = props.maximized;
    const isPhone = props.isPhone;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      if (emailRegex.test(e.target.value)) {
        setEmailError(false);
      } else {
        setEmailError(true);
      }
    }

    const sendEmail = (e) => {
        e.preventDefault();
        const captchaValue = recaptcha.current.getValue();
        if (!captchaValue) {
          alert("Please verify the CAPTCHA!");
        } else {

          // Change to prod whenever building
          fetch(`https://5al0mnbgri.execute-api.us-east-1.amazonaws.com/prod/email?email_subject=${subject}&from_name=${email}&message=${message}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ recaptcha: captchaValue })
          })
          .then((result) => {
              recaptcha.current.reset();
              setSubject("");
              setEmail("");
              setMessage("");
          })
          .catch((error) => {
            console.log(error);
        });
        }
    }

  return (
    <form ref={form} onSubmit={sendEmail}>
      <TextField error={emailError} helperText={emailError ? "Please input a valid email!" : ""} label="From" required variant='standard' sx={{ marginLeft: 2, paddingRight: 4,  width: isPhone ? '100%' : maximized ? '100%' : width }} onChange={handleEmailChange} value={email} />
      <br />
      <TextField label="Subject" required variant='standard' sx={{ marginLeft: 2, paddingRight: 4, paddingBottom: 2, width: isPhone ? '100%' : maximized ? '100%' : width }} onChange={(e) => setSubject(e.target.value)} value={subject} />
      <br />
      <div style={{ width: isPhone ? '100%' : maximized ? '100%' : width, height: height }} className='box-border ml-2 pr-5'>
        <textarea placeholder='Message' required style={{ height: height }} className='bg-slate-100 resize-none w-full border-b-2 border-gray-500' onChange={(e) => setMessage(e.target.value)} value={message}  />
      </div>
      <br />
      <div className='px-4'>
        <ReCAPTCHA sitekey={import.meta.env.VITE_SITE_KEY} ref={recaptcha} className='inline-block' />
        <Button type="submit" variant='contained' endIcon={<SendIcon />} className='float-right' disabled={emailError}>Send</Button>
      </div>
    </form>
  )
}

export default Email