import '../styles/discover.css'
import test from './test.txt'
import axios from 'axios'
import { useNavigate, Link} from "react-router-dom"
import { useState, useEffect } from 'react';

export const Discover = () => {

    const [userId, setUserId] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [addedFriends, setAddedFriends] = useState([]);


    const [currentSearch, setCurrentSearch] = useState("");
    const [universities, setUniversities] = useState([]);
    const [userUniversity, setUserUniversity] = useState("")
    const [userMainSearch, setUserMainSearch] = useState("")
    const [userLevel, setUserLevel] = useState("")
    const [userInterests, setUserInterests] = useState("")
    const [userLanguage, setUserLanguage] = useState("")
    const [userSearchButtonClicked, setUserSearchButtonClicked] = useState(false);
    const [userSchoolSearch, setUserSchoolSearch] = useState(false);
    const [userLevelSearch, setUserLevelSearch] = useState(false);
    const [userInterestsSearch, setUserInterestsSearch] = useState(false);
    const [userLanguageSearch, setUserLanguageSearch] = useState(false);
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = () => {
            axios({
              method: "GET",
              withCredentials: true,
              url: "http://localhost:3001/auth/user",
            }).then((res) => {
              if (res.data) // If user is already signed in.
              {
                setUserId(res.data._id)
                setCurrentUser(res.data)
                console.log("Hello")
                console.log(currentUser)
                if (res.data.profileCompleted)
                {
                    setCurrentSearch("main")
                }
                else {
                    setCurrentSearch("invalid")
                }
              }
              else
              {
                navigate("/login")
              }
            });
          };
    
        getUser(); // Call the function when the component mounts
      }, [navigate]);

      useEffect(() => {
        fetch(test)
          .then((response) => response.text())
          .then((text) => {
            const universitiesArray = text.split('\n').filter((university) => university.trim() !== '');
            setUniversities(universitiesArray);
          });
      }, []);
    


    const handleSchool = () => {
        setCurrentSearch("school");
    };

    const handleLevel = () => {
        setCurrentSearch("level");
    };

    const handleInterests = () => {
        setCurrentSearch("interests");
    };

    const handleLanguages = () => {
        setCurrentSearch("languages");
    };

    const userSearch = async (event) => {
        event.preventDefault();
        try {
            console.log(userMainSearch)
            const response = await axios.post("http://localhost:3001/discover/users", {
                userMainSearch
            })
            const { count, users } = response.data;
            setUserSearchButtonClicked(true)
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


    const handleSchoolKeyPress = (e) => {
        if (e.key === 'Enter') {
          schoolSearch(e);
        }
    };

    const handleMainSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
          userSearch(e);
        }
    };

    const handleLevelKeyPress = (e) => {
        if (e.key === 'Enter') {
          levelSearch(e);
        }
    };

    const handleInterestsKeyPress = (e) => {
        if (e.key === 'Enter') {
          interestsSearch(e);
        }
    };

    const handleLanguageKeyPress = (e) => {
        if (e.key === 'Enter') {
          languageSearch(e);
        }
    };

    const addFriend = async (friendId) => {
        console.log("Initiating add friend...")

        if (friendId === userId) {
            console.log("You cannot add yourself as a friend.");
            return;
          }
        
        if (currentUser.friends.includes(friendId)) {
            console.log("This user is already added as a friend.");
            return;
          }

        setAddedFriends((prevAddedFriends) => [...prevAddedFriends, friendId]);
        currentUser.friends.push(friendId);


        try {
            await axios.post("http://localhost:3001/auth/add-friends", {
                userId: userId,
                friendId: friendId
            })
        } 
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        console.log(addedFriends);
      }, [addedFriends]);






    return <div className='discover-background'>

        {currentSearch === "" && (
                <>
                <div className='discover-container'></div>
                </>
    )}

        {currentSearch === "main" && (
        <>
            {!userSearchButtonClicked && (
                <>
                    <div className="discover-container">
                    <img className='discover-logo'  src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png' alt="logo"></img>
                    <h1>Connect with others!</h1>

                    <label htmlFor="discoverSearch"></label>
                    <input type="text" id="discoverSearch" className='discover-search' value={userMainSearch} onChange={(event) => setUserMainSearch(event.target.value)} onKeyPress={handleMainSearchKeyPress}/>

                    <button type="button" onClick={userSearch} className="discover-search-user">Search User</button>
                        <div className="discover-seperator"><h3>Or, Filter By...</h3></div>
                        <div className='filters'>
                            <h1 onClick={handleSchool} className="filter-heading">School</h1>
                            <h1 onClick={handleLevel} className="filter-heading">Level</h1>
                            <h1 onClick={handleInterests} className="filter-heading">Interests</h1>
                            <h1 onClick={handleLanguages} className="filter-heading">Language</h1>
                        </div>
                    </div>
                </>
            )}


            {userSearchButtonClicked && (
                <>

                <div className="discover-container">
                    {userCount > 0 ? (<h4>Showing {userCount} results:</h4>) : (<h4>No results found.</h4>)}
                    <h1>Connect with others!</h1>

                    <label htmlFor="discoverSearch"></label>
                    <input type="text" id="discoverSearch" className='discover-search' value={userMainSearch} onChange={(event) => setUserMainSearch(event.target.value)} onKeyPress={handleMainSearchKeyPress}/>

                    <button type="button" onClick={userSearch} className="discover-search-user">Search User</button>

                    <div className='discover-cards'>
                        {users.map((user, index) => (
                            <div className='discover-card' key={index}>
                            <button
                            className={`discover-card-button ${user._id === userId || currentUser.friends.includes(user._id) ? 'disabled' : ''}`}
                            onClick={() => addFriend(user._id)}
                            disabled={user._id === userId || currentUser.friends.includes(user._id) || addedFriends.includes(user._id)}>
                            {user._id === userId || currentUser.friends.includes(user._id) ? (
                                <span className="check-mark">&#10003;</span>
                                ) : (
                                '+'
                                )}
                            </button>
                            <img className='card-profile-picture'  src={user.profilePicture || 'https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'} alt="Profile"></img>                         
                            <h1>{user.username}</h1>
                            <h4>Name: {user.firstName} {user.lastName}</h4>
                            <h4>Age: {user.age}</h4>
                            <h4>University: {user.university}</h4>
                            <h4>Languages: {user.languages.join(', ')}</h4>
                            <h4>Interests: {user.interests.join(', ')}</h4>
                            <h4>Skill Level: {user.skillLevel}</h4>
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
                        <img className='discover-logo'  src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png' alt="logo"></img>
                        <h1>Search for School</h1>
                
                        <label htmlFor="discoverSearch"></label>
                        <input type="text" id="universitySearch" list="university-list" className='discover-search' value={userUniversity} onChange={(event) => setUserUniversity(event.target.value)} onKeyPress={handleSchoolKeyPress}/>
                        <datalist id="university-list">
                            {universities.map((university, index) => (
                            <option key={index} value={university} />
                            ))}
                        </datalist>

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
                    <input type="text" id="universitySearch" list="university-list" className='discover-search' value={userUniversity} onChange={(event) => setUserUniversity(event.target.value)} onKeyPress={handleSchoolKeyPress}/>
                    <datalist id="university-list">
                            {universities.map((university, index) => (
                            <option key={index} value={university} />
                            ))}
                    </datalist>

                    <button type="submit" className="discover-search-user" onClick={schoolSearch}>Search School</button>
                    <div className='discover-cards'>
                    {users.map((user, index) => (
                            <div className='discover-card' key={index}>
                            <button
                            className={`discover-card-button ${user._id === userId || currentUser.friends.includes(user._id) ? 'disabled' : ''}`}
                            onClick={() => addFriend(user._id)}
                            disabled={user._id === userId || currentUser.friends.includes(user._id) || addedFriends.includes(user._id)}>
                            {user._id === userId || currentUser.friends.includes(user._id) ? (
                                <span className="check-mark">&#10003;</span>
                                ) : (
                                '+'
                                )}
                            </button>

                                <img className='card-profile-picture'  src={user.profilePicture || 'https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'} alt="Profile"></img>                               
                                <h1>{user.username}</h1>
                                <h4>Name: {user.firstName} {user.lastName}</h4>
                                <h4>Age: {user.age}</h4>
                                <h4>University: {user.university}</h4>
                                <h4>Languages: {user.languages.join(', ')}</h4>
                                <h4>Interests: {user.interests.join(', ')}</h4>
                                <h4>Skill Level: {user.skillLevel}</h4>
                            </div>
                        ))}
                    </div>
                    </div>
                </>
                )}
        </>

    )}

        {currentSearch === "level" && (
            <>
                {!userLevelSearch && (
                        <>
                            <div className="discover-container">
                            <img className='discover-logo'  src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png' alt='logo'></img>
                            <h1>Search for Skill Level</h1>
                    
                            <label htmlFor="discoverSearch"></label>
                            <input type="text" id="universitySearch" className='discover-search' value={userLevel} onChange={(event) => setUserLevel(event.target.value)} onKeyPress={handleLevelKeyPress}/>

                            <button type="submit" className="discover-search-user" onClick={levelSearch}>Search Level</button>
                            </div>
                        </>
                    )}


                {userLevelSearch && (
                    <>
                        <div className="discover-container">
                        {userCount > 0 ? (<h4>Showing {userCount} results:</h4>) : (<h4>No results found.</h4>)}
                        <h1>Search for Skill Level</h1>
                        
                        <label htmlFor="discoverSearch"></label>
                        <input type="text" id="universitySearch" className='discover-search' value={userLevel} onChange={(event) => setUserLevel(event.target.value)} onKeyPress={handleLevelKeyPress}/>

                        <button type="submit" className="discover-search-user" onClick={levelSearch}>Search Level</button>
                        <div className='discover-cards'>
                            {users.map((user, index) => (
                                        <div className='discover-card' key={index}>
                                        <button
                                            className={`discover-card-button ${user._id === userId || currentUser.friends.includes(user._id) ? 'disabled' : ''}`}
                                            onClick={() => addFriend(user._id)}
                                            disabled={user._id === userId || currentUser.friends.includes(user._id) || addedFriends.includes(user._id)}>
                                            {user._id === userId || currentUser.friends.includes(user._id) ? (
                                                <span className="check-mark">&#10003;</span>
                                                ) : (
                                                '+'
                                                )}
                                        </button>
                                        <img className='card-profile-picture'  src={user.profilePicture || 'https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'} alt="Profile"></img>                                        <h1>{user.username}</h1>
                                        <h4>Name: {user.firstName} {user.lastName}</h4>
                                        <h4>Age: {user.age}</h4>
                                        <h4>University: {user.university}</h4>
                                        <h4>Languages: {user.languages.join(', ')}</h4>
                                        <h4>Interests: {user.interests.join(', ')}</h4>
                                        <h4>Skill Level: {user.skillLevel}</h4>
                                    </div>
                                ))}
                        </div>
                        </div>
                    </>
                    )}
            </>

    )}

        {currentSearch === "interests" && (
                <>
                    {!userInterestsSearch && (
                            <>
                                <div className="discover-container">
                                <img className='discover-logo'  src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png' alt="logo"></img>
                                <h1>Search for Interests</h1>
                        
                                <label htmlFor="discoverSearch"></label>
                                <input type="text" id="universitySearch" className='discover-search' value={userInterests} onChange={(event) => setUserInterests(event.target.value)} onKeyPress={handleInterestsKeyPress}/>

                                <button type="submit" className="discover-search-user" onClick={interestsSearch}>Search Interests</button>
                                </div>
                            </>
                        )}


                    {userInterestsSearch && (
                        <>
                            <div className="discover-container">
                            {userCount > 0 ? (<h4>Showing {userCount} results:</h4>) : (<h4>No results found.</h4>)}
                            <h1>Search for Interests</h1>
                            
                            <label htmlFor="discoverSearch"></label>
                            <input type="text" id="universitySearch" className='discover-search' value={userInterests} onChange={(event) => setUserInterests(event.target.value)} onKeyPress={handleInterestsKeyPress}/>

                            <button type="submit" className="discover-search-user" onClick={interestsSearch}>Search Interests</button>
                            <div className='discover-cards'>
                                {users.map((user, index) => (
                                            <div className='discover-card' key={index}>
                                            <button
                                                className={`discover-card-button ${user._id === userId || currentUser.friends.includes(user._id) ? 'disabled' : ''}`}
                                                onClick={() => addFriend(user._id)}
                                                disabled={user._id === userId || currentUser.friends.includes(user._id) || addedFriends.includes(user._id)}>
                                                {user._id === userId || currentUser.friends.includes(user._id) ? (
                                                    <span className="check-mark">&#10003;</span>
                                                    ) : (
                                                    '+'
                                                    )}
                                            </button>
                                            <img className='card-profile-picture'  src={user.profilePicture || 'https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'} alt="Profile"></img>                                            <h1>{user.username}</h1>
                                            <h4>Name: {user.firstName} {user.lastName}</h4>
                                            <h4>Age: {user.age}</h4>
                                            <h4>University: {user.university}</h4>
                                            <h4>Languages: {user.languages.join(', ')}</h4>
                                            <h4>Interests: {user.interests.join(', ')}</h4>
                                            <h4>Skill Level: {user.skillLevel}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                        )}
                </>

    )}

        {currentSearch === "languages" && (
                <>
                    {!userLanguageSearch && (
                            <>
                                <div className="discover-container">
                                <img className='discover-logo'  src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png' alt="logo"></img>
                                <h1>Search for Language</h1>
                        
                                <label htmlFor="discoverSearch"></label>
                                <input type="text" id="universitySearch" className='discover-search' value={userLanguage} onChange={(event) => setUserLanguage(event.target.value)} onKeyPress={handleLanguageKeyPress}/>

                                <button type="submit" className="discover-search-user" onClick={languageSearch}>Search Languages</button>
                                </div>
                            </>
                        )}


                    {userLanguageSearch && (
                        <>
                            <div className="discover-container">
                            {userCount > 0 ? (<h4>Showing {userCount} results:</h4>) : (<h4>No results found.</h4>)}
                            <h1>Search for Language</h1>
                            
                            <label htmlFor="discoverSearch"></label>
                            <input type="text" id="universitySearch" className='discover-search' value={userLanguage} onChange={(event) => setUserLanguage(event.target.value)} onKeyPress={handleLanguageKeyPress}/>

                            <button type="submit" className="discover-search-user" onClick={languageSearch}>Search Languages</button>
                            <div className='discover-cards'>
                                {users.map((user, index) => (
                                            <div className='discover-card' key={index}>
                                            <button
                                                className={`discover-card-button ${user._id === userId || currentUser.friends.includes(user._id) ? 'disabled' : ''}`}
                                                onClick={() => addFriend(user._id)}
                                                disabled={user._id === userId || currentUser.friends.includes(user._id) || addedFriends.includes(user._id)}>
                                                {user._id === userId || currentUser.friends.includes(user._id) ? (
                                                    <span className="check-mark">&#10003;</span>
                                                    ) : (
                                                    '+'
                                                    )}
                                            </button>
                                            <img className='card-profile-picture'  src={user.profilePicture || 'https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'} alt="Profile"></img>
                                            <h1>{user.username}</h1>
                                            <h4>Name: {user.firstName} {user.lastName}</h4>
                                            <h4>Age: {user.age}</h4>
                                            <h4>University: {user.university}</h4>
                                            <h4>Languages: {user.languages.join(', ')}</h4>
                                            <h4>Interests: {user.interests.join(', ')}</h4>
                                            <h4>Skill Level: {user.skillLevel}</h4>
                                        </div>
                                    ))}
                            </div>
                            </div>
                        </>
                        )}
                </>

    )}

        {currentSearch === "invalid" && (
                    <>
                    <div className='discover-container'>
                        <div className="discover-invalid-container">
                            <img src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png' alt="logo"></img>
                            <div className="discover-invalid">
                            <h1>Profile Incomplete</h1>
                            <h2>To access the Discover page, 
                            please complete your <Link to="/profile" className='discover-invalid-link'>Profile</Link> first. Fill in all the required fields and provide necessary information. 
                            This will help us tailor the content and recommendations specifically for you.</h2>
                            </div>
                        </div>
                    </div>
                    </>

    )}


    </div>
};