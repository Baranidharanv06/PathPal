import React, { useState, useMemo } from 'react'; // 1. Import useState and useMemo
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import PoolCard from '../components/PoolCard';

const DashboardPage: React.FC = () => {
  const { pools } = useAppContext();
  const [searchTerm, setSearchTerm] = useState(''); // 2. Add state for the search term

  // 3. Filter the pools based on the search term
  // useMemo ensures this calculation only re-runs when pools or searchTerm change
  const filteredPools = useMemo(() => {
    if (!searchTerm) {
      return pools; // If search is empty, return all pools
    }
    return pools.filter(pool =>
      pool.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pool.origin.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pools, searchTerm]);

  return (
    <div className="page-container">
      <div className="section-header">
        <h2 className="section-title">Available Ride Pools</h2>
        {/* 4. Add the search input field */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by destination or origin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* 5. Render the filtered list */}
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
