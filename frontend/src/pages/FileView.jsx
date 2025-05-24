import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api.js';

export default function FileView() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [shareLink, setShareLink] = useState('');

  const fetchDetails = async () => {
    const res = await api.get(`/files/${id}`);
    setFile(res.data.file);
    const comRes = await api.get(`/comments/${id}`);
    setComments(comRes.data.comments);
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText) return;
    const res = await api.post('/comments', { fileId: id, content: commentText });
    setComments([...comments, res.data.comment]);
    setCommentText('');
  };

  const handleShare = async (e) => {
    e.preventDefault();
    const res = await api.post(`/files/${id}/share`, {});
    const frontendUrl = process.env.NODE_ENV === 'production'
      ? 'https://pdf-management-sigma.vercel.app'
      : 'http://localhost:5173';
    setShareLink(`${frontendUrl}/share/${res.data.invite.token}`);
  };

  if (!file) return <p>Loading…</p>;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <h2 className="text-xl font-bold mb-2">{file.original_name}</h2>
        <div className="card">
          <iframe
            title="PDF preview"
            src={`/static/${file.stored_name}`}
            width="100%"
            height="600px"
          />
        </div>
      </div>
      <div>
        {/* Comment section */}
        <div className="card mb-3">
          <div className="card-header fw-bold">Comments</div>
          <ul className="list-group list-group-flush" style={{ maxHeight: '250px', overflowY: 'auto' }}>
            {comments.length === 0 && (
              <li className="list-group-item text-muted">No comments yet.</li>
            )}
            {comments.map((c) => (
              <li key={c.id} className="list-group-item">
                <strong>{c.author_name || 'Guest'}:</strong> {c.content}
              </li>
            ))}
          </ul>
          <div className="card-footer">
            <form className="d-flex" onSubmit={handleComment}>
              <input className="form-control me-2" placeholder="Add a comment" value={commentText} onChange={(e)=>setCommentText(e.target.value)} />
              <button className="btn btn-primary">Post</button>
            </form>
          </div>
        </div>

        {/* Share */}
        <div className="card">
          <div className="card-header fw-bold">Share</div>
          <div className="card-body">
            <button onClick={handleShare} className="btn btn-success mb-2">Generate Share Link</button>
            {shareLink && (
              <div className="alert alert-info small mb-0">
                <a href={shareLink} target="_blank" rel="noreferrer" className="text-decoration-none">{shareLink}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 