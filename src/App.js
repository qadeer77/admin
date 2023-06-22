import './App.css';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
