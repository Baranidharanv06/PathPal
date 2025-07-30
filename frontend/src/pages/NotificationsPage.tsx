import React, { useState } from 'react';
import toast from 'react-hot-toast';

// Define the structure for a notification
type NotificationType = 'request' | 'approval' | 'alert' | 'cancellation';

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  timestamp: string;
  isRead: boolean;
}

// Mock data for demonstration
const initialNotifications: Notification[] = [
  { id: 1, type: 'request', message: 'Riya has requested to join your pool to WhiteFields.', timestamp: '5 minutes ago', isRead: false },
  { id: 2, type: 'approval', message: 'Your request to join the pool to Chennai was approved by Mohit.', timestamp: '1 hour ago', isRead: false },
  { id: 3, type: 'alert', message: 'A new carpool to VITV has been posted that matches your route.', timestamp: '3 hours ago', isRead: true },
  { id: 4, type: 'cancellation', message: 'The pool to the Airport on Jul 31 has been cancelled by the creator.', timestamp: '1 day ago', isRead: true },
];

// Helper to get an icon based on notification type
const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
        case 'request': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>;
        case 'approval': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
        case 'cancellation': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
        case 'alert':
        default: return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
    }
};


const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read.");
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.error("All notifications cleared.");
  };

  return (
    <div className="page-container">
      <div className="notifications-header">
        <h1 className="page-title">Notifications</h1>
        <div className="notifications-actions">
          <button onClick={handleMarkAllRead} className="home-button button-secondary">Mark all as read</button>
          <button onClick={handleClearAll} className="home-button button-danger">Clear all</button>
        </div>
      </div>

      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div key={notification.id} className={`notification-item ${notification.isRead ? '' : 'unread'}`}>
              <div className={`notification-icon type-${notification.type}`}>
                {getNotificationIcon(notification.type)}
              </div>
              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                <span className="notification-timestamp">{notification.timestamp}</span>
              </div>
              {!notification.isRead && <div className="notification-dot"></div>}
            </div>
          ))
        ) : (
          <p className="info-text">You have no new notifications.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
