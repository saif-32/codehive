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
            <h2>Create your Test<span className="light-yellow">Hive </span>Profile</h2>
              <h3>Enter your name</h3>
              <label htmlFor="firstName"></label>
              <input type="text" id="firstName" placeholder="First Name" />
              <label htmlFor="lastName"></label>
              <input type="text" id="lastName" placeholder="Last Name" />
              <div className="button-container">
                <button className="profile-previous" onClick={handlePrevious}>Back</button>
                <button className="profile-next" onClick={handleNext}>Next</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
