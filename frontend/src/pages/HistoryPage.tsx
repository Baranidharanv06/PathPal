import React from 'react';

// Mock data for past trips
const mockHistory = [
  {
    id: 101,
    destination: 'City Mall',
    date: '2025-07-25',
    status: 'Completed',
    companion: 'Maria'
  },
  {
    id: 102,
    destination: 'Airport',
    date: '2025-07-22',
    status: 'Completed',
    companion: 'Riya'
  },
  {
    id: 103,
    destination: 'Main Library',
    date: '2025-07-20',
    status: 'Cancelled',
    companion: 'Alex'
  },
];

const HistoryPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Trip History</h1>
      <p className="details-subtitle">A record of your past ride pools.</p>
      
      <div className="history-list">
        {mockHistory.map(item => (
          <div key={item.id} className="history-item">
            <div className="history-info">
              <span className="history-destination">{item.destination}</span>
              <span className="history-date">On {new Date(item.date).toLocaleDateString()} with {item.companion}</span>
            </div>
            <div className={`history-status ${item.status.toLowerCase()}`}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
