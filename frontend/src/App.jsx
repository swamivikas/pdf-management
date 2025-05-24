import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FileView from './pages/FileView.jsx';
import InviteView from './pages/InviteView.jsx';
import Navbar from './components/Navbar.jsx';
import { getToken } from './utils/auth.js';

function PrivateRoute({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/files/:id"
            element={
              <PrivateRoute>
                <FileView />
              </PrivateRoute>
            }
          />
          <Route path="/share/:token" element={<InviteView />} />
        </Routes>
      </div>
    </div>
  );
} 