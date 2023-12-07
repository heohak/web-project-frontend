import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import MainPage from "@/pages/MainPage";
import ProfileEditPage from "@/pages/ProfileEditPage";
import ProfilePreviewPage from "@/pages/ProfilePreviewPage";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import LogoutPage from "@/pages/LogoutPage.tsx";
import SettingsPage from "@/pages/SettingsPage";
import TableViewPage from "@/pages/TableViewPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/logout" element={<ProtectedRoute><LogoutPage/></ProtectedRoute>}/>
        <Route path="/" element={<ProtectedRoute><MainPage/></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><ProfilePreviewPage/></ProtectedRoute>}/>
        <Route path="/profile/edit" element={<ProtectedRoute><ProfileEditPage/></ProtectedRoute>}/>
        <Route path="/settings" element={<ProtectedRoute><SettingsPage/></ProtectedRoute>}/>
        <Route path="/table-view" element={<ProtectedRoute><TableViewPage/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;