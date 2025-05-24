import { useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api.js';
import { getToken } from '../utils/auth.js';

const BACKEND_URL = process.env.NODE_ENV === 'production'
  ? 'https://pdf-management-backend.onrender.com'
  : 'http://localhost:4000';

export default function InviteView() {
  const { token } = useParams();
  const location = useLocation();
  const [file, setFile] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const fetchData = async () => {
    const res = await axios.get(`${BACKEND_URL}/share/${token}`);
    setFile(res.data.file);
    const comRes = await api.get(`/comments/${res.data.file.id}`);
    setComments(comRes.data.comments);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!text) return;
    const res = await api.post('/comments', { fileId: file.id, content: text });
    setComments([...comments, res.data.comment]);
    setText('');
  };

  const isLoggedIn = !!getToken();

  if (!file) return <p>Loading…</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">{file.original_name}</h2>
      <div className="card" style={{marginBottom:'16px'}}>
        <iframe
          title="PDF preview"
          src={`/static/${file.stored_name}`}
          width="100%"
          height="600px"
        />
      </div>
      <div className="card">
        <div className="card-header fw-bold">Comments</div>
        <ul className="list-group list-group-flush" style={{ maxHeight: '250px', overflowY: 'auto' }}>
          {comments.length === 0 && (
            <li className="list-group-item text-muted">No comments yet.</li>
          )}
          {comments.map((c) => (
            <li key={c.id} className="list-group-item text-sm">
              <strong>{c.author_name || 'Guest'}:</strong> {c.content}
            </li>
          ))}
        </ul>
        <div className="card-footer">
          {isLoggedIn ? (
            <form className="d-flex" onSubmit={addComment}>
              <input className="form-control me-2" placeholder="Add a comment" value={text} onChange={(e)=>setText(e.target.value)} />
              <button className="btn btn-primary">Post</button>
            </form>
          ) : (
            <div className="small">Please <Link to="/login" state={{ from: location.pathname }}>login</Link> to comment.</div>
          )}
        </div>
      </div>
    </div>
  );
} 