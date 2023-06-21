import '../styles/discover.css'
import axios from 'axios'
import { useNavigate, useParams, Link} from "react-router-dom"
import { useState, useEffect } from 'react';

export const Discover = () => {

    const [currentSearch, setCurrentSearch] = useState("main");
    const [userSearchButtonClicked, setUserSearchButtonClicked] = useState(false);
    const [users, setUsers] = useState([]);



    const handleSchool = () => {
        setCurrentSearch("school");
    };

    const userSearch = async (event) => { // Executes after Log in button is clicked.
        event.preventDefault();
        setUserSearchButtonClicked(true)

        try {
            const response = await axios.get("http://localhost:3001/discover/users")
            console.log(response.data)
            setUsers(response.data);
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
                    <h4>Results shown for XX results:</h4>
                    <h1>Connect with others!</h1>

                    <label htmlFor="discoverSearch"></label>
                    <input type="text" id="discoverSearch" className='discover-search'/>

                    <button type="button" onClick={userSearch} className="discover-search-user">Search User</button>

                    <div className='discover-cards'>
                        <div className='discover-card'></div>
                        <div className='discover-card'></div>
                        <div className='discover-card'></div>
                        <div className='discover-card'></div>
                        <div className='discover-card'></div>
                        <div className='discover-card'></div>
                        <div className='discover-card'></div>
                        <div className='discover-card'></div>
                    </div>
                                
                    {/* {users.map((user, index) => (
                                    <h3 key={index}>{user.firstName}</h3>
                    ))} */}
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