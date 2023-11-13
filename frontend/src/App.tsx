import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import ProfileEditPage from './pages/ProfileEditPage';
import ProfilePreviewPage from './pages/ProfilePreviewPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePreviewPage />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
      </Routes>
    </Router>
  );
}

export default App;