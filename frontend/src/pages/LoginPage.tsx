import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext'; // Corrected import

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAppContext(); // Corrected hook name

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      // MOCK SUCCESSFUL LOGIN
      console.log('Simulating successful login...');
      const mockUser = { name: email.split('@')[0] || 'Test User' }; // Use part of email as name
      login(mockUser); 
      
      navigate('/dashboard');

    } catch (err: any) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Welcome Back!</h2>
        <p className="form-subtitle">Please sign in to continue to PathPal.</p>
        
        <form onSubmit={handleSubmit}>
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