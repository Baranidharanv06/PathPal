import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  // State for the form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      // Call the backend registration endpoint
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      console.log('Registration successful!', response.data);

      // On success, automatically navigate to the login page
      navigate('/login');

    } catch (err: any) {
      console.error('Registration failed:', err.response?.data?.message || 'An error occurred');
      setError(err.response?.data?.message || 'Could not create account.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Create an Account</h2>
        <p className="form-subtitle">Join PathPal to start sharing rides.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
          
          <button type="submit" className="home-button button-primary form-button">
            Sign Up
          </button>
        </form>

        <p className="form-footer-text">
          Already have an account?{' '}
          <span className="form-link" onClick={() => navigate('/login')}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;