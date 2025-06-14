import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import BookService from './components/BookService.jsx';
import TrackStatus from './components/TrackStatus.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <nav className="flex space-x-4 mb-4">
        <Link to="/">Book</Link>
        <Link to="/track">Track</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BookService />} />
        <Route path="/track" element={<TrackStatus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}
