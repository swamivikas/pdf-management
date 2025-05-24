import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api.js';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '450px' }}>
      <div className="card mt-4">
        <div className="card-body">
          <h3 className="card-title mb-3">Sign Up</h3>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input name="name" className="form-control" placeholder="Name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input name="email" type="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input name="password" type="password" className="form-control" placeholder="Password" value={form.password} onChange={handleChange} required />
            </div>
            <button className="btn btn-primary w-100" type="submit">Sign Up</button>
          </form>
          <p className="text-center mt-3 small">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 