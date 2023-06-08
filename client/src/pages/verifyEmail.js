import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from 'axios'

export const VerifyEmail = () => {
    const {username, token} = useParams();
    const [isValidToken, setIsValidToken] = useState(false);
    const navigate = useNavigate();

    console.log("Hello" + username)

    try {
      const response = axios.post("http://localhost:3001/auth/verify-email", {
        username,
        token
      });
      return <div>Email was verified</div>
    } catch (err) {
      console.error(err)
      return <div>Could not be verified.</div>
    }
  
  };

    // const response = axios.post("http://localhost:3001/auth/verify-email", {
    //     username,
    //     token
    // })

    // console.log("Sent correctly")
    
    
    // .then(response => {
    // const responseStatus = response.data.status;
    // if (responseStatus === "okay") {
    //     setIsValidToken(true);
    //     }
    // })



    // function verifyEmailToken(username, emailToken){
    //     console.log("Verify email function was called.")
    //     const response = axios.post("http://localhost:3001/auth/verify-email", {
    //           username,
    //           emailToken,
    //     })
    //     .then(response => {
    //         const responseStatus = response.data.status;
    //         if (responseStatus === "okay") {
    //             setIsValidToken(true);
    //         }
    //     })
    // };

    // useEffect(() => {
    //     verifyEmailToken(username, token)
    // }, [])

    
    // return css based off valid token or not isValidToken ? :

