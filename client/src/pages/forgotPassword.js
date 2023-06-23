import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'

export const ForgotPassword = () => {
    const [email, setEmail]  = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        
        const response = axios.post("http://localhost:3001/password/forgot-password", {
          email
        }).then(response => {
          alert("Token is being validated...")
        })
    }

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