import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from 'axios'

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    console.log(cookies.access_token)

    useEffect(() => { // If user is already signed in, redirect back to home page.
      if (cookies.access_token) {
        navigate("/");
      }
    }, [navigate, cookies.access_token]);

    const onSubmit = async (event) => {

      event.preventDefault();
      const response = await axios.post("http://localhost:3001/auth/login", {
          username,
          password
      }).then(response => {
        const responseData = response.data;
        const responseStatus = responseData.status;

        if (responseStatus === "okay") {
          console.log("User was logged in successfully!")
          setCookies("access_token", responseData.token);
          window.localStorage.setItem("userID", responseData.userID);
          navigate("/")
        }
        else {
          if (responseData.message === "Username-Not-Found" || responseData.message === "Incorrect-Password" ) {
            setErrorMessage("Username or password is incorrect");
          }

          if (responseData.message === "Not-Verified") {
            navigate("/register/email-sent")
          }

        }
      })
    };


    return <div>
    <div className="login-container">
      <div className="login-card">
        <h1>Login to Code<span className="yellow">Hive</span></h1>

        <form className="login-form" onSubmit={onSubmit}>

          <label htmlFor="username"></label>
          <input type="text" id="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}/>
          <label htmlFor="password"></label>
          <input type="password" id="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>

          <p>{errorMessage}</p>
          <a href="#" className="forgot-link">Forgot Username or Password?</a>
          <button type="submit">Log In</button>

        </form>


        <p className="signup-link">Don't have an account? <a href="#">Sign Up</a></p>
        
        <div class="or-seperator"><h3>Or Continue With</h3></div>

        <div className="social-media-button">
          <a class="btn btn-block btn-social btn-google">
                <span class="fa fa-google"></span> Login with Google
          </a>
        </div>

        <div className="social-media-button">
          <a class="btn btn-block btn-social btn-github">
                <span class="fa fa-github"></span> Login with Github
          </a>
        </div>

        <div className="social-media-button">
          <a class="btn btn-block btn-social btn-linkedin">
                <span class="fa fa-linkedin"></span> Login with LinkedIn
          </a>
        </div>

      </div>
    </div>
  </div>
};

