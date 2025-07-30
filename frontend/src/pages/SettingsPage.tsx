import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd add validation and an API call here
    toast.success("Password changed successfully!");
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Settings & Privacy</h1>
      
      <div className="settings-grid">
        {/* Account Section */}
        <div className="settings-section">
          <h3 className="section-title">Account</h3>
          <p className="section-description">Manage your profile and account security.</p>
          <div className="settings-item" onClick={() => navigate('/profile')}>
            <span>Edit Profile Information</span>
            <span className="settings-arrow">&rarr;</span>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="settings-section">
          <h3 className="section-title">Change Password</h3>
          <p className="section-description">Choose a strong password and don't reuse it for other accounts.</p>
          <form onSubmit={handleChangePassword}>
            <div className="input-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input type="password" id="currentPassword" placeholder="••••••••" required />
            </div>
            <div className="input-group">
              <label htmlFor="newPassword">New Password</label>
              <input type="password" id="newPassword" placeholder="••••••••" required />
            </div>
            <button type="submit" className="home-button button-primary" style={{width: '100%'}}>Update Password</button>
          </form>
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

        {/* Privacy & Sharing Section */}
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
