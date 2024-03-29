import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import '../styles/profile.css';
import test from './test.txt'
import axios from 'axios'

export const Profile = () => {

  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (button) => {
    setActiveButton(button);
  };



  const [currentForm, setCurrentForm] = useState("");
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
  const [userEmail, setUserEmail] = useState("")
  const [userBirthdayMonth, setUserBirthdayMonth] = useState("")
  const [userBirthdayDay, setUserBirthdayDay] = useState("")
  const [userBirthdayYear, setUserBirthdayYear] = useState("")
  const [userGender, setUserGender] = useState("")
  const [userUniversity, setUserUniversity] = useState("")
  const [userGrade, setUserGrade] = useState("")
  const [userSkillLevel, setUserSkillLevel] = useState("")
  const [userProfilePicture, setUserProfilePicture] = useState("")
  const [postImage, setPostImage] = useState({ myFile : "" })


  const [settingsFirstName, setSettingsFirstName] = useState("")
  const [settingsLastName, setSettingsLastName] = useState("")
  const [settingsUsername, setSettingsUsername] = useState("")
  const [settingsEmail, setSettingsEmail] = useState("")
  const [settingsFirstPageErrors, setSettingsFirstPageErrors] = useState("")


  const [settingsOldPassword, setSettingsOldPassword] = useState("")
  const [settingsNewPassword, setSettingsNewPassword] = useState("")
  const [settingsConfirmNewPassword, setSettingsConfirmNewPassword] = useState("")
  const [settingsPasswordError, setSettingsPasswordError] = useState("")

  const [settingsGender, setSettingsGender] = useState("")
  const [settingsUniversity, setSettingsUniversity] = useState("")
  const [settingsGrade, setSettingsGrade] = useState("")
  const [settingsSkillLevel, setSettingsSkillLevel] = useState("")
  const [settingsBirthdayMonth, setSettingsBirthdayMonth] = useState("")
  const [settingsBirthdayDay, setSettingsBirthdayDay] = useState("")
  const [settingsBirthdayYear, setSettingsBirthdayYear] = useState("")
  const [settingsInformationError, setSettingsInformationError] = useState("")



  const [settingsProgrammingLanguages, setSettingsProgrammingLanguages] = useState([]);
  const [settingsCurrentProgrammingLanguages, setCurrentSettingsProgrammingLanguages] = useState('');

  const [settingsInterests, setSettingsInterests] = useState([]);
  const [settingsCurrentInterests, setCurrentSettingsInterests] = useState([]);

  const [userFriends, setUserFriends] = useState("");


  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/user", {
          withCredentials: true,
        });
        
        if (response.data) {
          setData(response.data)
          setUserUsername(response.data.username)
          setUserFirstName(response.data.firstName)
          setUserLastName(response.data.lastName)
          setUserProfilePicture(response.data.profilePicture)
          setUserEmail(response.data.email)



          setSettingsUsername(response.data.username)
          setSettingsEmail(response.data.email)
          setSettingsFirstName(response.data.firstName)
          setSettingsLastName(response.data.lastName)
          setSettingsGender(response.data.gender)
          setSettingsUniversity(response.data.university)
          setSettingsGrade(response.data.gradeLevel)
          setSettingsSkillLevel(response.data.skillLevel)
          setSettingsBirthdayMonth(response.data.birthdayMonth)
          setSettingsBirthdayDay(response.data.birthdayDay)
          setSettingsBirthdayYear(response.data.birthdayYear)
          setSettingsProgrammingLanguages(response.data.languages)
          setSettingsInterests(response.data.interests)

          const userId = response.data._id;
          const friendsData = await fetchUserFriends(userId);
          setUserFriends(friendsData);

          if (response.data.profileCompleted) {
            setCurrentForm(6)
            setActiveButton("Account")
          }
          else {
            setCurrentForm(1)
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

  useEffect(() => {
    fetch(test)
      .then((response) => response.text())
      .then((text) => {
        const universitiesArray = text.split('\n').filter((university) => university.trim() !== '');
        setUniversities(universitiesArray);
      });
  }, []);

  const fetchUserFriends = async (userId) => {
    try {
      const response = await fetch('http://localhost:3001/auth/get-friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onSettingsCancel = async (event) => {
    event.preventDefault();
    setPostImage(userProfilePicture)
    setSettingsUsername(userUsername)
    setSettingsFirstName(userFirstName)
    setSettingsLastName(userLastName)
    setSettingsEmail(userEmail)
  };

  const onPasswordCancel = async (event) => {
    event.preventDefault();
    setSettingsOldPassword("")
    setSettingsNewPassword("")
    setSettingsConfirmNewPassword("")
  };

  const onInformationCancel = async (event) => {
    event.preventDefault();
    setSettingsGender(data.gender)
    setSettingsUniversity(data.university)
    setSettingsGrade(data.gradeLevel)
    setSettingsSkillLevel(data.skillLevel)
    setSettingsBirthdayMonth(data.birthdayMonth)
    setSettingsBirthdayDay(data.birthdayDay)
    setSettingsBirthdayYear(data.birthdayYear)
    setSettingsProgrammingLanguages(data.languages)
    setSettingsInterests(data.interests)
  };

  const onSettingsSubmit = async (event) => {
    event.preventDefault();
    createPost(postImage)
    const username = data.username
    const response = await axios.post("http://localhost:3001/auth/edit-account", {
      username,
      settingsFirstName,
      settingsLastName,
      settingsUsername,
      settingsEmail,
    }, {
      withCredentials: true
    }).then(response => {
      const responseData = response.data;
      if (response.data.status === "okay") {
        setSettingsFirstPageErrors("Your account informaiton was successfully modified.");
      }

      if (responseData.Message === "All-Fields-Required") {
        setSettingsFirstPageErrors("All fields are required");
      }

      if (responseData.Message === "Invalid-Email") {
        setSettingsFirstPageErrors("Invalid email format");
      }

      if (responseData.Message === "Username-Already-Exists") {
        setSettingsFirstPageErrors("That username already exists");
      }

      if (responseData.Message === "Email-Already-Exists") {
        setSettingsFirstPageErrors("That email already exists");
      }

      if (response.data.status === "error") {
        setSettingsFirstPageErrors("An error occured, please try again later");
      }

    })
  };

  const onPasswordChangeSubmit = async (event) => {
    event.preventDefault();
    const username = data.username
    const response = await axios.post("http://localhost:3001/auth/edit-account/password", {
      username,
      settingsOldPassword,
      settingsNewPassword,
      settingsConfirmNewPassword,
    }, {
      withCredentials: true
    }).then(response => {
      const responseData = response.data;
      if (response.data.status === "okay") {
        setSettingsPasswordError("Your password was succesfully changed.");
      }

      if (responseData.Message === "All-Fields-Required") {
        setSettingsPasswordError("All fields are required");
      }

      if (responseData.Message === "Incorrect old password") {
        setSettingsPasswordError("Your current password is incorrect");
      }

      if (responseData.Message === "New password and confirm password do not match") {
        setSettingsPasswordError("New password and confirm password do not match");
      }

      if (responseData.Message === "Password-Not-Strong") {
        setSettingsPasswordError("Password is not strong enough");
      }

    })
  };

  const onInformationChangeSubmit = async (event) => {
    event.preventDefault();
    const username = data.username
    const response = await axios.post("http://localhost:3001/auth/edit-account/information", {
      username,
      settingsBirthdayMonth,
      settingsBirthdayDay,
      settingsBirthdayYear,
      settingsGender,
      settingsUniversity,
      settingsGrade,
      settingsProgrammingLanguages,
      settingsInterests,
      settingsSkillLevel,
    }, {
      withCredentials: true
    }).then(response => {
      const responseData = response.data;
      if (response.data.status === "okay") {
        setSettingsInformationError("Your profile was succesfully updated.");
      }

      if (responseData.Message === "All-Fields-Required") {
        setSettingsInformationError("All fields are required");
      }
    })
  };

  const onSubmit = async (event) => { // Executes after submit button is clicked.
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
    })
  };

  const removeFriend = async (friendId) => {
    try {
      const response = await fetch('http://localhost:3001/auth/remove-friend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: data._id, friendId }), // Replace currentUser._id with the actual user ID
      });
  
      if (response.ok) {
        const updatedFriends = userFriends.filter((friend) => friend._id !== friendId);
        setUserFriends(updatedFriends);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleNext = () => {
    if (currentForm === 1)
    {
      createPost(postImage)
    }

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
      if (programmingLanguages.length === 3) {
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
        if (interests.length === 3) {
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

  const createPost = async (newImage) => {
    try {
      console.log("Initiating profile change...")
        const userProfile = data.username
        const response = await axios.post("http://localhost:3001/upload/profile-picture", {
            userProfile,
            newImage,
        }, {
            withCredentials: true
          })
    }catch(error){

    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const base64 = await convertToBase64(file);
      setPostImage({ ...postImage, myFile: base64 });
    }
  };

  const handleSettingsLanguageChange = (e) => {
    let value = e.target.value;
    if (value.length > 10) {
      value = value.slice(0, 10); // Truncate the value to 10 characters
    }
    setCurrentSettingsProgrammingLanguages(value);
  };

  const handleSettingsLanguageKeyPress = (e) => {
    if (e.key === 'Enter' && settingsCurrentProgrammingLanguages.trim() !== '') {
      if (settingsProgrammingLanguages.length === 3) {
        return; // Limit reached, exit the function
      }

      setSettingsProgrammingLanguages((prevSettingsLanguages) => [...prevSettingsLanguages, settingsCurrentProgrammingLanguages.trim()]);
      setCurrentSettingsProgrammingLanguages('');
    }
  };

  const handleSettingsRemoveLanguage = (index) => {
    setSettingsProgrammingLanguages((prevSettingsLanguages) => prevSettingsLanguages.filter((_, i) => i !== index));
  };

  const handleSettingsInterestsChange = (e) => {
    let value = e.target.value;
    if (value.length > 10) {
      value = value.slice(0, 10); // Truncate the value to 10 characters
    }
    setCurrentSettingsInterests(value);
  };

  const handleSettingsInterestKeyPress = (e) => {
    if (e.key === 'Enter' && settingsCurrentInterests.trim() !== '') {
      if (settingsInterests.length === 3) {
        return; // Limit reached, exit the function
      }

      setSettingsInterests((prevSettingsInterests) => [...prevSettingsInterests, settingsCurrentInterests.trim()]);
      setCurrentSettingsInterests('');
    }
  };

  const handleSettingsRemoveInterest = (index) => {
    setSettingsInterests((prevSettingsInterests) => prevSettingsInterests.filter((_, i) => i !== index));
  };




  return (
    <div className='form-container'>
      <div className="profile-container">
          {currentForm === 1 && (
            <>
            <img className="reg-logo" src="https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png" alt="CodeHive Logo" />
            <div className={`profile-card ${transitionDirection === 'slide-out' ? 'slide-out' : 'slide-in'}`} style={{height: '450px'}}>


              <h2>Create your Code<span className="light-yellow">Hive </span>Profile</h2>
              <h3>Enter your name and profile picture</h3>

              <label htmlFor="file-upload">
              <div className="profile-picture-container">
                <img className='create-profile-picture' src= {postImage.myFile || userProfilePicture || "https://cdn.discordapp.com/attachments/798251319847813200/1122589471565684816/download.jpeg"} alt="Profile Picture" />
              </div>
              </label>
              <input 
                  type="file"
                  label="Image"
                  name="myFile"
                  id="file-upload"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleFileUpload(e)}
              />

              <div className='text-fields'>
                <label htmlFor="firstName"></label>
                <input type="text" id="firstName" placeholder="First Name" value={userFirstName} onChange={(event) => {
                  let value = event.target.value.replace(/[^a-zA-Z]/g, ''); // Remove any non-alphabet characters
                  value = value.slice(0, 10);
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
                  value = value.slice(0, 15);
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
            <img className="reg-logo" src="https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png" alt="CodeHive Logo" />
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
                <button className="profile-next" onClick={handleNext} type="button" disabled={userBirthdayMonth === "" || userBirthdayYear === "" || userBirthdayDay === "" || userGender === ""}>Next</button>
              </div>
              </div>
              </div>
            </>
          )}
          {currentForm === 3 && (
            <>
            <img className="reg-logo" src="https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png" alt="CodeHive Logo" />
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
                <button className="profile-next" type="button" onClick={handleNext} disabled={userGrade === "" || userUniversity === ""}>Next</button>
              </div>
            </div>
            </>
          )}
          {currentForm === 4 && (
            <>
            <img className="reg-logo" src="https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png" alt="CodeHive Logo" />
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
                    <option value="Advanced Beginner">Advanced Beginner</option>
                    <option value="Compotent">Compotent</option>
                    <option value="Proficient">Proficient</option>
                </select>
            </div>

              <div className="button-container-last button-container">
                <button className="profile-previous" type="button" onClick={handlePrevious}>Back</button>
                <button className="profile-next" type='submit' onClick={onSubmit} disabled={userSkillLevel === "" || interests === "" || programmingLanguages === ""
                }>Submit</button>
              </div>
            </div>
            </>
          )}
          {currentForm === 5 && (
            <>
            <img className="reg-logo" src="https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png" alt="CodeHive Logo" />
            <div className={`profile-card ${transitionDirection === 'slide-out' ? 'slide-out' : 'slide-in'}`}>
            <h2>Your Code<span className="light-yellow">Hive </span>Profile was successfully created!</h2>
            <h3>Get ready to unleash your innovative spirit and connect with talented students from around the world.
            <br /> <br /> Head over to the <span className="light-yellow">Discover </span> page to explore exciting collaboration opportunities and start making an impact together. Happy coding!</h3>
            </div>
            </>
          )}
          {currentForm === 6 && (
            <>
              <div className={`profile-completed-card ${transitionDirection === 'slide-out' ? 'slide-out' : 'slide-in'}`}>
              <div className="button-column">
                <button className={activeButton === 'Account' ? 'active' : ''} onClick={() => handleClick('Account')}>Account</button>
                <button className={activeButton === 'Security' ? 'active' : ''} onClick={() => handleClick('Security')}>Security</button>
                <button className={activeButton === 'Information' ? 'active' : ''} onClick={() => handleClick('Information')}>Information</button>
                <button className={activeButton === 'Friends' ? 'active' : ''} onClick={() => handleClick('Friends')}>Friends</button>
              </div>

              <div className="content">
                {activeButton === "Account" && (

                  <div className="content-display">
                        <h1>Account Settings</h1>
                        <div>
                            <label htmlFor="file-upload">
                            <img className='settings-profile-picture' src= {postImage.myFile || userProfilePicture || "https://cdn.discordapp.com/attachments/798251319847813200/1122589471565684816/download.jpeg"} alt="Profile Picture" />
                            </label>
                            <input 
                                type="file"
                                label="Image"
                                name="myFile"
                                id="file-upload"
                                accept=".jpeg, .png, .jpg"
                                onChange={(e) => handleFileUpload(e)}
                            />
                        </div>

                      <div>
                        <div className="account-inputs">
                          <label htmlFor="settings-name">First Name</label>
                          <input id="settings-name" type="text" value={settingsFirstName} onChange={(event) => {
                            let value = event.target.value.replace(/[^a-zA-Z]/g, '');
                            value = value.slice(0, 10);
                            setSettingsFirstName(value)}}/>
                        </div>

                        <div className="account-inputs">
                          <label htmlFor="settings-last-name">Last Name</label>
                          <input id="settings-last-name" type="text" value={settingsLastName} onChange={(event) => {
                            let value = event.target.value.replace(/[^a-zA-Z]/g, '');
                            value = value.slice(0, 15);
                            setSettingsLastName(value)}}/>
                        </div>
                      </div>

                      <div>
                        <div className="account-inputs">
                          <label htmlFor="settings-username">Username</label>
                          <input id="settings-username" type="text" value={settingsUsername} onChange={(event) => {
                            let value = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
                            value = value.slice(0, 15);
                            setSettingsUsername(value)
                          }}/>
                      </div>

                        <div className="account-inputs">
                          <label htmlFor="settings-email">Email</label>
                          <input id="settings-email" type="text" value={settingsEmail} onChange={(event) => setSettingsEmail(event.target.value)} name="email" />
                        </div>
                      </div>

                      <p className='settings-first-error'>{settingsFirstPageErrors}</p>

                      <div className="settings-button-container">
                        <button className="settings-save" type="button" onClick={onSettingsSubmit}>Save</button>
                        <button className="settings-cancel" type='button' onClick={onSettingsCancel} >Cancel</button>
                      </div>
                    

                  </div>
                )}

                {activeButton === "Security" && (
                  <div className="content-display">
                        <h1>Account Security</h1>

                        <div className='security-info'>
                          <ul>
                            <li>Use a combination of uppercase and lowercase letters, numbers, and symbols in your password.</li>
                            <li>Avoid using common or easily guessable passwords.</li>
                            <li>Consider using a password manager to securely store your passwords.</li>
                            <li>Regularly update your passwords to maintain account security.</li>
                          </ul>
                        </div>

                        <div className="account-inputs">
                          <label htmlFor="settings-old-password">Old Password</label>
                          <input id="settings-old-password" type="password" value={settingsOldPassword} onChange={(event) => setSettingsOldPassword(event.target.value)}/>
                          <label htmlFor="settings-new-password">New Password</label>
                          <input id="settings-new-password" type="password" value={settingsNewPassword} onChange={(event) => setSettingsNewPassword(event.target.value)}/>

                          <label htmlFor="settings-confirm-new-password">Confirm New Password</label>
                          <input id="settings-confirm-new-password" type="password" value={settingsConfirmNewPassword} onChange={(event) => setSettingsConfirmNewPassword(event.target.value)}/>
                          
                          <p className='settings-pass-error'>{settingsPasswordError}</p>
                          
                          <div className="settings-password-button-container">
                            <button className="settings-change-pass" type="button" onClick={onPasswordChangeSubmit}>Change Password</button>
                            <button className="settings-cancel" type='button' onClick={onPasswordCancel}>Cancel</button>
                          </div>

                        </div>

                  </div>


                )}

                {activeButton === "Information" && (
                  <div className="content-display">
                        <h1>Account Information</h1>

                      <div className="account-inputs">
                          <label htmlFor="settingsBirthdayMonth">Month</label>
                          <select id="settingsBirthdayMonth" value={settingsBirthdayMonth} onChange={(event) => setSettingsBirthdayMonth(event.target.value)}>
                            <option value="" disabled>Select Month</option>
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
                      </div>

                      <div className="account-inputs">
                        <label htmlFor="settingsBirthdayDay">Day</label>
                        <input
                              type="number"
                              min="1"
                              max="31"
                              id='settingsBirthdayDay'
                              placeholder="Day"
                              value={settingsBirthdayDay}
                              onChange={(event) => {
                                let value = event.target.value.slice(0, 2);
                                value = value.replace(/[^0-9]/g, '');
                                if (/^(0?[1-9]|[12][0-9]|3[01])$/.test(value)) {
                                  setSettingsBirthdayDay(value);
                                } else {
                                  setSettingsBirthdayDay('');
                                }
                              }}
                          />
                      </div>

                      <div className="account-inputs">
                        <label htmlFor="settingsBirthdayYear">Year</label>
                          <input type="number" id="settingsBirthdayYear" min="1900" max="2023" placeholder="Year" value={settingsBirthdayYear} 
                          onChange={(event) => {
                            let value = event.target.value.slice(0, 4);
                            value = value.replace(/[^0-9]/g, '');
                            if (value.length > 1 && /^[12]/.test(value)) {
                              setSettingsBirthdayYear(value);
                            } else if (value === '1' || value === '2') {
                              setSettingsBirthdayYear(value);
                            } else {
                              setSettingsBirthdayYear('');
                            }
                          }}
                        />
                      </div>

                      <div className="account-inputs">
                        <label htmlFor="settingsGender">Gender</label>
                        <select id="settingsGender" value={settingsGender} onChange={(event) => setSettingsGender(event.target.value)}>
                            <option value="" disabled>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                      </div>
                    
                    <div>
                    
                      <div className='account-inputs'>
                        <label className='settings-university-label' htmlFor="settingsUniversity">University</label>
                        <input
                            type="text"
                            id="settingsUniversity"
                            list="university-list"
                            placeholder="Search for University"
                            value={settingsUniversity} 
                            onChange={(event) => {
                              setSettingsUniversity(event.target.value)}}
                        />
                        <datalist id="university-list">
                                {universities.map((university, index) => (
                                <option key={index} value={university} />
                                ))}
                        </datalist>
                      </div>

                      <div className='account-inputs'>
                      <label className='settings-university-grade' htmlFor="settingsGrade">Grade</label>
                        <select id="settingsGrade" value={settingsGrade}  onChange={(event) => setSettingsGrade(event.target.value)}>
                            <option value="" disabled>Grade</option>
                            <option value="Freshman">Freshman</option>
                            <option value="Sophmore">Sophmore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                        </select>
                      </div>
                    </div>


                    <div className='account-inputs'>
                        <label className='settings-languages-label' htmlFor="settingsLanguages">Programming Languages</label>
                        <input
                        type="text"
                        value={settingsCurrentProgrammingLanguages}
                        id="settingsLanguages"
                        onChange={handleSettingsLanguageChange}
                        onKeyPress={handleSettingsLanguageKeyPress}
                        placeholder="Enter programming languages here"
                        />

                        <div className="settings-input-boxes">
                        {settingsProgrammingLanguages.map((language, index) => (
                            <div key={index} className="settings-input-box">
                            {language}
                            <button className="settings-remove-button" type="button" onClick={() => handleSettingsRemoveLanguage(index)}>x</button>
                            </div>
                        ))}
                        </div>

                        <label className='settings-languages-label' htmlFor="settingsInterests">Interests</label>
                        <input
                        type="text"
                        value={settingsCurrentInterests}
                        id="settingsInterests"
                        onChange={handleSettingsInterestsChange}
                        onKeyPress={handleSettingsInterestKeyPress}
                        placeholder="Enter interests here (AI, Web Development, etc.)"
                        />
                        <div className="settings-input-boxes">
                        {settingsInterests.map((interest, index) => (
                            <div key={index} className="settings-input-box">
                            {interest}
                            <button className="settings-remove-button" type="button" onClick={() => handleSettingsRemoveInterest(index)}>x</button>
                            </div>
                        ))}
                        </div>

                        <label htmlFor="skill">Skill Level</label>
                          <select id="settingsSkillLevel" value={settingsSkillLevel}  onChange={(event) => setSettingsSkillLevel(event.target.value)}>
                              <option value="" disabled>Skill Level</option>
                              <option value="Novice">Novice</option>
                              <option value="Advanced Beginner">Advanced Beginner</option>
                              <option value="Compotent">Compotent</option>
                              <option value="Proficient">Proficient</option>
                          </select>


                          <p className='settings-pass-error'>{settingsInformationError}</p>
                          <div className="settings-information-button-container">
                            <button className="settings-change-information" type="button" onClick={onInformationChangeSubmit}>Save Changes</button>
                            <button className="settings-cancel" type='button' onClick={onInformationCancel} >Cancel</button>
                          </div>

                    </div>

                    



                  </div>


                )}

                {activeButton === "Friends" && (
                  <div className="content-display">
                        <h1>Friends List</h1>

                      <div className="friends-container">

                        {userFriends.map((friend) => (
                          <div key={friend._id} className="friend-display">
                            <div className="profile-picture" style={{ backgroundImage: `url(${friend.profilePicture})` }}></div>
                            <div className="friend-info">
                              <div className="friend-name">{friend.username}</div>
                              <div className="friend-skill">{friend.skillLevel} - {friend.languages.join(', ')}</div>
                            </div>
                            <div className="friend-buttons">
                              <button className="friend-button dm-button">DM</button>
                              <button className="friend-button remove-friend-button" onClick={() => removeFriend(friend._id)}>X</button>
                            </div>
                          </div>
                        ))}

                        <div className="friend-display">
                          <div className="profile-picture"></div>
                          <div className="friend-info">
                            <div className="friend-name">Username</div>
                            <div className="friend-skill">Advanced Beginner - JavaScript, HTML, CSS</div>
                          </div>
                        </div>

                        <div className="friend-display">
                          <div className="profile-picture"></div>
                          <div className="friend-info">
                            <div className="friend-name">Username</div>
                            <div className="friend-skill">Advanced Beginner - JavaScript, HTML, CSS</div>
                          </div>
                        </div>

                        <div className="friend-display">
                          <div className="profile-picture"></div>
                          <div className="friend-info">
                            <div className="friend-name">Username</div>
                            <div className="friend-skill">Advanced Beginner - JavaScript, HTML, CSS</div>
                          </div>
                        </div>

                        <div className="friend-display">
                          <div className="profile-picture"></div>
                          <div className="friend-info">
                            <div className="friend-name">Username</div>
                            <div className="friend-skill">Advanced Beginner - JavaScript, HTML, CSS</div>
                          </div>
                        </div>


                        <div className="friend-display">
                          <div className="profile-picture"></div>
                          <div className="friend-info">
                            <div className="friend-name">Username</div>
                            <div className="friend-skill">Advanced Beginner - JavaScript, HTML, CSS</div>
                          </div>
                        </div>

                        <div className="friend-display">
                          <div className="profile-picture"></div>
                          <div className="friend-info">
                            <div className="friend-name">Username</div>
                            <div className="friend-skill">Advanced Beginner - JavaScript, HTML, CSS</div>
                          </div>
                        </div>


                        <div className="friend-display">
                          <div className="profile-picture"></div>
                          <div className="friend-info">
                            <div className="friend-name">Username</div>
                            <div className="friend-skill">Advanced Beginner - JavaScript, HTML, CSS</div>
                          </div>
                        </div>


                        <div className="friend-display">
                          <div className="profile-picture"></div>
                          <div className="friend-info">
                            <div className="friend-name">Username</div>
                            <div className="friend-skill">Advanced Beginner - JavaScript, HTML, CSS</div>
                          </div>
                        </div>

                        <div className="friend-display">
                          <div className="profile-picture"></div>
                          <div className="friend-info">
                            <div className="friend-name">Username</div>
                            <div className="friend-skill">Advanced Beginner - JavaScript, HTML, CSS</div>
                          </div>
                        </div>




                      </div>


                  </div>


                )}


              </div>

              </div>
            </>
          )}
      </div>
    </div>
  );
};


function convertToBase64(file){
  return new Promise((resolve, reject) =>{
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
          resolve(fileReader.result)

      };
      fileReader.onerror = (error) => {
          reject(error)
      }
  })
}