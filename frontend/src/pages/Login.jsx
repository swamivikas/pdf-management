import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../api.js';
import { setToken } from '../utils/auth.js';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '450px' }}>
      <div className="card mt-4">
        <div className="card-body">
          <h3 className="card-title mb-3">Login</h3>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="btn btn-primary w-100" type="submit">Login</button>
          </form>
          <p className="text-center mt-3 small">
            No account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 