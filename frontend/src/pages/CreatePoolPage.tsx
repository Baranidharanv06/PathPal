import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CreatePoolPage: React.FC = () => {
  const navigate = useNavigate();
  const { addPool } = useAppContext();

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    addPool({ 
      origin, 
      destination, 
      departureTime, 
      availableSeats: Number(availableSeats), 
      description 
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Create a New Pool</h2>
        <p className="form-subtitle">Share your travel plans with others.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="origin">Origin</label>
            <input type="text" id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="destination">Destination</label>
            <input type="text" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="departureTime">Departure Time</label>
            <input type="text" id="departureTime" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} placeholder="e.g., 7:30 PM" required />
          </div>
          <div className="input-group">
            <label htmlFor="availableSeats">Available Seats</label>
            <input type="number" id="availableSeats" value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} min="1" required />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Music preferences, quiet ride, etc." />
          </div>
          
          <button type="submit" className="home-button button-primary form-button">
            Publish Pool
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePoolPage;