import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios'


export const Register = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();


  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        firstName,
        lastName,
        username,
        email,
        password
      });
      alert("Registration info was sent to backend.")
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  };  
    
    return <div>
            <a class="btn btn-block btn-social btn-twitter">
              <span class="fa fa-twitter"></span> Sign in with Twitter</a>
    </div>;
};