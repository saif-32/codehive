import { Navbar } from "../components/navbar"
import { useState, useEffect } from "react";
import axios from 'axios'
import '../styles/home.css'


export const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getUser = () => {
            axios({
              method: "GET",
              withCredentials: true,
              url: "http://localhost:3001/auth/user",
            }).then((res) => {
              setData(res.data);
              console.log(res.data.username);
            });
          };
    
        getUser(); // Call the function when the component mounts
      }, []);

    
    return <div> <Navbar />
      <section class="hero">
    <div class="hero-content">
      <h1>Connect. Collaborate. Code.</h1>
      <p>Welcome to CodeHive, the dynamic platform that brings computer science students worldwide to communicate, collaborate, and innovate together.</p>
      {/* <img src={data.profilePicture}></img> */}
      <a href="#join-now" class="cta-button">Join Now</a>
    </div>
  </section>

  <div class="typing-box">
  <div class="typing-text">
    <span class="python-line"><span class="python-keyword">print</span>(<span class="python-string">"Hello, World!"</span>)</span>
  </div>
  <span class="typing-cursor"></span>
</div>


  <section class="testimonials">
    <h2>What our users say</h2>
    <div class="testimonial">
      <blockquote>"CodeHive has revolutionized the way I collaborate with other students. I've found amazing projects and made lifelong connections!"</blockquote>
      <cite>- John Doe, Computer Science Student</cite>
    </div>
  </section>

  <section class="featured-projects">
    <h2>Featured Projects</h2>
    <div class="project">
      <h3>Project Name</h3>
      <p>Description of the project and the collaboration involved. Showcase the impact and success of the project.</p>
    </div>
  </section>




    </div>;
};