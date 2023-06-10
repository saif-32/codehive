import { Navbar } from "../components/navbar"
import { useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from 'axios'


export const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getUser = () => {
            console.log("HELLO GETTING USER")
            axios({
              method: "GET",
              withCredentials: true,
              url: "http://localhost:3001/auth/user",
            }).then((res) => {
              setData(res.data);
              console.log(res.data);
            });
          };
    
        getUser(); // Call the function when the component mounts
      }, []);

    
    return <div> <Navbar />
        <div style={{backgroundImage: "url('https://transparenttextures.com/patterns/always-grey.png')"}}>
            <div class="container col-xxl-8 px-4 py-5">
                <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div class="col-10 col-sm-8 col-lg-6">
                    <img src="logo.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"></img>
                </div>
                <div class="col-lg-6">
                    <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">CodeHive</h1>
                    {data ? <p>Welcome Back {data.username}</p> : null}
                    <p class="lead">A dynamic platform that brings computer science students worldwide to communicate, collaborate, and innovate together.</p>
                    <button type="button" class="btn btn-lg btn-warning">Start Innovating</button>
                </div>
            </div>
        </div>
    </div>


    </div>;
};