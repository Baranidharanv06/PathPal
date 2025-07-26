import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // We'll use this to call the backend

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Step 1: Create state variables to hold email, password, and any error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Step 2: Create a function to handle the form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the page from reloading on submit
    setError(''); // Clear previous errors

    try {
      // Step 3: Call the backend API's login endpoint
      // You may need to confirm the exact URL with your backend partner
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // On a successful login:
      console.log('Login successful!', response.data);
      // TODO: Save the auth token (e.g., in localStorage)
      // TODO: Redirect to the user's dashboard or home page
      // navigate('/dashboard');

    } catch (err: any) {
      // On a failed login:
      console.error('Login failed:', err.response?.data?.message || 'An error occurred');
      setError(err.response?.data?.message || 'Invalid email or password.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Welcome Back!</h2>
        <p className="form-subtitle">Please sign in to continue to PathPal.</p>
        
        {/* Step 2.5: Connect the handleSubmit function to the form's onSubmit event */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            {/* Step 1.5: Link input to state and update it on change */}
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

          {/* Conditionally render the error message if it exists */}
          {error && <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
          
          <button type="submit" className="home-button button-primary form-button">
            Sign In
          </button>
        </form>

        <p className="form-footer-text">
          Don't have an account?{' '}
          <span className="form-link" onClick={() => navigate('/register')}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;