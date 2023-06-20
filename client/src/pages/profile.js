import { useState, useEffect } from 'react';
import { useNavigate, Link} from "react-router-dom"
import '../styles/profile.css';
import test from './test.txt'
import axios from 'axios'

export const Profile = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [transitionDirection, setTransitionDirection] = useState('');
  const [universities, setUniversities] = useState([]);
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [interests, setInterests] = useState([]);
  const [currentInterest, setCurrentInterest] = useState('');
  const [data, setData] = useState(null);
  const navigate = useNavigate();


  const [userUsername, setUserUsername] = useState("")
  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  const [userBirthdayMonth, setUserBirthdayMonth] = useState("")
  const [userBirthdayDay, setUserBirthdayDay] = useState("")
  const [userBirthdayYear, setUserBirthdayYear] = useState("")
  const [userGender, setUserGender] = useState("")
  const [userUniversity, setUserUniversity] = useState("")
  const [userGrade, setUserGrade] = useState("")
  const [userSkillLevel, setUserSkillLevel] = useState("")

  const [buttonClicked, setButtonClicked] = useState(false);


  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/user", {
          withCredentials: true,
        });
        
        if (response.data) {
          setUserUsername(response.data.username)
          setUserFirstName(response.data.firstName)
          setUserLastName(response.data.lastName)
          console.log(response.data.profileCompleted)

          if (response.data.profileCompleted) {
            setCurrentForm(6)
          }
        }
 
      } catch (error) {
        console.error(error);
      }
    };
  
    getUser();
  }, []);

  useEffect(() => {
    const getUser = () => {
        axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:3001/auth/user",
        }).then((res) => {
          if (!res.data)
          {
            navigate("/")
          }
        });
      };

    getUser();
  }, []);

  const onSubmit = async (event) => { // Executes after submit button is clicked.
    console.log("Submitting...")
    event.preventDefault();
    const response = await axios.post("http://localhost:3001/profile/create", {
      userUsername,
      userFirstName,
      userLastName,
      userBirthdayMonth,
      userBirthdayDay,
      userBirthdayYear,
      userGender,
      userUniversity,
      userGrade,
      programmingLanguages,
      interests,
      userSkillLevel
    }, {
      withCredentials: true
    }).then(response => {
      if (response.data.status === "okay") {
        handleNext()
      }
      console.log(response.data.status)
      alert("Succesfully created profile!")
    })
  };
  
  const handleNext = () => {
    setTransitionDirection('slide-out');
    setTimeout(() => {
      setCurrentForm(currentForm + 1);
      setTransitionDirection('slide-in');
    }, 400);
  };
  
  const handlePrevious = () => {
    setTransitionDirection('slide-out');
    setTimeout(() => {
      setCurrentForm(currentForm - 1);
      setTransitionDirection('slide-in');
    }, 400);
  };

  const handleLanguageChange = (e) => {
    let value = e.target.value;
    if (value.length > 10) {
      value = value.slice(0, 10); // Truncate the value to 10 characters
    }
    setCurrentLanguage(value);
  };

  const handleLanguageKeyPress = (e) => {
    if (e.key === 'Enter' && currentLanguage.trim() !== '') {
      if (programmingLanguages.length === 5) {
        return; // Limit reached, exit the function
      }

      setProgrammingLanguages((prevLanguages) => [...prevLanguages, currentLanguage.trim()]);
      setCurrentLanguage('');
    }
  };

  const handleInterestChange = (e) => {
    let value = e.target.value;
    if (value.length > 15) {
      value = value.slice(0, 15); // Truncate the value to 15 characters
    }
    setCurrentInterest(value);
  };

  const handleInterestKeyPress = (e) => {
    if (e.key === 'Enter' && currentInterest.trim() !== '') {
        if (interests.length === 5) {
            return; // Limit reached, exit the function
          }
      setInterests((prevInterests) => [...prevInterests, currentInterest.trim()]);
      setCurrentInterest('');
    }
  };

  const handleRemoveLanguage = (index) => {
    setProgrammingLanguages((prevLanguages) => prevLanguages.filter((_, i) => i !== index));
  };

  const handleRemoveInterest = (index) => {
    setInterests((prevInterests) => prevInterests.filter((_, i) => i !== index));
  };


  useEffect(() => {
    fetch(test)
      .then((response) => response.text())
      .then((text) => {
        const universitiesArray = text.split('\n').filter((university) => university.trim() !== '');
        setUniversities(universitiesArray);
      });
  }, []);

  return (
    <div className='form-container'>
      <div className="profile-container">
        <img className="reg-logo" src="https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png" alt="CodeHive Logo" />
        <form className="profile-form" onSubmit={onSubmit}>
          {currentForm === 1 && (
            <>
            <div className={`profile-card ${transitionDirection === 'slide-out' ? 'slide-out' : 'slide-in'}`}>
              <h2>Create your Code<span className="light-yellow">Hive </span>Profile</h2>
              <h3>Enter your name</h3>
              <div className='text-fields'>
                <label htmlFor="firstName"></label>
                <input type="text" id="firstName" placeholder="First Name" value={userFirstName} onChange={(event) => {
                  console.log(event.key)
                  let value = event.target.value.replace(/[^a-zA-Z]/g, ''); // Remove any non-alphabet characters
                  value = value.slice(0, 20);
                  setUserFirstName(value)}}
                  onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault(); // Prevent the form from submitting
                    document.getElementById("firstNext").click(); // Click the "Next" button
                  }
                }}
                  />
                <label htmlFor="lastName"></label>
                <input type="text" id="lastName" placeholder="Last Name" value={userLastName} onChange={(event) => {
                  let value = event.target.value.replace(/[^a-zA-Z]/g, ''); // Remove any non-alphabet characters
                  value = value.slice(0, 20);
                  setUserLastName(value)}}
                  onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault(); // Prevent the form from submitting
                    document.getElementById("firstNext").click(); // Click the "Next" button
                  }
                }}
                  />
              </div>
              <div className="button-container">
                <button className="profile-next first-next" type="button" id="firstNext" onClick={handleNext} disabled={userFirstName === "" || userLastName === ""}>Next</button>
              </div>
            </div>
            </>
          )}
          {currentForm === 2 && (
            <>
            <div className={`profile-card ${transitionDirection === 'slide-out' ? 'slide-out' : 'slide-in'}`}>
            <div className="content-container">
            <h2>Basic Information</h2>
              <h3>Enter your birthday and gender</h3>
              <div className='text-fields'>
              <label htmlFor="birthdayMonth"></label>
              <select id="birthdayMonth" value={userBirthdayMonth} onChange={(event) => setUserBirthdayMonth(event.target.value)}>
                <option value="" disabled selected>Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option> 
             </select>


             <label htmlFor="birthdayDay"></label>
            <input
                  type="number"
                  id="birthdayDay"
                  min="1"
                  max="31"
                  placeholder="Day"
                  value={userBirthdayDay}
                  onChange={(event) => {
                    let value = event.target.value.slice(0, 2);
                    value = value.replace(/[^0-9]/g, '');
                    if (/^(0?[1-9]|[12][0-9]|3[01])$/.test(value)) {
                      setUserBirthdayDay(value);
                    } else {
                      setUserBirthdayDay('');
                    }
                  }}
              />



              <label htmlFor="birthdayYear"></label>
              <input type="number" id="birthdayYear" min="1900" max="2023" placeholder="Year" value={userBirthdayYear} 
              onChange={(event) => {
                let value = event.target.value.slice(0, 4);
                value = value.replace(/[^0-9]/g, '');
                if (value.length > 1 && /^[12]/.test(value)) {
                  setUserBirthdayYear(value);
                } else if (value === '1' || value === '2') {
                  setUserBirthdayYear(value);
                } else {
                  setUserBirthdayYear('');
                }
              }}
            />
              
              <div>
                <label htmlFor="gender"></label>
                <select id="gender" value={userGender} onChange={(event) => setUserGender(event.target.value)}>
                    <option value="" disabled selected>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
             </div>
            </div>

              <div className="button-container">
                <button className="profile-previous" type="button" onClick={handlePrevious}>Back</button>
                { console.log(userBirthdayMonth)}
                <button className="profile-next" onClick={handleNext} type="button" disabled={userBirthdayMonth === "" || userBirthdayYear === "" || userBirthdayDay == "" || userGender == ""}>Next</button>
              </div>
              </div>
              </div>
            </>
          )}
          {currentForm === 3 && (
            <>
            <div className={`profile-card ${transitionDirection === 'slide-out' ? 'slide-out' : 'slide-in'}`}>
                <h2>Student Information</h2>
                <h3>Enter your university and grade</h3>

                <div className='text-fields'>
                <div>
                    <label htmlFor="university"></label>
                    <input
                        type="text"
                        id="university"
                        list="university-list"
                        placeholder="Search for University"
                        value={userUniversity} 
                        onChange={(event) => {
                          setUserUniversity(event.target.value)}}
                    />
                    <datalist id="university-list">
                            {universities.map((university, index) => (
                            <option key={index} value={university} />
                            ))}
                    </datalist>
                </div>

                <label htmlFor="grade"></label>
                <select id="grade" value={userGrade}  onChange={(event) => setUserGrade(event.target.value)}>
                    <option value="" disabled selected>Grade</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophmore">Sophmore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                </select>
                </div>

              <div className="button-container">
                <button className="profile-previous" type="button" onClick={handlePrevious}>Back</button>
                <button className="profile-next" type="button" onClick={handleNext} disabled={userGrade == "" || userUniversity == ""}>Next</button>
              </div>
            </div>
            </>
          )}
          {currentForm === 4 && (
            <>
            <div className={`profile-card ${transitionDirection === 'slide-out' ? 'slide-out' : 'slide-in'}`} style={{height: '500px'}}>
            <h2>Programmer Information</h2>
            <h3>Last step! Enter your programming details</h3>

            <div className='text-fields'>
                <div>
                    <div>
                        <input
                        type="text"
                        value={currentLanguage}
                        id="p-languages"
                        onChange={handleLanguageChange}
                        onKeyPress={handleLanguageKeyPress}
                        placeholder="Enter programming languages here"
                        />
                        <div className="input-boxes">
                        {programmingLanguages.map((language, index) => (
                            <div key={index} className="input-box">
                            {language}
                            <button className="remove-button" type="button" onClick={() => handleRemoveLanguage(index)}>x</button>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div>
                        <input
                        type="text"
                        value={currentInterest}
                        id="p-interests"
                        onChange={handleInterestChange}
                        onKeyPress={handleInterestKeyPress}
                        placeholder="Enter interests here (AI, Web Development, etc.)"
                        />
                        <div className="input-boxes">
                        {interests.map((interest, index) => (
                            <div key={index} className="input-box">
                            {interest}
                            <button className="remove-button" type="button" onClick={() => handleRemoveInterest(index)}>x</button>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <label htmlFor="skill"></label>
                <select id="skillLevel" value={userSkillLevel}  onChange={(event) => setUserSkillLevel(event.target.value)}>
                    <option value="" disabled selected>Skill Level</option>
                    <option value="Novice">Novice</option>
                    <option value="Sophmore">Advanced Beginner</option>
                    <option value="Junior">Compotent</option>
                    <option value="Senior">Proficient</option>
                </select>
            </div>

              <div className="button-container-last button-container">
                <button className="profile-previous" type="button" onClick={handlePrevious}>Back</button>
                <button className="profile-next" type='submit' disabled={userSkillLevel == "" || interests == "" || programmingLanguages == ""
                }>Submit</button>
              </div>
            </div>
            </>
          )}
          {currentForm === 5 && (
            <>
            <div className={`profile-card ${transitionDirection === 'slide-out' ? 'slide-out' : 'slide-in'}`}>
            <h2>Your Code<span className="light-yellow">Hive </span>Profile was successfully created!</h2>
            <h3>Get ready to unleash your innovative spirit and connect with talented students from around the world.
            <br /> <br /> Head over to the <span className="light-yellow">Discover </span> page to explore exciting collaboration opportunities and start making an impact together. Happy coding!</h3>
            </div>
            </>
          )}
          {currentForm === 6 && (
            <>
            <div className={`profile-card ${transitionDirection === 'slide-out' ? 'slide-out' : 'slide-in'}`}>
            <h2>Your Code<span className="light-yellow">Hive </span>Profile was already created!</h2>
            <h3>This should display a user edit page.</h3>
            </div>
            </>
          )}
          </form>
      </div>
    </div>
  );
};
