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
        <h1>Forgot Password</h1>
        <p>Enter your email below:</p>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          <button type="submit">Confirm Email</button>
          {error && <p>{error}</p>}
        </form>
    </div>
}