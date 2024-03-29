import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';

export const ChangePassword = () => {
    const { username, token } = useParams();
    const [isValidToken, setIsValidToken] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            console.log("Initiating password reset...");
            const response = await axios.post("http://localhost:3001/password/reset-password", {
                username,
                newPassword
            });

            console.log("Reset response:", response.data);

            const responseMessage = response.data.message;
            setSuccess(true);
            setError('');
        } catch (error) {
            console.error("Reset error:", error);
            setError('An error occurred. Please try again later.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:3001/password/verify-pass-token", {
                    username,
                    token
                });

                const responseStatus = response.data.status;
                if (responseStatus === 'okay') {
                    console.log("Status is good.");
                    setIsValidToken(true);
                }
            } catch (error) {
                console.error("Error verifying token:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {success ? (
                <div className="success-page">
                    <h1>Password Reset Successful</h1>
                    <p>Your password has been successfully reset, click <a href="/login">here</a> to login.</p>
                    <Link to="/">Go to Home</Link>
                </div>
            ) : isValidToken ? (
                <div className="forgot-pass-container">
                    <div className="forgot-pass-card">
                        <img className="reg-logo" src="https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png" alt="CodeHive Logo"/>
                        <h1>Reset Password:</h1>
                        {error && <p>{error}</p>}
                        <label htmlFor="password">New Password:</label>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter Password"
                                name="password"
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                                required
                            />
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                required
                            />
                            <button type="submit">Reset Password</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="email-container">
                        <img src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'></img>
                        <div className="email-card">
                            <h1>Your reset token is invalid, please try again.</h1>
                            <h3>We're sorry but your password reset token is expired or invalid. Please reset again <Link to="/forgot-password" className="register-link">here</Link></h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}