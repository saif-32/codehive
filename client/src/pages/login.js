export const Login = () => {
    return <div><body>
    <div class="container">
      <img src="spotify-logo.png" alt="Spotify Logo" class="logo"></img>
      <h1>Welcome back to Spotify</h1>
      <form>
        <input type="text" placeholder="Email" required></input>
        <input type="password" placeholder="Password" required></input>
        <button type="submit">Log In</button>
      </form>
      <p class="signup-link">Don't have an account? <a href="#">Sign up for free</a></p>
    </div>
  </body>
  </div>;
};