import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const LearnMoreModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>About PathPal</h2>
          <button onClick={onClose} className="modal-close-button">&times;</button>
        </div>
        <p>PathPal is a student-focused ride-pooling application designed to make your daily commute safer, more affordable, and more social.</p>
        <p>Whether you're heading to the railway station, a local cafe, or just across campus, PathPal helps you find fellow students going your way. Share rides, split costs, and make new friends!</p>
        <button onClick={onClose} className="home-button button-primary" style={{marginTop: '1rem'}}>Got it!</button>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleGetStarted = () => {
    setIsLeaving(true);
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  return (
    // The 'animated-bg' class is all that's needed for the new animation
    <div className="home-container animated-bg">
      
      {isModalOpen && <LearnMoreModal onClose={() => setModalOpen(false)} />}

      <div className={`home-content ${isLeaving ? 'leaving' : ''}`}>
        <img src={logo} alt="PathPal Logo" className="home-logo" />

        <h1 className="home-title">Welcome to PathPal</h1>
        <p className="home-subtitle">
          Your institute's friendly ride-pooling solution.
        </p>
        <div className="home-button-stack">
          <button
            onClick={handleGetStarted}
            className="home-button button-primary"
          >
            Get Started
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="home-button button-secondary"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
