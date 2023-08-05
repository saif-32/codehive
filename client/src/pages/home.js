import { Navbar } from "../components/navbar"
import { useState, useEffect } from "react";
import axios from 'axios'
import '../styles/home.css'


export const Home = () => {
    const [data, setData] = useState(null);
    const [selectedImage, setSelectedImage] = useState("https://media.discordapp.net/attachments/798251319847813200/1136442385593806938/image.png?width=1350&height=700")

  const handlePointClick = (image) => {
    setSelectedImage(image);
  }

    useEffect(() => {
        const getUser = () => {
            axios({
              method: "GET",
              withCredentials: true,
              url: "http://localhost:3001/auth/user",
            }).then((res) => {
              setData(res.data);
            });
          };
    
        getUser();
      }, []);

    return <div> 
    <Navbar />

    <div className="home-container">

      <section class="home-features">
        <div className="home-feature-heading">
          <h1><b>Welcome to CodeHive!</b></h1>
          <div class="row">
            <div className="column">
              <h3><b>Don't Have an Account?</b></h3>
              <p>If you don't have an account, you can register with us either through our registration or using a Google, Github, or LinkedIn!</p>
              <a className="home-feature-button" href="register">Sign Up With Us!</a>
            </div>
            <div className="column">
              <h3><b>What is CodeHive?</b></h3>
              <p>Unleash your coding potential with CodeHive! We're your collaborative hub for learning, creating, and connecting through code. Dive into interactive challenges, real-world projects, and a vibrant community of fellow students. Join us and be part of the coding evolution!</p>
            </div>
            <div className="column">
              <h3><b>Returning User?</b></h3>
              <p>Already have an account? Log in and find someone to collaborate with for a new project, or make new connections on the Hive!</p>
              <a className="home-feature-button" href="login">Log In</a>
            </div>
          </div>
          
          <hr class="solid"/>
        </div>
      </section>
      
      <div className="home-images-list">
          <div className="home-list">
            <ul className="home-features-list">
                <li>
                  <details>
                    <summary onClick={() => handlePointClick("https://cdn.discordapp.com/attachments/798251319847813200/1136443131131342908/Screenshot_2023-08-02_at_6.39.12_PM.png")}>
                    <b>Collaborate With Others</b>
                    </summary>
                    <p>The CodePen Editor is highly customizable. There is <strong>autocomplete and Emmet</strong> for speed and accuracy. Plus you can set up smart defaults for starting new work.</p>
                  </details>
                </li>

                <li>
                  <details>
                    <summary onClick={() => handlePointClick("https://media.discordapp.net/attachments/798251319847813200/1136447795977539634/image.png?width=1302&height=699")}>
                    <b>Find Others By Interest</b>
                    </summary>
                    <p>
                    "Connect with like-minded coders! Discover fellow enthusiasts by interests and dive into coding adventures together at <b>CodeHive</b>."
                    </p>
                  </details>
                </li>
            </ul>
          </div>
          <div>
            <img className="home-features-image" width="600px" src={selectedImage}></img>
          </div>
        </div>

    </div>
  </div>
};