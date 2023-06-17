import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginpage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
      // Perform login logic here
  
      // Navigate to TasksPage
      navigate('/tasks');
    };

  return (
    <div className="login-page">
      <div className="login-container">
        <video className="background-video" autoPlay loop muted>
          <source src="/videos/Logo.mp4" type="video/mp4" />
        </video>
        <form className="login-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;