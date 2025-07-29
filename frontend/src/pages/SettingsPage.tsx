import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Settings & Privacy</h1>
      
      <div className="settings-grid">
        {/* Account Section - Simplified */}
        <div className="settings-section">
          <h3 className="section-title">Account</h3>
          <p className="section-description">Manage your profile information.</p>
          <div className="settings-item" onClick={() => navigate('/profile')}>
            <span>Edit Profile Information</span>
            <span className="settings-arrow">&rarr;</span>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="settings-section">
          <h3 className="section-title">Notifications</h3>
          <p className="section-description">Choose how you get notified.</p>
          <div className="toggle-group">
            <label>Pool Join Requests</label>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="toggle-group">
            <label>Updates on Joined Pools</label>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="settings-section">
          <h3 className="section-title">Privacy & Sharing</h3>
          <p className="section-description">Control what information others see.</p>
          <div className="toggle-group">
            <label>Show my trip history</label>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="toggle-group">
            <label>Allow others to see my major</label>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* Danger Zone Section */}
        <div className="settings-section danger-zone">
          <h3 className="section-title">Danger Zone</h3>
          <p className="section-description">This action is permanent.</p>
          <div className="settings-item">
            <span>Deactivate Account</span>
            <button type="button" className="home-button button-danger">
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
