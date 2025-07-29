import React from 'react';
import { Link } from 'react-router-dom';

// FIX: Define the type directly in this file
type TransportMode = 'car' | 'train' | 'flight';

interface Pool {
  id: number;
  destination: string;
  origin: string;
  date: string;
  departureTime: string;
  availableSeats: number;
  postedBy: string;
  description: string;
  transportMode: TransportMode;
}

interface PoolCardProps {
  pool: Pool;
}

const getTransportIcon = (mode: TransportMode) => {
  switch (mode) {
    case 'car': return '🚗';
    case 'train': return '🚂';
    case 'flight': return '✈️';
    default: return '📍';
  }
};

const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  const formattedDate = new Date(pool.date).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric'
  });

  return (
    <Link to={`/pool/${pool.id}`} className="pool-card-link">
      <div className="pool-card">
        <div className="pool-card-header">
          <div className="pool-card-title-group">
            <span className="transport-icon">{getTransportIcon(pool.transportMode)}</span>
            <h3 className="pool-card-destination">{pool.destination}</h3>
          </div>
          <span className="pool-card-seats">{pool.availableSeats} seats left</span>
        </div>
        <p className="pool-card-origin">From: {pool.origin}</p>
        <p className="pool-card-time">On {formattedDate} at {pool.departureTime}</p>
        
        <p className="pool-card-description">"{pool.description}"</p>
        
        <div className="pool-card-footer">
          <p className="pool-card-posted-by">Posted by: {pool.postedBy}</p>
          <span className="home-button button-primary pool-card-button">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PoolCard;