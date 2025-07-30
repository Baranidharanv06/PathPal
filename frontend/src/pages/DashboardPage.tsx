import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import PoolCard from '../components/PoolCard';

const DashboardPage: React.FC = () => {
  const { pools, setTransitioning } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    setTransitioning(false);
  }, [setTransitioning]);

  const filteredPools = useMemo(() => {
    if (!searchTerm) return pools;
    return pools.filter(pool =>
      pool.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pool.origin.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pools, searchTerm]);

  return (
    <div className="page-container">
      <div className="section-header">
        <h2 className="section-title">Available Ride Pools</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by destination or origin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="pool-list">
        {filteredPools.length > 0 ? (
          filteredPools.map(pool => (
            <PoolCard key={pool.id} pool={pool} />
          ))
        ) : (
          <p className="info-text">No pools match your search.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
