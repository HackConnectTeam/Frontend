import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScanPage from './pages/ScanPage';
import UserPage from './pages/UserPage';
import ChallengePage from './pages/ChallengePage';
import UserForm from './pages/UserForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScanPage />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/user/:userId/edit" element={<UserForm />} />
        <Route path="/user/:userId/challenge/:id" element={<ChallengePage />} />
      </Routes>
    </Router>
  );
}

export default App;
