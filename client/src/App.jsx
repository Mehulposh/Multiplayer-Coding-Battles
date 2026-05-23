import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './zustandStore/authStore.js';

// Layouts
import MainLayout from './layout/mainLayout.jsx';

// Pages
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import LoginPage from './pages/LoginPage/loginPage.jsx';
import RegisterPage from './pages/RegisterPage/regsiterPage.jsx';
import DashboardPage from './pages/Dashboard/dashboardPage.jsx';
import BattleRoomPage from './pages/BattleRoomPage/battleRoomPage.jsx';
import LeaderboardPage from './pages/LeaderBoard/LeaderboardPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import ProblemsPage from './pages/ProblemPage/ProblemsPage.jsx';
import AdminProblemsPage from './pages/AdminProblemPage/AdminProblemsPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage/AdminDashboardPage.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated, token , authLoading } = useAuthStore();

  if(authLoading) return null

  if (!token && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AdminRoute({ children }) {
  const {
    isAuthenticated,
    token,
    user,
    authLoading
  } = useAuthStore();

  if(authLoading)return null
  if (!token && !isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (user?.role !== 'admin') {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}

function PublicRoute({ children }) {
  const {
    isAuthenticated,
    user,
    authLoading
  } = useAuthStore();

  if(authLoading) return null
  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return (
        <Navigate
          to="/admin"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}

export default function App() {
  const { fetchMe, token ,user} = useAuthStore();
  console.log('user',user);
  
  useEffect(() => {
    if (token) {
      fetchMe();
    }else{
      useAuthStore.setState({
        authLoading: false
      })
    }
  }, [fetchMe,token]);

  return (
    <div className="scanlines">
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* Protected */}
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="battle/:roomId" element={<BattleRoomPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="profile/:username" element={<ProfilePage />} />
          <Route path="problems" element={<ProblemsPage />} />
          <Route 
            path="admin"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />
          <Route
            path="admin/problems"
            element={
              <AdminRoute>
                <AdminProblemsPage />
              </AdminRoute>
            }
          />        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}