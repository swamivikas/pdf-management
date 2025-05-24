import { Link, useNavigate } from 'react-router-dom';
import { clearToken, getToken } from '../utils/auth.js';
import api from '../api.js';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUserName(res.data.user.name);
        } catch (err) {
          console.error(err);
        }
      } else {
        setUserName('');
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">PDF Collaboration</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navBar" aria-controls="navBar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navBar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!token ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
              </>
            ) : (
              <>
                <li className="nav-item me-2"><Link className="nav-link" to="/">👤 {userName}</Link></li>
                <li className="nav-item"><button className="btn btn-sm btn-outline-light" onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
} 