import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AnalyzeResume from './pages/AnalyzeResume';
import AnalysisResults from './pages/AnalysisResults';
import AnalysisHistory from './pages/AnalysisHistory';
import ProfileSettings from './pages/ProfileSettings';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analyze" element={<AnalyzeResume />} />
        <Route path="results/:id" element={<AnalysisResults />} />
        <Route path="history" element={<AnalysisHistory />} />
        <Route path="profile" element={<ProfileSettings tab="profile" />} />
        <Route path="settings" element={<ProfileSettings tab="settings" />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
