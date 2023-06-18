import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const ForgotPassword = () => {
    const [email, setEmail]  = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        
        try {
          const response = await axios.post('http://localhost:3001/forgot-password', { email });
            alert("Email verified, initiating password reset process.")
            //navigate("/")
        } catch (err) {
          console.error(err)
        }
      }; 

    return <div>
        <h1>Forgot Password</h1>
        <p>Enter your email below:</p>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          <button type="submit">Confirm Email</button>
        </form>
    </div>
}