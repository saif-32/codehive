import { useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom"
import { useCookies } from "react-cookie"
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const getUser = () => {
          axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3001/auth/user",
          }).then((res) => {
            if (res.data) // If user is already signed in.
            {
              navigate("/")
            }
          });
        };
  
      getUser(); // Call the function when the component mounts
    }, []);


    const onSubmit = async (event) => { // Executes after Log in button is clicked.

      event.preventDefault();
      const response = await axios.post("http://localhost:3001/auth/login", {
          username,
          password
      }, {
        withCredentials: true
      }).then(response => {
        const responseData = response.data;
        const responseStatus = responseData.status;

        if (responseStatus === "okay") {
          console.log("User was logged in successfully!")
          // setCookies("access_token", responseData.token);
          // window.localStorage.setItem("userID", responseData.userID);
          navigate("/")
        }
        else {
          if (responseData.message === "Authentication Failed") {
            setErrorMessage("Username or password is incorrect");
          }

          if (responseData.message === "Not-Verified") {
            navigate("/register/email-sent")
          }

        }
      })
    };

    const GoogleLoginButton = async (event) => {
        window.location.href = 'http://localhost:3001/auth/google';
    }

    const GithubLoginButton = async (event) => {
      window.location.href = 'http://localhost:3001/auth/github';
  }


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
          <button type="submit" className="login-btn-1">Log In</button>

        </form>


        <p className="signup-link">Don't have an account? <Link to="/register"
                className="register-link">Sign Up</Link></p>
        
        <div className="or-seperator"><h3>Or Continue With</h3></div>

        <div className="social-media-button">
          <button className="btn btn-block btn-social btn-google" onClick={GoogleLoginButton}>
                <span className="fa fa-google"></span> Login with Google
          </button>
        </div>

        <div className="social-media-button">
          <button className="btn btn-block btn-social btn-github" onClick={GithubLoginButton}>
                <span className="fa fa-github"></span> Login with Github
          </button>
        </div>

        <div className="social-media-button">
          <a className="btn btn-block btn-social btn-linkedin">
                <span className="fa fa-linkedin"></span> Login with LinkedIn
          </a>
        </div>

      </div>
    </div>
  </div>
};

