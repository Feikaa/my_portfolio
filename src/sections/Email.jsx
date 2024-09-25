import React, { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';

function Email() {
    const form = useRef();
    const recaptcha = useRef();
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

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
      <label>Subject</label>
      <br />
      <input type="text" required onChange={(e) => setSubject(e.target.value)} value={subject} />
      <br />
      <br />
      <label>Email</label>
      <br />
      <input type="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
      <br />
      <br />
      <label>Message</label>
      <br />
      <input name="message" required onChange={(e) => setMessage(e.target.value)} value={message} />
      <br />
      <br />
      <ReCAPTCHA sitekey={import.meta.env.VITE_SITE_KEY} ref={recaptcha} />
      <button type="submit">Send</button>
    </form>
  )
}

export default Email