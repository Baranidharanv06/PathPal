import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link

interface Pool {
  id: number;
  destination: string;
  origin: string;
  departureTime: string;
  availableSeats: number;
  postedBy: string;
  description: string;
}

interface PoolCardProps {
  pool: Pool;
}

const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  return (
    // 2. Wrap the card in a Link component
    <Link to={`/pool/${pool.id}`} className="pool-card-link">
      <div className="pool-card">
        <div className="pool-card-header">
          <h3 className="pool-card-destination">{pool.destination}</h3>
          <span className="pool-card-seats">{pool.availableSeats} seats left</span>
        </div>
        <p className="pool-card-origin">From: {pool.origin}</p>
        <p className="pool-card-time">Departs at: {pool.departureTime}</p>
        
        <p className="pool-card-description">"{pool.description}"</p>
        
        <div className="pool-card-footer">
          <p className="pool-card-posted-by">Posted by: {pool.postedBy}</p>
          {/* The button is now for visual effect, the whole card is the link */}
          <span className="home-button button-primary pool-card-button">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PoolCard;