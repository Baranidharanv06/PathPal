import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState(''); // Changed from name to username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      // The backend will need to accept 'username' instead of 'name'
      const response = await api.post('/auth/register', {
        username,
        email,
        password,
      });

      console.log('Registration successful!', response.data);
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
          {/* Changed from "Full Name" to "Username" */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Choose a unique username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
