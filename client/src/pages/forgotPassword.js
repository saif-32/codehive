import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'

export const ForgotPassword = () => {
    const [email, setEmail]  = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        
        try {
          const response = await axios.post("http://localhost:3001/password/forgot-password", {
              email
          });
          alert("Token is being validated..."); // Success case
      } catch (error) {
          if (error.response && error.response.status === 404) {
              setError("This email is not registered. Please enter a registered email.");
          } else {
              setError("An error occurred. Please try again later."); // Handle other errors if needed
          }
      }
  };

    return <div>
        <div className="forgot-pass-container">
          <div className="forgot-pass-card">
            <img className="reg-logo" src="https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png" alt="CodeHive Logo"/>
              <h1>Forgot Password</h1>
              <p>Enter your email below:</p>
              <form className="login-form" onSubmit={onSubmit}>
                <input type="text" id="email" name="email" placeholder="Email:" required value={email} onChange={(event) => setEmail(event.target.value)} />
                <button className="reg-sign-up" type="submit">Confirm Email</button>
                {error && <p className="forgot-pass-error">{error}</p>}
              </form>
            </div>
          </div>
    </div>
}