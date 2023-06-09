import { useState, useEffect } from "react";
import { useNavigate, useParams, Link} from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from 'axios'
import '../styles/email.css'

export const VerifyEmail = () => {
    const {username, token} = useParams();
    const [isValidToken, setIsValidToken] = useState(false);
    const navigate = useNavigate();

    console.log("Hello" + username)

    const response = axios.post("http://localhost:3001/auth/verify-email", {
        username,
        token
      }).then(response => {
        const responseStatus = response.data.status;
        if (responseStatus === "okay") {
          setIsValidToken(true);
        }
      })

      return <div>
        {isValidToken ?     
          <div className="email-container">
            <img src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'></img>
            <div className="email-card">
              <h1>You have been successfully registered!</h1>
              <h3>Get ready to to start innovating! You can close this tab and login <Link to="/login"
                className="register-link">here</Link>
              </h3>
          </div>
    </div> 
        : <div>
        <div className="email-container">
          <img src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'></img>
              <div className="email-card">
                <h1>Your verification token is invalid, please try again.</h1>
                <h3>We're sorry but your verification token is expired or invalid. Please register again <Link to="/register"
                className="register-link">here</Link>
                </h3>
            </div>
        </div>
        </div>}
      </div>
  };

