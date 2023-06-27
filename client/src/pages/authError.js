import '../styles/email.css'
import { Link} from "react-router-dom"

export const AuthError = () => {

    return <div className='discover-background'> 
    <div className='discover-container'>
                        <div className="discover-invalid-container">
                            <img src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png' alt="logo"></img>
                            <div className="discover-invalid">
                            <h1>Registration Error</h1>
                            <h2>We apologize but something went wrong. Please try registering within our website if the problem persists or contact us at help@codehive.com</h2>
                            </div>
                        </div>
                    </div>
                    </div>
};
