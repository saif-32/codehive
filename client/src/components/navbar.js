import { Link, useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from 'axios'

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [data, setData] = useState(null);
    const [loadingFinished, setLoadingFinished] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = () => {
            axios({
              method: "GET",
              withCredentials: true,
              url: "http://localhost:3001/auth/user",
            }).then((res) => {
              setData(res.data);
              setLoadingFinished(true);
              console.log(res.data);
            });
          };
    
        getUser(); // Call the function when the component mounts
      }, []);


        const logout = () => {
            console.log("Attempting to logout from navbar.js")
            axios({
                method: "GET",
                withCredentials: true,
                url: "http://localhost:3001/auth/logout",
            }).then((res) => {
                console.log("User was logged out successfully.")
                navigate(0);
            });
        };





    return ( 
    
    <div>

            {!loadingFinished && (
                            <>
                                <nav>
                                <header class="p-3 text-bg-dark">
                                        <div class="container">
                                        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                                            <img src="https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png" width="60" height="60"></img> 
                                        </div>
                                        </div>
                                </header>

                                </nav>
                            </>
            )}

            {loadingFinished && (
                            <>
                            {!data ? (
            // If user is not signed in, display this navbar.
            <div> 
                <nav>
                    {
                        <header class="p-3 text-bg-dark">
                            <div class="container">
                            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                                <img src="https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png" width="60" height="60"></img>
                                <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"></a>
            
                                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                <li id="hello"><NavLink 
                                    to="/" 
                                    className={({ isActive, isPending }) =>
                                        isPending ? "nav-link px-2 text-white" : isActive ? "nav-link px-2" : "nav-link px-2 text-white"
                                    }>
                                        Home
                                </NavLink></li>
                                <li><NavLink 
                                    to="/register" 
                                    className={({ isActive, isPending }) =>
                                        isPending ? "nav-link px-2 text-white" : isActive ? "nav-link px-2" : "nav-link px-2 text-white"
                                    }>
                                        Register
                                </NavLink></li>
                                <li><NavLink 
                                    to="/login" 
                                    className={({ isActive, isPending }) =>
                                        isPending ? "nav-link px-2 text-white" : isActive ? "nav-link px-2" : "nav-link px-2 text-white"
                                    }>
                                        Login
                                </NavLink></li>
                                </ul>
            
                                <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                                <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"></input>
                                </form>
            
            
                                <div class="text-end">
                                    <Link to="/login" >
                                        <button type="button" onclick=<Link to="/login" ></Link> class="btn btn-outline-light me-2">Login</button>
                                    </Link>
                                    <Link to="/register" >
                                        <button type="button" class="btn btn-warning">Sign Up</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        </header>
                    }
                </nav>
            </div>
    ) :
            <div> 
                <nav>
                    {
                        <header class="p-3 text-bg-dark">
                            <div class="container">
                            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                                <img src="https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png" width="60" height="60"></img>
                                <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"></a>
            
                                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                <li id="hello"><NavLink 
                                    to="/" 
                                    className={({ isActive, isPending }) =>
                                        isPending ? "nav-link px-2 text-white" : isActive ? "nav-link px-2" : "nav-link px-2 text-white"
                                    }>
                                        Home
                                </NavLink></li>
                                <li><NavLink 
                                    to="/profile" 
                                    className={({ isActive, isPending }) =>
                                        isPending ? "nav-link px-2 text-white" : isActive ? "nav-link px-2" : "nav-link px-2 text-white"
                                    }>
                                        Profile
                                </NavLink></li>
                                <li><NavLink 
                                    to="/discover" 
                                    className={({ isActive, isPending }) =>
                                        isPending ? "nav-link px-2 text-white" : isActive ? "nav-link px-2" : "nav-link px-2 text-white"
                                    }>
                                        Discover
                                </NavLink></li>
                                </ul>
            
                                <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                                <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"></input>
                                </form>
            
            
                                <div class="text-end">
                                    <Link to="/profile" >
                                        <button type="button" onclick=<Link to="/profile" ></Link> class="btn btn-outline-light me-2">Profile</button>
                                    </Link>
                                    <button type="button" onClick={logout} class="btn btn-warning">Log Out</button>
                                </div>
                            </div>
                        </div>
                        </header>
                    }
                </nav>
            </div>
        }
                            </>
            )}
    </div>
        );
    }



