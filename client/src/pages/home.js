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
      <Carousel bg="light" fade interval={5000}>
          <Carousel.Item>
            <img className="d-block w-100" src="..." alt="First slide"/>
            <Carousel.Caption>
              <h1>Welcome to CodeHive!</h1>
              <p>CodeHive is a ...</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src="..."/>
            <Carousel.Caption>
              <h1>Placeholder 2</h1>
              <p>Placeholder Paragraph</p>
            </Carousel.Caption>
          </Carousel.Item>
      </Carousel>

    </div>
  </div>
};