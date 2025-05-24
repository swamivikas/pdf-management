import { createComment, getCommentsByFile } from '../models/commentModel.js';
// import { findByToken } from '../models/inviteModel.js';
import { findById } from '../models/userModel.js';

export async function addComment(req, res) {
  try {
    const { fileId, content, parentCommentId } = req.body;
    if (!fileId || !content) return res.status(400).json({ message: 'Missing fields' });

    let authorId = null;
    let inviteId = null;
    if (req.user) {
      authorId = req.user.id;
    } else {
      // Only logged-in users may comment
      return res.status(401).json({ message: 'Login required to comment' });
    }

    let comment = await createComment({ fileId, authorId, inviteId: null, content, parentCommentId });
    if (authorId) {
      const user = await findById(authorId);
      comment.author_name = user?.name || 'User';
    } else {
      comment.author_name = 'Guest';
    }
    res.status(201).json({ comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getComments(req, res) {
  try {
    const { fileId } = req.params;
    const comments = await getCommentsByFile(fileId);
    res.json({ comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
} 