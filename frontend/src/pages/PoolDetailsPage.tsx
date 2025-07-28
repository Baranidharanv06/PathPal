import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast'; // 1. Import the toast function

const PoolDetailsPage: React.FC = () => {
  const { poolId } = useParams<{ poolId: string }>();
  const { pools } = useAppContext();

  const pool = pools.find(p => p.id === Number(poolId));

  // 2. This function creates the toast notification
  const handleRequestJoin = () => {
    // In a real app, this would make an API call.
    // For now, we just show a notification.
    toast.success(`Request sent to join the pool to ${pool?.destination}!`);
  };

  if (!pool) {
    return (
      <div className="page-container">
        <h1 className="page-title">Pool Not Found</h1>
        <p>Sorry, we couldn't find the pool you're looking for.</p>
        <Link to="/dashboard">Go back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="details-header">
        <h1 className="page-title">{pool.destination}</h1>
        <span className="pool-card-seats">{pool.availableSeats} seats left</span>
      </div>
      <p className="details-subtitle">From {pool.origin}, departing at {pool.departureTime}</p>
      
      <div className="details-card">
        <div className="details-section">
          <h3>Description</h3>
          <p>{pool.description}</p>
        </div>
        <div className="details-section">
          <h3>Posted By</h3>
          <p>{pool.postedBy}</p>
        </div>
      </div>

      {/* 3. The onClick handler calls the function when the button is clicked */}
      <button onClick={handleRequestJoin} className="home-button button-primary details-button">
        Request to Join
      </button>
    </div>
  );
};

export default PoolDetailsPage;
