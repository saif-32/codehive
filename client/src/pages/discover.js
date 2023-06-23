import '../styles/discover.css'
import axios from 'axios'
import { useNavigate, useParams, Link} from "react-router-dom"
import { useState, useEffect } from 'react';

export const Discover = () => {

    const [currentSearch, setCurrentSearch] = useState("main");

    const [userUniversity, setUserUniversity] = useState("")
    const [userLevel, setUserLevel] = useState("")
    const [userInterests, setUserInterests] = useState("")
    const [userLanguage, setUserLanguage] = useState("")

    const [userSearchButtonClicked, setUserSearchButtonClicked] = useState(false);
    const [userSchoolSearch, setUserSchoolSearch] = useState(false);
    const [userlevelSearch, setUserLevelSearch] = useState(false);
    const [userInterestsSearch, setUserInterestsSearch] = useState(false);
    const [userLanguageSearch, setUserLanguageSearch] = useState(false);



    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState();
    


    const handleSchool = () => {
        setCurrentSearch("school");
    };

    const userSearch = async (event) => {
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

    const schoolSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/discover/users/school", {
                userUniversity
            })
            const { count, users } = response.data;
            setUserSchoolSearch(true);
            setUserCount(count);
            setUsers(users);
        } catch (err) {
            console.log(err)
        }
    }

    const levelSearch = async (event) => { 
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/discover/users/level", {
                userLevel
            })
            const { count, users } = response.data;
            setUserLevelSearch(true);
            setUserCount(count);
            setUsers(users);
        } catch (err) {
            console.log(err)
        }
    }

    const interestsSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/discover/users/interests", {
                userInterests
            })
            const { count, users } = response.data;
            setUserInterestsSearch(true);
            setUserCount(count);
            setUsers(users);
        } catch (err) {
            console.log(err)
        }
    }

    const languageSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/discover/users/languages", {
                userLanguage
            })
            const { count, users } = response.data;
            setUserLanguageSearch(true);
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
                            <h1 className="filter-heading">Level</h1>
                            <h1 className="filter-heading">Interests</h1>
                            <h1 className="filter-heading">Language</h1>
                        </div>
                    </div>
                </>
            )}


            {userSearchButtonClicked && (
                <>
                <div className="show-users discover-container">
                    {userCount > 0 ? (<h4>Showing {userCount} results:</h4>) : (<h4>No results found.</h4>)}
                    <h1>Connect with others!</h1>

                    <label htmlFor="discoverSearch"></label>
                    <input type="text" id="discoverSearch" className='discover-search'/>

                    <button type="button" onClick={userSearch} className="discover-search-user">Search User</button>

                    <div className='discover-cards'>
                        <div className='discover-card'>
                            <img className='card-profile-picture'  src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'></img>
                            <h1>username</h1>
                            <h4>Name: Donald Trump</h4>
                            <h4>Age: 24</h4>
                            <h4>University: University of California at Los Angeles</h4>
                            <h4>Languages: Javascript, Javascript</h4>
                            <h4>Interests: Game Development, Game Development, Game Development</h4>
                            <h4>Skill Level: Advanced</h4>
                        </div>
                        {users.map((user, index) => (
                            <div className='discover-card' key={index}>
                            <img className='card-profile-picture'  src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'></img>
                            <h1>{user.username}</h1>
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
            {!userSchoolSearch && (
                    <>
                        <div className="discover-container">
                        <img className='discover-logo'  src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'></img>
                        <h1>Search for School</h1>
                
                        <label htmlFor="discoverSearch"></label>
                        <input type="text" id="universitySearch" className='discover-search' value={userUniversity} onChange={(event) => setUserUniversity(event.target.value)}/>

                        <button type="submit" className="discover-search-user" onClick={schoolSearch}>Search School</button>
                        </div>
                    </>
                )}


            {userSchoolSearch && (
                <>
                    <div className="discover-container">
                    {userCount > 0 ? (<h4>Showing {userCount} results:</h4>) : (<h4>No results found.</h4>)}
                    <h1>Search for School</h1>
                    
                    <label htmlFor="discoverSearch"></label>
                    <input type="text" id="universitySearch" className='discover-search' value={userUniversity} onChange={(event) => setUserUniversity(event.target.value)}/>

                    <button type="submit" className="discover-search-user" onClick={schoolSearch}>Search School</button>
                    {users.map((user, index) => (
                                <div className='discover-card' key={index}>
                                <img className='card-profile-picture'  src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'></img>
                                <h1>{user.username}</h1>
                                <h4>Name: {user.firstName} {user.lastName}</h4>
                                <h4>Age: {user.age}</h4>
                                <h4>University: {user.university}</h4>
                                <h4>Languages: {user.languages}</h4>
                                <h4>Interests: {user.interests}</h4>
                                <h4>Skill Level: {users.skilLlevel}</h4>
                            </div>
                        ))}
                    </div>
                </>
                )}
        </>

    )}






    </div>
};