import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { user } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  
  // State for editable fields
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState('Loves to travel and listen to music. Looking for friendly ride companions!');
  const [major, setMajor] = useState('Computer Science, 3rd Year');
  const [interests, setInterests] = useState('Gaming, F1, Reading');

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="page-container">
      <div className="profile-page-header">
        <h1 className="page-title">My Profile</h1>
        {isEditing ? (
          <button onClick={handleSave} className="home-button button-primary">Save Changes</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="home-button button-secondary">Edit Profile</button>
        )}
      </div>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-icon large">{username.charAt(0).toUpperCase() || 'U'}</div>
          <div className="profile-header-info">
            {isEditing ? (
              <input className="profile-name-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            ) : (
              <h2 className="profile-name-large">{username}</h2>
            )}
            <p className="profile-email">{username.toLowerCase().replace(' ', '')}@example.com</p>
          </div>
        </div>

        <div className="profile-info-item">
          <span className="info-label">Bio</span>
          {isEditing ? (
            <textarea className="profile-bio-textarea" value={bio} onChange={(e) => setBio(e.target.value)} />
          ) : (
            <span className="info-value">{bio}</span>
          )}
        </div>
        
        <div className="profile-info-item">
          <span className="info-label">Major & Year</span>
          {isEditing ? (
             <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} />
          ) : (
            <span className="info-value">{major || 'Not specified'}</span>
          )}
        </div>

        <div className="profile-info-item">
          <span className="info-label">Interests / Hobbies</span>
          {isEditing ? (
             <input type="text" value={interests} onChange={(e) => setInterests(e.target.value)} />
          ) : (
            <span className="info-value">{interests || 'Not specified'}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
