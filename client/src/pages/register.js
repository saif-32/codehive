import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios'


export const Register = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        firstName,
        lastName,
        username,
        email,
        password
      }).then(response => {
        const responseData = response.data;
        const responseStatus = responseData.status;

        if (responseStatus === "okay") {
          console.log("User was logged in successfully!")
          navigate("/register/email-sent?email=" + encodeURIComponent(email));
        }

        if (responseData.Message === "All-Fields-Required") {
          console.log("hello")
          setErrorMessage("All fields are required!");
        }

        if (responseData.Message === "Username-Exists") {
          setErrorMessage("This username already exists");
        }

        if (responseData.Message === "Email-Exists") {
          setErrorMessage("This email already exists");
        }

        if (responseData.Message === "Password-Not-Strong") {
          setErrorMessage("Your password is not strong enough. Make sure it has at least 8 characters.");
        }

      })
    } catch (err) {
      console.error(err)
    }
  };  
    
    return <div>
      <div className="reg-container">
        <div className="reg-card">
        <h1>Sign Up With Code<span className="yellow">Hive</span></h1>

          <img className="reg-logo" src="https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png" alt="CodeHive Logo"/>
          <form className="login-form" onSubmit={onSubmit}>
            <p className="reg-error">{errorMessage}</p>
            <label htmlFor="email"></label>
            <input type="text" id="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
            <label htmlFor="firstName"></label>
            <input type="text" id="firstName" placeholder="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
            <label htmlFor="lastName"></label>
            <input type="text" id="lastName" placeholder="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)}/>
            <label htmlFor="username"></label>
            <input type="text" id="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}/>
            <label htmlFor="password"></label>
            <input type="password" id="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            <button type="submit">Sign Up</button>
          </form>

          <div class="or-seperator"><h3>Or Continue With</h3></div>

          <div className="social-media-button">
            <a class="btn btn-block btn-social btn-google">
                  <span class="fa fa-google"></span> Sign Up with Google
            </a>
          </div>

          <div className="social-media-button">
            <a class="btn btn-block btn-social btn-github">
                  <span class="fa fa-github"></span> Sign Up with Github
            </a>
          </div>

          <div className="social-media-button">
            <a class="btn btn-block btn-social btn-linkedin">
                  <span class="fa fa-linkedin"></span> Sign Up with LinkedIn
            </a>
          </div>
        </div>
      </div>
      
    </div>;
};