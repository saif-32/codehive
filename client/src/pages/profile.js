import { useState } from 'react';
import '../styles/profile.css';

export const Profile = () => {
  const [currentForm, setCurrentForm] = useState(1);

  const handleNext = () => {
    setCurrentForm(currentForm + 1);
  };


  const handlePrevious = () => {
    setCurrentForm(currentForm - 1);
  };

  return (
    <div>
      <div className="profile-container">
        <img className="reg-logo" src="logo.png" alt="CodeHive Logo" />
        <div className="profile-card">
          {currentForm === 1 && (
            <>
              <h2>Create your Code<span className="light-yellow">Hive </span>Profile</h2>
              <h3>Enter your name</h3>
              <label htmlFor="firstName"></label>
              <input type="text" id="firstName" placeholder="First Name" />
              <label htmlFor="lastName"></label>
              <input type="text" id="lastName" placeholder="Last Name" />
              <div className="first-screen-button">
                <button className="profile-next" onClick={handleNext}>Next</button>
              </div>
            </>
          )}
          {currentForm === 2 && (
            <>
            <h2>Basic Information</h2>
              <h3>Enter your birthday and gender</h3>
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

              <div className="button-container">
                <button className="profile-previous" onClick={handlePrevious}>Back</button>
                <button className="profile-next" onClick={handleNext}>Next</button>
              </div>
            </>
          )}
          {currentForm === 3 && (
            <>
            <h2>Student Information</h2>
              <h3>Enter your university and grade</h3>

                <label htmlFor="university"></label>
                <select id="university">
                    <option value="">University</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="grade"></label>
                <select id="birthdayYear">
                    <option value="" disabled selected>Grade</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophmore">Sophmore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                </select>

              <div className="button-container">
                <button className="profile-previous" onClick={handlePrevious}>Back</button>
                <button className="profile-next" onClick={handleNext}>Next</button>
              </div>
            </>
          )}
          {currentForm === 4 && (
            <>
            <h2>Programmer Information </h2>
              <h3>Last step! Enter your programming details.</h3>

                <label htmlFor="languages"></label>
                <select id="university">
                    <option value="">Programming Languages</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="interests"></label>
                <select id="university">
                    <option value="">Interests</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="skill"></label>
                <select id="birthdayYear">
                    <option value="" disabled selected>Skill</option>
                    <option value="Novice">Novice</option>
                    <option value="Sophmore">Advanced Beginner</option>
                    <option value="Junior">Compotent</option>
                    <option value="Senior">Proficient</option>
                </select>

              <div className="button-container">
                <button className="profile-previous" onClick={handlePrevious}>Back</button>
                <button className="profile-next" onClick={handleNext}>Submit</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
