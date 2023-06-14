import { useState, useEffect } from 'react';
import '../styles/profile.css';
import test from './test.txt'

export const Profile = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [transitionDirection, setTransitionDirection] = useState('');
  const [universities, setUniversities] = useState([]);
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [interests, setInterests] = useState([]);
  const [currentInterest, setCurrentInterest] = useState('');

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
          {currentForm === 1 && (
            <>
            <div className={`profile-card ${transitionDirection === 'slide-out' ? 'slide-out' : 'slide-in'}`}>
              <h2>Create your Code<span className="light-yellow">Hive </span>Profile</h2>
              <h3>Enter your name</h3>
              <div className='text-fields'>
                <label htmlFor="firstName"></label>
                <input type="text" id="firstName" placeholder="First Name" />
                <label htmlFor="lastName"></label>
                <input type="text" id="lastName" placeholder="Last Name" />
              </div>
              <div className="button-container">
                <button className="profile-next first-next" onClick={handleNext}>Next</button>
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
              <select id="birthdayMonth">
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
              <input type="number" id="birthdayDay" min="1" max="31" placeholder="Day" />
              <label htmlFor="birthdayYear"></label>
              <input type="number" id="birthdayYear" min="1900" max="2023" placeholder="Year" />
              
              <div>
                <label htmlFor="gender"></label>
                <select id="gender">
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
             </div>
            </div>

              <div className="button-container">
                <button className="profile-previous" onClick={handlePrevious}>Back</button>
                <button className="profile-next" onClick={handleNext}>Next</button>
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
                    />
                    <datalist id="university-list">
                            {universities.map((university, index) => (
                            <option key={index} value={university} />
                            ))}
                    </datalist>
                </div>

                <label htmlFor="grade"></label>
                <select id="birthdayYear">
                    <option value="" disabled selected>Grade</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophmore">Sophmore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                </select>
                </div>

              <div className="button-container">
                <button className="profile-previous" onClick={handlePrevious}>Back</button>
                <button className="profile-next" onClick={handleNext}>Next</button>
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
                            <button className="remove-button" onClick={() => handleRemoveLanguage(index)}>x</button>
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
                            <button className="remove-button" onClick={() => handleRemoveInterest(index)}>x</button>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <label htmlFor="skill"></label>
                <select id="skillLevel">
                    <option value="" disabled selected>Skill Level</option>
                    <option value="Novice">Novice</option>
                    <option value="Sophmore">Advanced Beginner</option>
                    <option value="Junior">Compotent</option>
                    <option value="Senior">Proficient</option>
                </select>
            </div>

              <div className="button-container-last button-container">
                <button className="profile-previous" onClick={handlePrevious}>Back</button>
                <button className="profile-next" onClick={handleNext}>Submit</button>
              </div>
            </div>
            </>
          )}
      </div>
    </div>
  );
};
