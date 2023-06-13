import { useState, useEffect } from 'react';
import '../styles/profile.css';
import test from './test.txt'

export const Profile = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [universities, setUniversities] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [currentInput, setCurrentInput] = useState('');

  const handleNext = () => {
    setCurrentForm(currentForm + 1);
  };


  const handlePrevious = () => {
    setCurrentForm(currentForm - 1);
  };

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && currentInput.trim() !== '') {
        if (inputs.length === 5) {
            return; // 5 Progamming Languages Reached
          }
      setInputs((prevInputs) => [...prevInputs, currentInput.trim()]);
      setCurrentInput('');
    }
  };

  const handleInputBlur = () => {
    setCurrentInput('');
  };

  const handleRemoveInput = (index) => {
    setInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
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
        <div className="profile-card">
          {currentForm === 1 && (
            <>
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
            </>
          )}
          {currentForm === 2 && (
            <>
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
            </>
          )}
          {currentForm === 3 && (
            <>
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
            </>
          )}
          {currentForm === 4 && (
            <>
            <h2>Programmer Information </h2>
              <h3>Last step! Enter your programming details</h3>

            <div className='text-fields'>
                <label htmlFor="languages"></label>
                <input
                        type="text"
                        id="university"
                        value={currentInput}
                        onChange={handleInputChange}
                        onKeyPress={handleInputKeyPress}
                        placeholder="Enter up to 5 programming languages"
                    />
                <div>
                    <div className="input-boxes">
                        {inputs.map((input, index) => (
                        <div key={index} className="input-box">
                            {input}
                            <button
              className="remove-button"
              onClick={() => handleRemoveInput(index)}
            >
              x
            </button>
                        </div>
                        ))}
                    </div>
                </div>

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
            </div>

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
