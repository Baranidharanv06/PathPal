import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePoolPage from './pages/CreatePoolPage';
import SharedLayout from './components/SharedLayout';
import ProfilePage from './pages/ProfilePage';
import PoolDetailsPage from './pages/PoolDetailsPage';
import MyPoolsPage from './pages/MyPoolsPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage'; // 1. Import the NotificationsPage

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<SharedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-pools" element={<MyPoolsPage />} />
          <Route path="/create-pool" element={<CreatePoolPage />} />
          <Route path="/notifications" element={<NotificationsPage />} /> {/* 2. Add the route here */}
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pool/:poolId" element={<PoolDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
