import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to PathPal</h1>
      <p className="home-subtitle">
        Your institute's friendly ride-pooling solution.
      </p>
      <div className="home-button-stack">
        <button
          onClick={() => navigate('/login')}
          className="home-button button-primary"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate('/about')}
          className="home-button button-secondary"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default HomePage;