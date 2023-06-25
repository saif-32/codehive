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

    
    return <div> 
    <Navbar />

    <div className="home-container">

          <div className="home-tagline">
            <h1>Connect. Collaborate. Code.</h1>
            <p>Welcome to Code<span className="yellow">Hive</span>, the dynamic platform that brings computer science students worldwide to communicate, collaborate, and innovate together.</p>
            <a href="#join-now" class="cta-button">Join Now</a>
          </div>

          <div className="features-container">
            <div className="feature-box">
              <img src="https://cdn.discordapp.com/attachments/708410306006876231/1122618242691772457/download_1.jpeg" alt="Feature 1 Icon" />
              <h2>Discover</h2>
              <p>Explore a diverse community of computer science students and discover like-minded peers based on their interests, languages, universities, and more.</p>
            </div>
            <div className="feature-box">
              <img src="https://cdn.discordapp.com/attachments/708410306006876231/1122618242691772457/download_1.jpeg" alt="Feature 2 Icon" />
              <h2>Collaborate</h2>
              <p>Engage in meaningful collaborations with other students, share ideas, work on projects together, and foster innovation in the field of computer science.</p>
            </div>
            <div className="feature-box">
              <img src="https://cdn.discordapp.com/attachments/708410306006876231/1122618242691772457/download_1.jpeg" alt="Feature 3 Icon" />
              <h2>Innovate</h2>
              <p>Push the boundaries of computer science by participating in hackathons, coding competitions, and innovative challenges to showcase your skills and creativity.</p>
            </div>
          </div>



    </div>
  </div>
};