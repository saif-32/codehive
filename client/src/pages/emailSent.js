import '../styles/email.css'
import { useLocation } from "react-router-dom";
export const EmailSent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

    return <div>
    <div className="email-container">
    <img src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'></img>
      <div className="email-card">
        <h1>Your verification email has been <span class="light-yellow">sent to the following email:</span></h1>
        <div className='user-email-card'><h2>{email}</h2></div>
        <h3>Click the link in your email to verify your account. If you can't find the email, check
        your spam folder.</h3>
      </div>
    </div>
  </div>
};

