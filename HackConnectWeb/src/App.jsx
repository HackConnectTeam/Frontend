import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScanPage from './pages/ScanPage';
import UserPage from './pages/UserPage';
import UserForm from './pages/UserForm';
import ChallengePage from './pages/ChallengePage';
import ScoreboardPage from './pages/ScoreboardPage';
import ProjectsPage from './pages/ProjectsPage';
import MainLayout from './pages/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScanPage />} />
        <Route path="/user/:userId/edit" element={<UserForm />} />

        {/* Rutas con el layout común */}
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
