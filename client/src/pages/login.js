export const Login = () => {
    return <div>
    <div className="login-container">
      <div className="login-card">
        <h1>Login to Code<span className="yellow">Hive</span></h1>
        <form className="login-form">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <a href="#" className="forgot-link">Forgot Username or Password?</a>
          <button type="submit">Log In</button>
        </form>
        <p className="signup-link">Don't have an account? <a href="#">Sign Up</a></p>

        <h3>Or Continue With</h3>
        
        <a href="#" class="social-button">
          <img src="logo.png" class="social-logo"></img>
          <span class="button-text">Login with Google</span>
        </a>

        <a href="#" class="social-button">
          <img src="logo.png" class="social-logo"></img>
          <span class="button-text">Login with Github</span>
        </a>


        <a href="#" class="social-button">
          <img src="logo.png" class="social-logo"></img>
          <span class="button-text">Login with LinkedIn</span>
        </a>


      </div>
    </div>
  </div>
};


