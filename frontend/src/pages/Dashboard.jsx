import { useState, useEffect } from 'react';
import api from '../api.js';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const fetchFiles = async () => {
    const res = await api.get('/files', { params: { search } });
    setFiles(res.data.files);
  };

  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFiles();
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append('pdf', file);
    const res = await api.post('/files/upload', fd);
    setMessage('Upload successful');
    setFile(null);
    setFiles([res.data.file, ...files]);
  };

  return (
    <div>
      <h3 className="mb-3">Your PDFs</h3>

      {/* Upload */}
      <div className="card p-3 mb-4">
        <form className="d-flex align-items-center gap-2" onSubmit={handleUpload}>
          <input type="file" accept="application/pdf" className="form-control" onChange={(e)=>setFile(e.target.files[0])} />
          <button className="btn btn-success">Upload</button>
        </form>
        {message && <small className="text-success">{message}</small>}
      </div>

      {/* Search */}
      <form className="input-group mb-3" onSubmit={handleSearch}>
        <input className="form-control" placeholder="Search PDFs…" value={search} onChange={(e)=>setSearch(e.target.value)} />
        <button className="btn btn-outline-secondary">Search</button>
      </form>

      {/* File list */}
      <div className="row">
        {files.map((f)=> (
          <div className="col-md-6 mb-3" key={f.id}>
            <Link to={`/files/${f.id}`} className="text-decoration-none text-dark">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{f.original_name}</h5>
                  <p className="card-text"><small className="text-muted">{new Date(f.created_at).toLocaleString()}</small></p>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {files.length === 0 && <p>No files found.</p>}
      </div>
    </div>
  );
} 