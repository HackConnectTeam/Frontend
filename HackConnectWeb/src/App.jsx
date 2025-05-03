import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScanPage from './pages/ScanPage';
import UserPage from './pages/UserPage';
import UserForm from './pages/UserForm';
import ChallengePage from './pages/ChallengePage';
import ScoreboardPage from './pages/ScoreboardPage';
import ProjectsPage from './pages/ProjectsPage';
import MainLayout from './pages/MainLayout';
import { getUserId } from './utils/auth';
import { Navigate } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage';

function App() {
  const storedUserId = getUserId();
  const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';

  return (
    <Router>
      <Routes>
        {!onboardingCompleted && <Route path="/" element={<OnboardingPage />} />}

        {/* Redirects automatically if there is a saved user */}
        <Route path="/" element={storedUserId ?
          <Navigate to={`/user/${storedUserId}/challenges`} replace /> :
          <ScanPage />}
        />

        <Route path="/user/:userId/edit" element={<UserForm />} />
        <Route path="/user/:userId" element={<MainLayout />}>
          <Route path="challenges" element={<UserPage />} />
          <Route path="challenge/:id" element={<ChallengePage />} />
          <Route path="scoreboard" element={<ScoreboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
