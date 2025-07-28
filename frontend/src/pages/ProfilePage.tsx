import React from 'react';
import { useAppContext } from '../context/AppContext';

const ProfilePage: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="page-container">
      <h1 className="page-title">My Profile</h1>
      <div className="profile-card">
        <div className="profile-info-item">
          <span className="info-label">Name</span>
          <span className="info-value">{user?.name || 'N/A'}</span>
        </div>
        <div className="profile-info-item">
          <span className="info-label">Email</span>
          {/* We'll use a placeholder since the user object doesn't have an email yet */}
          <span className="info-value">{user?.name ? `${user.name.toLowerCase().replace(' ', '')}@example.com` : 'N/A'}</span>
        </div>
        {/* We can add more sections here later */}
      </div>
    </div>
  );
};

export default ProfilePage;