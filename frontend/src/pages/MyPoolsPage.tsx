import React from 'react';
import { useAppContext } from '../context/AppContext';
import PoolCard from '../components/PoolCard';
import { Link } from 'react-router-dom';

const MyPoolsPage: React.FC = () => {
  const { user, pools } = useAppContext();

  // Filter pools to find ones posted by the current user
  const myPools = pools.filter(pool => pool.postedBy === user?.username);

  return (
    <div className="page-container">
      <h1 className="page-title">My Pools</h1>
      
      {myPools.length > 0 ? (
        <div className="pool-list">
          {myPools.map(pool => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </div>
      ) : (
        <div className="info-text">
          <p>You haven't created any pools yet.</p>
          <Link to="/create-pool" className="home-button button-primary" style={{marginTop: '1rem'}}>
            Create Your First Pool
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyPoolsPage;
