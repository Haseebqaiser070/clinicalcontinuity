import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/authentication/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from './components/admin/AdminDashboard';
import Profile from './components/authentication/Profile';
import InchargeDashboard from './components/incharge/InchargeDashboard';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/incharge-dashboard" element={<InchargeDashboard />} />


      </Routes>
    </Router>
  );
}

export default App;
