import '../styles/discover.css'
import axios from 'axios'
import { useNavigate, useParams, Link} from "react-router-dom"
import { useState, useEffect } from 'react';

export const Discover = () => {

    const [currentSearch, setCurrentSearch] = useState("main");
    const [userSearchButtonClicked, setUserSearchButtonClicked] = useState(false);
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState();
    


    const handleSchool = () => {
        setCurrentSearch("school");
    };

    const userSearch = async (event) => { // Executes after Log in button is clicked.
        event.preventDefault();
        setUserSearchButtonClicked(true)

        try {
            const response = await axios.get("http://localhost:3001/discover/users")
            console.log(response.data)

            const { count, users } = response.data;
            setUserCount(count);
            setUsers(users);
        } catch (err) {
            console.log(err)
        }
    }

    return <div className='discover-background'>

        {currentSearch === "main" && (
        <>
            {!userSearchButtonClicked && (
                <>
                    <div className="discover-container">
                    <img className='discover-logo'  src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'></img>
                    <h1>Connect with others!</h1>

                    <label htmlFor="discoverSearch"></label>
                    <input type="text" id="discoverSearch" className='discover-search'/>

                    <button type="button" onClick={userSearch} className="discover-search-user">Search User</button>
                        <div className="discover-seperator"><h3>Or, Filter By...</h3></div>
                        <div className='filters'>
                            <h1 onClick={handleSchool} className="filter-heading">School</h1>
                            <h1 className="filter-heading">Age</h1>
                            <h1 className="filter-heading">Interests</h1>
                            <h1 className="filter-heading">Language</h1>
                        </div>
                    </div>
                </>
            )}


            {userSearchButtonClicked && (
                <>
                <div className="show-users discover-container">
                    <h4>Showing {userCount} results:</h4>
                    <h1>Connect with others!</h1>

                    <label htmlFor="discoverSearch"></label>
                    <input type="text" id="discoverSearch" className='discover-search'/>

                    <button type="button" onClick={userSearch} className="discover-search-user">Search User</button>

                    <div className='discover-cards'>
                        <div className='discover-card'>
                            <img className='card-profile-picture'  src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'></img>
                            <h1>@username</h1>
                            <h4>Name: Donald Trump</h4>
                            <h4>Age: 24</h4>
                            <h4>University: University of California at Los Angeles</h4>
                            <h4>Languages: Python, C, C++</h4>
                            <h4>Interests: Game Development, AI</h4>
                            <h4>Skill Level: Advanced</h4>
                        </div>
                        {users.map((user, index) => (
                            <div className='discover-card' key={index}>
                            <img className='card-profile-picture'  src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'></img>
                            <h1>@{user.username}</h1>
                            <h4>Name: {user.firstName} {user.lastName}</h4>
                            <h4>Age: {user.age}</h4>
                            <h4>University: {user.university}</h4>
                            <h4>Languages: {user.languages}</h4>
                            <h4>Interests: {user.interests}</h4>
                            <h4>Skill Level: {users.skilLlevel}</h4>
                        </div>
                    ))}
                    </div>
                </div>
                </>
            )}

        </>
    )}

        {currentSearch === "school" && (
        <>
        <div className="discover-container">
            <h4>Results shown for XX results:</h4>
            <h1>Search for School</h1>

            <label htmlFor="discoverSearch"></label>
            <input type="text" id="discoverSearch" className='discover-search'/>

            <button type="button" className="discover-search-user">Search School</button>
            </div>
        </>
        )}

    </div>
};