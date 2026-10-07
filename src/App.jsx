import { Navigate, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import MeditatePage from './pages/MeditatePage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import ChallengePage from './pages/ChallengePage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="meditate" element={<MeditatePage />} />
        <Route path="music" element={<Navigate to="/meditate" replace />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="challenge" element={<ChallengePage />} />
      </Route>
    </Routes>
  );
}
