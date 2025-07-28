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

/**
 * App is the root component that sets up all the application's routes.
 * It distinguishes between public routes (like login) and protected routes
 * that require authentication.
 */
function App() {
  return (
    <Routes>
      {/* Public Routes: Accessible to everyone */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes: 
        These routes are wrapped in a <ProtectedRoute /> component.
        If the user is not authenticated, they will be redirected to the /login page.
        The <SharedLayout /> provides a consistent Navbar for all protected pages.
      */}
      <Route element={<ProtectedRoute />}>
        <Route element={<SharedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-pool" element={<CreatePoolPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* This is a dynamic route. ':poolId' is a URL parameter. */}
          <Route path="/pool/:poolId" element={<PoolDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
