import React from 'react';
import toast from 'react-hot-toast';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password changed successfully!");
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Change Password</h2>
          <button onClick={onClose} className="modal-close-button">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="currentPasswordModal">Current Password</label>
            <input type="password" id="currentPasswordModal" placeholder="••••••••" required />
          </div>
          <div className="input-group">
            <label htmlFor="newPasswordModal">New Password</label>
            <input type="password" id="newPasswordModal" placeholder="••••••••" required />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPasswordModal">Confirm New Password</label>
            <input type="password" id="confirmPasswordModal" placeholder="••••••••" required />
          </div>
          <button type="submit" className="home-button button-primary form-button">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};
