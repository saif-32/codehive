import { Navbar } from "../components/navbar"
import { useState, useEffect } from "react";
import axios from 'axios'
import '../styles/home.css'
import Carousel from "react-bootstrap/Carousel"


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
            });
          };
    
        getUser();
      }, []);

    return <div> 
    <Navbar />

    <div className="home-container">
      <div className="carousel-container">
        <Carousel bg="light" fade interval={5000}>
            <Carousel.Item>
              <img className="d-block w-100" src="https://media.discordapp.net/attachments/1136400152542855168/1136400167008997427/image.png" alt="First slide"/>
              <Carousel.Caption>
                <h1><b>Welcome to CodeHive!</b></h1>
                <p>Welcome to CodeHive – where students collaborate, code, and create together! Join us to learn, share, and build amazing projects in a supportive coding community.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img className="d-block w-100" src="https://media.discordapp.net/attachments/798251319847813200/1136392943763210372/image.png?width=1123&height=700"/>
              <Carousel.Caption>
                <h1>Placeholder 2</h1>
                <p>Placeholder Paragraph</p>
              </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
      </div>
    </div>
  </div>
};